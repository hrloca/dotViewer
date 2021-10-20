import { FrameEngine } from './FrameEngine'
import { Eventmitter, eventmit } from '../ee'

type AnimatorTimeKeeperOption = {
  onUpdate?: (currentFrame: number) => void
  onEnd?: () => void
}

export class AnimatorTimeKeeper {
  private onUpdateEmitter: Eventmitter<number>
  private onEndEmitter: Eventmitter<undefined>
  private _isPlaying = true
  private _elapsedTime = 0
  private _currentTime = 0
  private _speed = 1
  private readonly engine: FrameEngine
  constructor(
    private readonly total: number,
    { onEnd, onUpdate }: AnimatorTimeKeeperOption
  ) {
    // TODO: should inject.
    this.engine = new FrameEngine()
    this.engine.onUpdate(this.update.bind(this))

    this.onUpdateEmitter = eventmit<number>()
    this.onEndEmitter = eventmit<undefined>()
    if (onUpdate) this.onUpdateEmitter.on(onUpdate)
    if (onEnd) this.onEndEmitter.on(onEnd)
  }

  private update() {
    const now = Date.now()
    const diffTime = now - this._elapsedTime

    this._elapsedTime = now
    this._currentTime += diffTime * this._speed

    if (this.total <= this._currentTime) {
      this.draw(this.total)
      this.stop()
      this.onEndEmitter.emit(undefined)
      return
    }

    this.draw(this._currentTime)
  }

  private draw(time: number) {
    this.onUpdateEmitter.emit(time)
  }

  get isPlaying() {
    return this._isPlaying
  }

  set speed(value: number) {
    this._speed = value
  }

  seek(time: number) {
    this._currentTime = time
    this.draw(time)
  }

  play() {
    this._elapsedTime = Date.now()
    this._isPlaying = true
    this.engine.start()
  }

  stop() {
    this._isPlaying = false
    this.engine.stop()
  }
}
