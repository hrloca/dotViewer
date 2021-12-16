import { FrameEngine } from './FrameEngine'
import { Eventmitter, eventmit } from '../libs'

type TimeKeeperOption = {
  onUpdate?: (currentFrame: number) => void
  onEnd?: () => void
}

export class Timekeeper {
  private onUpdateEmitter: Eventmitter<number>
  private onEndEmitter: Eventmitter<undefined>
  private _isActive = false
  private _isLoop = false
  private _prevTime = 0
  private _currentTime = 0
  private _speed = 1
  private _total = 5000
  // TODO: should inject..?
  private readonly engine: FrameEngine
  constructor({ onEnd, onUpdate }: TimeKeeperOption = {}) {
    this.engine = new FrameEngine()
    this.engine.onUpdate(this.update.bind(this))

    this.onUpdateEmitter = eventmit<number>()
    this.onEndEmitter = eventmit<undefined>()
    if (onUpdate) this.onUpdateEmitter.on(onUpdate)
    if (onEnd) this.onEndEmitter.on(onEnd)
  }

  onUpdate = (handler: (num: number) => void) => this.onUpdateEmitter.on(handler)
  onEnd = (handler: () => void) => this.onEndEmitter.on(handler)
  offUpdate = (handler: (num: number) => void) => this.onUpdateEmitter.off(handler)
  offEnd = (handler: () => void) => this.onEndEmitter.off(handler)

  private update() {
    const now = Date.now()
    const diffTime = now - this._prevTime
    this._prevTime = now

    this._currentTime += diffTime * this._speed

    if (this._total <= this._currentTime) {
      this.emit(this._total)
      if (this._isLoop) {
        this._currentTime = 0
        return
      }
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

  get speed() {
    return this._speed
  }

  set loop(isLoop: boolean) {
    this._isLoop = isLoop
  }

  get loop() {
    return this._isLoop
  }

  set total(msec: number) {
    this._total = msec
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
