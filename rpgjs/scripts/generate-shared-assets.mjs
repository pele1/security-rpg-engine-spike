import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const here = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(here, '..')
const repoRoot = resolve(projectRoot, '..')
const sharedRoot = resolve(repoRoot, 'shared', 'assets')
const manifest = JSON.parse(await readFile(resolve(sharedRoot, 'manifest.json'), 'utf8'))
const source = resolve(sharedRoot, manifest.source)
const generatedRoot = resolve(projectRoot, 'public', 'assets', 'shared')
const tiledGenerated = resolve(projectRoot, 'src', 'tiled', 'office-lobby-backdrop.png')

await mkdir(generatedRoot, { recursive: true })

const generated = new Map()
for (const asset of manifest.assets) {
  const [left, top, width, height] = asset.crop
  const target = resolve(generatedRoot, asset.path)
  await mkdir(dirname(target), { recursive: true })
  const buffer = await sharp(source)
    .extract({ left, top, width, height })
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 8 })
    .png()
    .toBuffer()
  await writeFile(target, buffer)
  generated.set(asset.id, { target, buffer })
}

const [sceneWidth, sceneHeight] = manifest.scene.size
const floorSvg = Buffer.from(`
<svg width="${sceneWidth}" height="${sceneHeight}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="floor" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#e7ddd0"/><stop offset="1" stop-color="#c9c0b6"/></linearGradient>
    <linearGradient id="secure" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#dce8e9"/><stop offset="1" stop-color="#aebfc3"/></linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="#071015"/>
  <polygon points="450,56 854,258 450,488 46,286" fill="url(#floor)" stroke="#75878d" stroke-width="4"/>
  <polygon points="610,136 854,258 658,370 470,276" fill="url(#secure)" opacity=".94"/>
  <path d="M113 253L450 84L787 253L450 443Z" fill="none" stroke="#ffffff" stroke-opacity=".12" stroke-width="2"/>
  <text x="388" y="348" fill="#63777e" font-family="Arial, sans-serif" font-size="25" font-weight="700" transform="rotate(26 388 348)">SECURECORP</text>
</svg>`)

const composites = [{ input: floorSvg, left: 0, top: 0 }]
for (const placement of manifest.scene.placements) {
  const item = generated.get(placement.asset)
  if (!item) throw new Error(`Unknown scene asset: ${placement.asset}`)
  const meta = await sharp(item.buffer).metadata()
  const targetWidth = placement.width
  const targetHeight = Math.max(1, Math.round((meta.height / meta.width) * targetWidth))
  const resized = await sharp(item.buffer).resize({ width: targetWidth }).png().toBuffer()
  composites.push({ input: resized, left: placement.x, top: placement.y })
}

const sceneTarget = resolve(generatedRoot, manifest.scene.output)
await mkdir(dirname(sceneTarget), { recursive: true })
await sharp({ create: { width: sceneWidth, height: sceneHeight, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
  .composite(composites)
  .png()
  .toFile(sceneTarget)

await copyFile(sceneTarget, tiledGenerated)
console.log(`Generated ${manifest.assets.length} shared assets and ${manifest.scene.output}`)
console.log(`Synced scene backdrop -> ${tiledGenerated}`)
