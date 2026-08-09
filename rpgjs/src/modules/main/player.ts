import { RpgPlayer, type RpgPlayerHooks } from '@rpgjs/server'

export const player: RpgPlayerHooks = {
  async onConnected(player: RpgPlayer) {
    player.hitbox(24, 12)
    player.name = 'Alex'
    player.setGraphic('hero')
    await player.changeMap('office-lobby', { x: 320, y: 224 })
  }
}
