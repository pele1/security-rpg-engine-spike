import { provideClientGlobalConfig, provideClientModules, Presets, withMobile } from '@rpgjs/client'
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
          { id: 'receptionist', image: 'spritesheets/receptionist.svg', ...Presets.RMSpritesheet(3, 4) },
          { id: 'secure-door', image: 'spritesheets/secure-door.svg', ...Presets.RMSpritesheet(3, 4) }
        ]
      },
      withMobile({
        enabled: 'auto',
        layout: {
          joystickSide: 'left',
          joystickMargin: [24, 24, 28, 24],
          buttonsMargin: [24, 24, 28, 24],
          gap: 12
        },
        joystick: {
          outerColor: '#183642',
          innerColor: '#5ce0d6',
          scale: 0.86,
          moveInterval: 40,
          threshold: 0.12
        },
        buttons: {
          action: { enabled: true, width: 76, height: 76 },
          back: false,
          dash: false
        }
      })
    ])
  ]
}
