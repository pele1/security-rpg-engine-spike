import { cp, mkdir, copyFile, rm } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(here, '..')
const repoRoot = resolve(projectRoot, '..')
const targetDir = resolve(projectRoot, 'public', 'data')
const sharedAssets = resolve(repoRoot, 'shared', 'assets', 'generated')
const publicAssets = resolve(projectRoot, 'public', 'assets', 'shared')
const tiledBackdrop = resolve(projectRoot, 'src', 'tiled', 'office-lobby-backdrop.png')

await mkdir(targetDir, { recursive: true })
await copyFile(resolve(repoRoot, 'shared', 'scenario.json'), resolve(targetDir, 'scenario.json'))
console.log('Synced shared/scenario.json -> rpgjs/public/data/scenario.json')

// Clear the engine copy so removed shared assets cannot linger in a build.
await rm(publicAssets, { recursive: true, force: true })
await cp(sharedAssets, publicAssets, { recursive: true })
await copyFile(resolve(sharedAssets, 'scene', 'office-lobby-backdrop.png'), tiledBackdrop)
console.log('Synced committed shared/assets/generated -> rpgjs public and Tiled inputs')
