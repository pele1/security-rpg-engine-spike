import { mergeConfig } from '@signe/di'
import { Control, inject, KeyboardControls, provideRpg, startGame } from '@rpgjs/client'
import startServer from './server'
import configClient from './config/config.client'

startGame(
  mergeConfig(configClient, {
    providers: [provideRpg(startServer)]
  })
)

const controls = inject(KeyboardControls)

;(window as any).__rpgjsTouchControl = (control: string, isDown = true) => {
  const controlName = (Control as any)[control] ?? control.toLowerCase()
  return controls.applyControl(controlName, isDown)
}
