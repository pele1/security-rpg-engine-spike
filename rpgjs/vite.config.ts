import { defineConfig } from 'vite'
import { rpgjs, tiledMapFolderPlugin } from '@rpgjs/vite'
import startServer from './src/server'

const isGitHubPages = process.env.GITHUB_PAGES === 'true'

export default defineConfig({
  base: isGitHubPages ? '/security-rpg-engine-spike/' : '/',
  optimizeDeps: {
    include: ['pixi.js > @xmldom/xmldom']
  },
  plugins: [
    tiledMapFolderPlugin({
      sourceFolder: './src/tiled',
      publicPath: '/map',
      buildOutputPath: 'map'
    }),
    ...rpgjs({ server: startServer })
  ]
})
