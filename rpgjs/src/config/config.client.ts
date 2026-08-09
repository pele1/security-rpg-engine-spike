import { provideClientGlobalConfig, provideClientModules, Presets } from '@rpgjs/client'
import { provideTiledMap } from '@rpgjs/tiledmap/client'
import { provideMain } from '../modules/main'

export default {
  providers: [
    provideTiledMap({ basePath: 'map' }),
    provideClientGlobalConfig(),
    provideMain(),
    provideClientModules([
      {
        spritesheets: [
          { id: 'hero', image: 'spritesheets/hero.svg', ...Presets.RMSpritesheet(3, 4) },
          { id: 'visitor', image: 'spritesheets/visitor.svg', ...Presets.RMSpritesheet(3, 4) },
          { id: 'receptionist', image: 'spritesheets/receptionist.svg', ...Presets.RMSpritesheet(3, 4) }
        ]
      }
    ])
  ]
}
