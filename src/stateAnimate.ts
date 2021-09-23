import { useRef } from 'react'
import { Animated } from 'react-native'
import { Frame, Animation, Transition } from './animations'

function* createIterater<T>(any: T[]) {
  for (const a of any) {
    yield a
  }
}

type Gen = Generator<Frame, void, unknown>
type GenT = Generator<Transition, void, unknown>

interface DotAnimatorOption {
  onUpdateFrame?: (frame: Frame['coordinate']) => void
  onStart?: () => void
  onStop?: () => void
}

export class DotAnimator {
  isStop: boolean
  private timer: number
  private frames: Gen
  private transitions?: GenT
  private animation: Animation
  transitionValue: Animated.ValueXY
  constructor(private readonly option: DotAnimatorOption) {
    this.transitionValue = new Animated.ValueXY()
  }

  private exec(gen: Gen) {
    const g = gen.next()
    if (!g.value) {
      return g
    }

    this.option.onUpdateFrame?.(g.value.coordinate)

    return g
  }

  private updateFrame(gen: Gen) {
    const { value } = this.exec(gen)
    if (!value) {
      if (this.animation.loop) {
        this.init()
        this.run()
      }
      return
    }

    this.timer = window.setTimeout(() => {
      this.updateFrame(gen)
    }, value.duration)
  }

  private init() {
    this.frames = createIterater(this.animation.frames)
    this.transitions = this.animation.transition
      ? createIterater(this.animation.transition)
      : undefined

    Animated.timing(this.transitionValue, {
      toValue: { x: 0, y: 0 },
      duration: 0,
      useNativeDriver: false,
    }).start()
  }

  private run() {
    this.isStop = false
    this.updateFrame(this.frames)
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
    this.updateFrame(this.frames)
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
    this.updateFrame(this.frames)
    this.runTransform()
  }

  private runTransform() {
    if (this.transitions) {
      this.updateTransform(this.transitions)
    }
  }

  private updateTransform(gen: GenT) {
    const { value } = gen.next()
    if (!value) return

    Animated.timing(this.transitionValue, {
      toValue: value.value,
      duration: value.duration,
      easing: value.easing,
      useNativeDriver: false,
    }).start(() => {
      this.updateTransform(gen)
    })
  }

  stop() {
    this.init()
    this.pause()
    this.option.onStop?.()
    this.exec(this.frames)
  }

  onUpdateFrame(onUpdate: (frame: Frame['coordinate']) => void) {
    this.option.onUpdateFrame = onUpdate
  }
}

export const useDotAnimator = (option: DotAnimatorOption = {}) => {
  return useRef(new DotAnimator(option)).current
}
