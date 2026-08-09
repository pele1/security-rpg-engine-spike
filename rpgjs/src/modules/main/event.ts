import { type EventDefinition, RpgPlayer } from '@rpgjs/server'

export function Visitor(): EventDefinition {
  return {
    onInit() {
      this.setGraphic('visitor')
    },
    async onAction(player: RpgPlayer) {
      const first = await player.showChoices(
        "Hey, perfect timing. My badge stopped working again. Could you let me through? I'm already late for the DevOps meeting.",
        [
          { text: "Sure, I'll let you in.", value: 'admit' },
          { text: 'Please check with reception first.', value: 'reception' },
          { text: 'Who are you meeting?', value: 'ask-meeting' }
        ],
        { talkWith: this }
      )

      if (first.value === 'admit') {
        player.showNotification('Badge granted. The visitor enters the restricted area.')
        await player.showText('A security notification reports an unidentified visitor near a development workstation.')
        return
      }

      if (first.value === 'reception') {
        player.showNotification('Reception takes over the visitor check.')
        return
      }

      const second = await player.showChoices(
        'Daniel from DevOps. He told me to come straight up if reception was busy.',
        [
          { text: 'Okay, come through.', value: 'admit' },
          { text: "I'll verify that with reception.", value: 'verify' }
        ],
        { talkWith: this }
      )

      if (second.value === 'admit') {
        player.showNotification('Badge granted based on the unverified claim.')
        await player.showText('A security notification reports an unidentified visitor near a development workstation.')
      } else {
        player.showNotification('Reception verifies the visitor before access is granted.')
      }
    }
  }
}

export function Receptionist(): EventDefinition {
  return {
    onInit() {
      this.setGraphic('receptionist')
    },
    async onAction(player: RpgPlayer) {
      await player.showText('Reception: I can verify visitors here. Please do not bypass the badge process.', { talkWith: this })
    }
  }
}
