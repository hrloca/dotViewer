import { Timekeeper } from './Timekeeper'
import { Eventmitter, eventmit } from '../libs'
import { AnimationBody } from './Animation'
import { AnimationMeta } from './AnimationMeta'

export type AnimatorOption = {
  onUpdate?: (arg: AnimatorUpdate) => void
  onLoad?: (meta: AnimationMeta) => void
  onEnd?: (meta: AnimationMeta) => void
  isPlaying?: boolean
  repeat?: boolean
  speed?: boolean
}

type AnimatorUpdate = {
  msec: number
  values: (number | undefined)[]
  meta: AnimationMeta
}

export class AnimatorPlayer {
  private onUpdateEmitter: Eventmitter<AnimatorUpdate>
  private onLoadEmitter: Eventmitter<AnimationMeta>
  private onEndEmitter: Eventmitter<AnimationMeta>
  private handler: (msec: number) => void
  private readonly timekeeper: Timekeeper
  constructor(
    private readonly aMeta: AnimationMeta,
    private readonly aBody: AnimationBody,
    option: AnimatorOption = {}
  ) {
    this.onUpdateEmitter = eventmit<AnimatorUpdate>()
    this.onEndEmitter = eventmit<AnimationMeta>()
    this.onLoadEmitter = eventmit<AnimationMeta>()
    if (option.onUpdate) this.onUpdateEmitter.on(option.onUpdate)
    if (option.onLoad) this.onLoadEmitter.on(option.onLoad)
    if (option.onEnd) this.onEndEmitter.on(option.onEnd)

    this.timekeeper = new Timekeeper()
    this.timekeeper.total = this.aMeta.totalTime
    this.handler = this.update.bind(this)
    this.timekeeper.onUpdate(this.handler)
    const endhandler = this.end.bind(this)
    this.timekeeper.onEnd(endhandler)

    this.load()
  }

  private load() {
    this.onLoadEmitter.emit(this.aMeta)
  }

  private end() {
    this.onEndEmitter.emit(this.aMeta)
  }

  private update(msec: number) {
    const values = this.aBody.readFromTime(msec)

    this.onUpdateEmitter.emit({
      msec,
      values,
      meta: this.aMeta,
    })
  }

  get isPlaying() {
    return this.timekeeper.isActive
  }

  set speed(is: number) {
    if (is > 1 || is < 0) {
      throw new Error('speed param: out of range.')
    }

    this.timekeeper.speed = is
  }

  get speed() {
    return this.timekeeper.speed
  }

  repeat(repeat: boolean) {
    this.timekeeper.loop = repeat
  }

  play(repeat: boolean) {
    this.repeat(repeat)
    this.timekeeper.start()
  }

  stop() {
    this.timekeeper.stop()
  }

  seek(msec: number) {
    this.timekeeper.seek(msec)
  }

  readonly onUpdate = (handler: (arg: AnimatorUpdate) => void) =>
    this.onUpdateEmitter.on(handler)
  readonly onInit = (handler: () => void) => this.onLoadEmitter.on(handler)
  readonly onEnd = (handler: () => void) => this.onEndEmitter.on(handler)
}
