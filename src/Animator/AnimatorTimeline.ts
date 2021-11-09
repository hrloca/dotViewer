import { FrameEngine } from './FrameEngine'
import { Eventmitter, eventmit } from '../ee'

type TimeKeeperOption = {
  onUpdate?: (currentFrame: number) => void
  onEnd?: () => void
}

export class AnimatorTimeline {
  private onUpdateEmitter: Eventmitter<number>
  private onEndEmitter: Eventmitter<undefined>
  private _isActive = true
  private _prevTime = 0
  private _currentTime = 0
  private _speed = 1
  // TODO: should inject.
  private readonly engine: FrameEngine
  constructor(
    private readonly total: number,
    { onEnd, onUpdate }: TimeKeeperOption = {}
  ) {
    this.engine = new FrameEngine()
    this.engine.onUpdate(this.update.bind(this))

    this.onUpdateEmitter = eventmit<number>()
    this.onEndEmitter = eventmit<undefined>()
    if (onUpdate) this.onUpdateEmitter.on(onUpdate)
    if (onEnd) this.onEndEmitter.on(onEnd)
  }

  onUpdate = (handler: (num: number) => void) => this.onUpdateEmitter.on(handler)
  onEnd = (handler: () => void) => this.onEndEmitter.on(handler)

  private update() {
    const now = Date.now()
    const diffTime = now - this._prevTime
    this._prevTime = now

    this._currentTime += diffTime * this._speed

    if (this.total <= this._currentTime) {
      this.emit(this.total)
      this.stop()
      this.onEndEmitter.emit(undefined)
      return
    }

    this.emit(this._currentTime)
  }

  private emit(time: number) {
    this.onUpdateEmitter.emit(time)
  }

  get isActive() {
    return this._isActive
  }

  set speed(value: number) {
    this._speed = value
  }

  seek(time: number) {
    this._currentTime = time
    this.emit(time)
  }

  start() {
    this._prevTime = Date.now()
    this._isActive = true
    this.engine.start()
  }

  stop() {
    this._isActive = false
    this.engine.stop()
  }
}
