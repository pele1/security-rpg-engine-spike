import { defineModule } from '@rpgjs/common'
import { RpgServer } from '@rpgjs/server'
import { player } from './player'
import { Receptionist, Visitor } from './event'

export default defineModule<RpgServer>({
  player,
  maps: [
    {
      id: 'office-lobby',
      events: [
        { id: 'visitor', x: 448, y: 176, event: Visitor() },
        { id: 'receptionist', x: 256, y: 144, event: Receptionist() }
      ]
    }
  ]
})
