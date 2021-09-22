import { useRef } from 'react'
import { Frame, Animation } from './animations'

function* iterateFrames(frames: Animation['frames']) {
  for (const frame of frames) {
    yield frame
  }
}

type Gen = Generator<Frame, void, unknown>

interface DotAnimatorOption {
  onUpdate?: (frame: Frame['coordinate']) => void
  onStart?: () => void
  onStop?: () => void
}

export class DotAnimator {
  isStop: boolean
  private timer: number
  private frames: Gen
  private animation: Animation
  constructor(private readonly option: DotAnimatorOption) {}

  private exec(gen: Gen) {
    const g = gen.next()
    if (!g.value) {
      return g
    }

    this.option.onUpdate?.(g.value.coordinate)

    return g
  }

  private update(gen: Gen) {
    const { value } = this.exec(gen)
    if (!value) {
      if (this.animation.loop) {
        this.init()
        this.run()
      }
      return
    }

    this.timer = window.setTimeout(() => {
      this.update(gen)
    }, value.duration)
  }

  private init() {
    this.frames = iterateFrames(this.animation.frames)
  }

  private run() {
    this.isStop = false
    this.update(this.frames)
  }

  next() {
    this.pause()
    const { done } = this.exec(this.frames)
    if (done) {
      this.init()
      this.next()
    }
  }

  pause() {
    if (this.isStop) return
    this.isStop = true
    window.clearTimeout(this.timer)
  }

  resume() {
    if (!this.isStop) return
    this.isStop = false
    this.update(this.frames)
  }

  use(animation: Animation) {
    this.animation = animation
    this.init()
    return this
  }

  start() {
    this.init()
    this.stop()
    this.isStop = false
    this.option.onStart?.()
    this.update(this.frames)
  }

  stop() {
    this.init()
    this.pause()
    this.option.onStop?.()
    this.exec(this.frames)
  }

  onUpdate(onUpdate: (frame: Frame['coordinate']) => void) {
    this.option.onUpdate = onUpdate
  }
}

export const useDotAnimator = (option: DotAnimatorOption = {}) => {
  return useRef(new DotAnimator(option)).current
}
