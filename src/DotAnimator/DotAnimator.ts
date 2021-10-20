import { Frame, Animation } from '../animations'
import { Eventmitter, eventmit } from '../ee'

function* createIterater<T>(any: T[]) {
  for (const a of any) {
    yield a
  }
}

type Gen = Generator<Frame, void, unknown>

export interface DotAnimatorOption {
  onUpdate?: (frame: Frame) => void
  onStart?: () => void
  onEnd?: () => void
}

export class DotAnimator {
  isStop: boolean
  private timer: number
  private frames: Gen
  private animation: Animation

  private onStartEmitter: Eventmitter<undefined>
  private onEndEmitter: Eventmitter<undefined>
  constructor(private readonly option: DotAnimatorOption) {
    this.onStartEmitter = eventmit<undefined>()
    this.onEndEmitter = eventmit<undefined>()
    if (option.onStart) this.onStartEmitter.on(option.onStart)
    if (option.onEnd) this.onEndEmitter.on(option.onEnd)
  }

  private update(gen: Gen) {
    const { value } = gen.next()
    if (!value) {
      this.onEndEmitter.emit(undefined)
      return
    }

    this.option.onUpdate?.(value)
    this.timer = window.setTimeout(() => {
      this.update(gen)
    }, value.duration)
  }

  private reset() {
    this.frames = createIterater(this.animation.frames)
  }

  private run() {
    this.isStop = false
    this.update(this.frames)
  }

  onStart = (handler: () => void) => this.onStartEmitter.on(handler)
  onEnd = (handler: () => void) => this.onEndEmitter.on(handler)
  offOnEnd = () => this.onEndEmitter.offAll()

  pause() {
    if (this.isStop) return
    this.isStop = true
    window.clearTimeout(this.timer)
  }

  resume() {
    if (!this.isStop) return
    this.run()
  }

  use(animation: Animation) {
    this.animation = animation
    this.reset()
    return this
  }

  play() {
    this.reset()
    this.stop()
    this.onStartEmitter.emit(undefined)
    this.run()
  }

  stop() {
    this.reset()
    this.pause()
  }

  onUpdate(onUpdate: (frame: Frame) => void) {
    this.option.onUpdate = onUpdate
  }
}
