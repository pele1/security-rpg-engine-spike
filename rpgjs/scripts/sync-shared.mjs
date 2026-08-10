import { cp, mkdir, copyFile, rm } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(here, '..')
const repoRoot = resolve(projectRoot, '..')
const dataTarget = resolve(projectRoot, 'public', 'data')
const generatedSource = resolve(repoRoot, 'shared', 'assets', 'generated')
const generatedTarget = resolve(projectRoot, 'public', 'assets', 'shared')
const tiledBackdrop = resolve(projectRoot, 'src', 'tiled', 'office-lobby-backdrop.png')

await mkdir(dataTarget, { recursive: true })
await copyFile(resolve(repoRoot, 'shared', 'scenario.json'), resolve(dataTarget, 'scenario.json'))

await rm(generatedTarget, { recursive: true, force: true })
await mkdir(generatedTarget, { recursive: true })
await cp(generatedSource, generatedTarget, { recursive: true })
await copyFile(resolve(generatedSource, 'scene', 'office-lobby-backdrop.png'), tiledBackdrop)

console.log('Synced shared/scenario.json -> rpgjs/public/data/scenario.json')
console.log('Synced committed shared/assets/generated -> rpgjs/public/assets/shared')
console.log('Synced committed office backdrop -> rpgjs/src/tiled/office-lobby-backdrop.png')
