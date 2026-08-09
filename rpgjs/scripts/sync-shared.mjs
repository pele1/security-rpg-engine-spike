import { mkdir, copyFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(here, '..')
const repoRoot = resolve(projectRoot, '..')
const targetDir = resolve(projectRoot, 'public', 'data')

await mkdir(targetDir, { recursive: true })
await copyFile(resolve(repoRoot, 'shared', 'scenario.json'), resolve(targetDir, 'scenario.json'))
console.log('Synced shared/scenario.json -> rpgjs/public/data/scenario.json')
