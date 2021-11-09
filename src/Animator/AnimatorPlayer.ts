import { AnimatorTimeline } from './AnimatorTimeline'
import { AnimatorFrame } from './AnimatorFrame'
import { AnimationMeta } from './AnimationMeta'
import { AnimationFrameReader } from './AnimationReader'
import { Eventmitter, eventmit } from '../ee'

export type AnimatorOption = {
  onUpdate?: (arg: AnimatorUpdate) => void
}

type AnimatorUpdate = {
  msec: number
  frame: number
  values: (number | undefined)[]
}

export class AnimatorPlayer {
  private onUpdateEmitter: Eventmitter<AnimatorUpdate>
  constructor(
    private readonly timeline: AnimatorTimeline,
    private readonly frame: AnimatorFrame,
    private readonly meta: AnimationMeta,
    private readonly reader: AnimationFrameReader,
    option: AnimatorOption = {}
  ) {
    this.onUpdateEmitter = eventmit<AnimatorUpdate>()
    if (option.onUpdate) this.onUpdateEmitter.on(option.onUpdate)
    this.timeline.onUpdate(this.update.bind(this))
  }

  private update(msec: number) {
    const frame = this.frame.from(msec)
    const values = this.reader.read(frame)

    this.onUpdateEmitter.emit({
      msec,
      frame,
      values,
    })
  }

  get totalTime() {
    return this.meta.totalTime
  }
  get totalFrame() {
    return this.meta.frames
  }

  play() {
    this.timeline.start()
  }

  stop() {
    this.timeline.stop()
  }

  seek(msec: number) {
    this.timeline.seek(msec)
  }
}
