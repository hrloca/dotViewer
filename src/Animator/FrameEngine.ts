import { Eventmitter, eventmit } from '../ee'

type FrameEngineOption = {
  onUpdate?: () => void
}

export class FrameEngine {
  private _timer: number
  private _active: boolean
  private onUpdateEmitter: Eventmitter<undefined>

  constructor(option: FrameEngineOption = {}) {
    this.onUpdateEmitter = eventmit<undefined>()
    if (option.onUpdate) this.onUpdateEmitter.on(option.onUpdate)
  }

  private stepAnimationFrame() {
    if (this._active) {
      this.onUpdateEmitter.emit(undefined)
      this._timer = window.requestAnimationFrame(() => {
        this.stepAnimationFrame()
      })
    }
  }

  get emitterSize() {
    return this.onUpdateEmitter.size
  }

  start() {
    this._active = true
    this.stepAnimationFrame()
  }

  stop() {
    this._active = false
    window.cancelAnimationFrame(this._timer)
  }

  onUpdate = (handler: () => void) => this.onUpdateEmitter.on(handler)
  offUpdate = (handler: () => void) => this.onUpdateEmitter.off(handler)
}
