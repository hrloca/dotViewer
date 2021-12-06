import { Timekeeper } from './Timekeeper'
import { Eventmitter, eventmit } from '../libs'
import { AnimationSource } from './types'
import { AnimationBody } from './Animation'

export type AnimatorOption = {
  onUpdate?: (arg: AnimatorUpdate) => void
  onChange?: (isPlaying: boolean) => void
  onLoad?: () => void
  onEnd?: () => void
}

type AnimatorUpdate = {
  msec: number
  values: (number | undefined)[]
}

export class AnimatorPlayer {
  private onUpdateEmitter: Eventmitter<AnimatorUpdate>
  private onChangeEmitter: Eventmitter<boolean>
  private onLoadEmitter: Eventmitter<undefined>
  private handler: (msec: number) => void
  // private _isEmpty = true
  constructor(
    private readonly timekeeper: Timekeeper,
    private readonly body: AnimationBody,
    option: AnimatorOption = {}
  ) {
    this.onUpdateEmitter = eventmit<AnimatorUpdate>()
    this.onChangeEmitter = eventmit<boolean>()
    this.onLoadEmitter = eventmit<undefined>()
    if (option.onUpdate) this.onUpdateEmitter.on(option.onUpdate)
    if (option.onChange) this.onChangeEmitter.on(option.onChange)
    if (option.onLoad) this.onLoadEmitter.on(option.onLoad)

    this.handler = this.update.bind(this)
    this.timekeeper.onUpdate(this.handler)
  }

  private update(msec: number) {
    const values = this.body.readFromTime(msec)

    this.onUpdateEmitter.emit({
      msec,
      values,
    })
  }

  get isPlaying() {
    return this.timekeeper.isActive
  }

  // TODO: think lifecycle
  load(data: AnimationSource) {
    this.stop()
    this.timekeeper.offUpdate(this.handler)
    this.onLoadEmitter.emit(undefined)
    return data
  }

  play(repeat: boolean) {
    this.timekeeper.loop = repeat
    this.timekeeper.start()
    this.onChangeEmitter.emit(this.isPlaying)
  }

  stop() {
    this.timekeeper.stop()
    this.onChangeEmitter.emit(this.isPlaying)
  }

  seek(msec: number) {
    this.timekeeper.seek(msec)
  }

  readonly onUpdate = (handler: (arg: AnimatorUpdate) => void) =>
    this.onUpdateEmitter.on(handler)
  readonly onChange = (handler: (isPlaying: boolean) => void) =>
    this.onChangeEmitter.on(handler)
  readonly onLoad = (handler: () => void) => this.onLoadEmitter.on(handler)
}
