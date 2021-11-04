import { TimeKeeper } from './TimeKeeper'
import { AnimatorFrame } from './AnimatorFrame'
import { Animation } from './types'
import { Eventmitter, eventmit } from '../ee'
import { TweenRate, TweenValue } from './Tween'

type AnimatorOption = {
  onUpdate?: (arg: AnimatorUpdate) => void
}

type AnimatorUpdate = {
  msec: number
  frame: number
  frameRaw: number
  value: number | undefined
}

export class Animator {
  private onUpdateEmitter: Eventmitter<AnimatorUpdate>
  private readonly timekeeper: TimeKeeper
  private readonly frame: AnimatorFrame
  constructor(private readonly animation: Animation, option: AnimatorOption = {}) {
    this.onUpdateEmitter = eventmit<AnimatorUpdate>()
    if (option.onUpdate) this.onUpdateEmitter.on(option.onUpdate)

    const meta = this.meta
    this.frame = new AnimatorFrame({
      fps: meta.fps,
      total: 20,
    })
    this.timekeeper = new TimeKeeper(this.totalTime, {
      onUpdate: this.update.bind(this),
    })
  }

  private update(msec: number) {
    const frameRaw = this.frame.from(msec)
    const frame = Math.floor(frameRaw)
    const value = this.calc(frameRaw)

    this.onUpdateEmitter.emit({
      msec,
      frame,
      frameRaw,
      value,
    })
  }

  private calc(frame: number) {
    const { layer } = this.animation

    const ly = layer.find((l) => {
      return frame >= l.from.target && frame <= l.to.target
    })

    if (!ly) return undefined

    const to = ly.to.target
    const from = ly.from.target

    if (ly.type === 'tween') {
      const rate = new TweenRate(from, to)
      const currentRate = rate.calc(frame)
      const value = new TweenValue(ly.from.value, ly.to.value)

      return value.calc(currentRate)
    }

    return frame < to ? ly.from.value : ly.to.value
  }

  get meta() {
    return this.animation
  }

  get totalTime() {
    return this.frame.totalTime
  }

  play() {
    this.timekeeper.start()
  }

  stop() {
    this.timekeeper.stop()
  }

  seek(msec: number) {
    this.timekeeper.seek(msec)
  }
}
