const CONTROL_BY_DIRECTION = {
  up: 'Up',
  down: 'Down',
  left: 'Left',
  right: 'Right'
}

function applyRpgControl(control, isDown = true) {
  const apply = window.__rpgjsTouchControl
  if (typeof apply !== 'function') return false
  apply(control, isDown)
  return true
}

function releaseAllDirections() {
  Object.values(CONTROL_BY_DIRECTION).forEach((control) => applyRpgControl(control, false))
}

function bindHoldButton(button, control) {
  let activePointer = null
  let repeatTimer = null

  const pulse = () => applyRpgControl(control, true)

  const press = (event) => {
    event.preventDefault()
    activePointer = event.pointerId
    button.setPointerCapture?.(event.pointerId)
    button.classList.add('is-pressed')

    pulse()
    repeatTimer = window.setInterval(pulse, 80)
  }

  const release = (event) => {
    if (activePointer !== null && event.pointerId !== activePointer) return
    event.preventDefault()
    button.classList.remove('is-pressed')
    window.clearInterval(repeatTimer)
    repeatTimer = null
    applyRpgControl(control, false)
    activePointer = null
  }

  button.addEventListener('pointerdown', press)
  button.addEventListener('pointerup', release)
  button.addEventListener('pointercancel', release)
  button.addEventListener('lostpointercapture', () => {
    button.classList.remove('is-pressed')
    window.clearInterval(repeatTimer)
    repeatTimer = null
    applyRpgControl(control, false)
    activePointer = null
  })
}

function bindActionButton(button) {
  const trigger = (event) => {
    event.preventDefault()
    button.classList.add('is-pressed')
    applyRpgControl('Action', true)
    window.setTimeout(() => {
      applyRpgControl('Action', false)
      button.classList.remove('is-pressed')
    }, 100)
  }

  button.addEventListener('pointerdown', trigger)
}

function setControlReadiness(controls) {
  const ready = typeof window.__rpgjsTouchControl === 'function'
  controls.classList.toggle('is-ready', ready)
  controls.classList.toggle('is-waiting', !ready)
  return ready
}

function mountMobileControls() {
  if (document.getElementById('mobile-controls')) return

  const controls = document.createElement('div')
  controls.id = 'mobile-controls'
  controls.className = 'is-waiting'
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

  Object.entries(CONTROL_BY_DIRECTION).forEach(([direction, control]) => {
    bindHoldButton(controls.querySelector(`.${direction}`), control)
  })
  bindActionButton(controls.querySelector('.action-button'))

  const readinessTimer = window.setInterval(() => {
    if (setControlReadiness(controls)) window.clearInterval(readinessTimer)
  }, 100)
  setControlReadiness(controls)

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
