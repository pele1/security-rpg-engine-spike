const KEY_BY_DIRECTION = {
  up: 'ArrowUp',
  down: 'ArrowDown',
  left: 'ArrowLeft',
  right: 'ArrowRight'
}

function dispatchKey(type, key, code = key) {
  const event = new KeyboardEvent(type, {
    key,
    code,
    bubbles: true,
    cancelable: true
  })
  window.dispatchEvent(event)
  document.dispatchEvent(event)
}

function releaseAllDirections() {
  Object.values(KEY_BY_DIRECTION).forEach((key) => dispatchKey('keyup', key))
}

function bindHoldButton(button, key) {
  let activePointer = null

  const press = (event) => {
    event.preventDefault()
    activePointer = event.pointerId
    button.setPointerCapture?.(event.pointerId)
    button.classList.add('is-pressed')
    dispatchKey('keydown', key)
  }

  const release = (event) => {
    if (activePointer !== null && event.pointerId !== activePointer) return
    event.preventDefault()
    button.classList.remove('is-pressed')
    dispatchKey('keyup', key)
    activePointer = null
  }

  button.addEventListener('pointerdown', press)
  button.addEventListener('pointerup', release)
  button.addEventListener('pointercancel', release)
  button.addEventListener('lostpointercapture', () => {
    button.classList.remove('is-pressed')
    dispatchKey('keyup', key)
    activePointer = null
  })
}

function bindActionButton(button) {
  const trigger = (event) => {
    event.preventDefault()
    button.classList.add('is-pressed')

    // RPG-style defaults commonly use Enter/Space for interaction.
    // Dispatch both in sequence so the mobile shim stays engine-lightweight.
    dispatchKey('keydown', 'Enter', 'Enter')
    dispatchKey('keyup', 'Enter', 'Enter')
    dispatchKey('keydown', ' ', 'Space')
    dispatchKey('keyup', ' ', 'Space')

    window.setTimeout(() => button.classList.remove('is-pressed'), 100)
  }

  button.addEventListener('pointerdown', trigger)
}

function mountMobileControls() {
  if (document.getElementById('mobile-controls')) return

  const controls = document.createElement('div')
  controls.id = 'mobile-controls'
  controls.setAttribute('aria-label', 'Touch controls')
  controls.innerHTML = `
    <div class="control-cluster dpad" aria-label="Movement">
      <button class="up" type="button" aria-label="Move up">▲</button>
      <button class="left" type="button" aria-label="Move left">◀</button>
      <span class="center" aria-hidden="true"></span>
      <button class="right" type="button" aria-label="Move right">▶</button>
      <button class="down" type="button" aria-label="Move down">▼</button>
    </div>
    <span class="action-label">Interact</span>
    <div class="control-cluster actions">
      <button class="action-button" type="button" aria-label="Interact">ACTION</button>
    </div>
  `

  document.body.appendChild(controls)

  Object.entries(KEY_BY_DIRECTION).forEach(([direction, key]) => {
    bindHoldButton(controls.querySelector(`.${direction}`), key)
  })
  bindActionButton(controls.querySelector('.action-button'))

  window.addEventListener('blur', releaseAllDirections)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) releaseAllDirections()
  })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountMobileControls)
} else {
  mountMobileControls()
}
