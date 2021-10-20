import { Animated } from 'react-native'
import { Eventmitter, eventmit } from '../ee'

function* createIterater<T>(any: T[]) {
  for (const a of any) {
    yield a
  }
}

export interface TransformAnimatorOption {
  onStart?: () => void
  onResume?: () => void
  onPause?: () => void
  onEnd?: () => void
}

type Config = Omit<Animated.TimingAnimationConfig, 'useNativeDriver'>
type Gen = Generator<Config, void, unknown>

export class TransformAnimator {
  private animations: Gen
  private animeted?: Animated.CompositeAnimation
  private configs: Config[]
  private readonly animatedValue: Animated.ValueXY
  // emitter
  private onStartEmitter: Eventmitter<null>
  private onEndEmitter: Eventmitter<null>
  private onPauseEmitter: Eventmitter<null>
  private onResumeEmitter: Eventmitter<null>
  constructor(
    private readonly initialValue: { x: number; y: number } = { x: 0, y: 0 },
    option: TransformAnimatorOption = {}
  ) {
    this.animatedValue = new Animated.ValueXY(this.initialValue)
    this.onStartEmitter = eventmit<null>()
    this.onEndEmitter = eventmit<null>()
    this.onPauseEmitter = eventmit<null>()
    this.onResumeEmitter = eventmit<null>()
    if (option.onStart) this.onStartEmitter.on(option.onStart)
    if (option.onEnd) this.onEndEmitter.on(option.onEnd)
    if (option.onPause) this.onPauseEmitter.on(option.onPause)
    if (option.onResume) this.onResumeEmitter.on(option.onResume)
  }

  private update(gen: Gen) {
    const { value, done } = gen.next()
    if (!value || done) {
      this.onEndEmitter.emit(null)
      return
    }

    this.animeted = Animated.timing(this.animatedValue, {
      ...value,
      isInteraction: false,
      useNativeDriver: false,
    })

    this.exec()
  }

  private exec() {
    this.animeted?.start(({ finished }) => {
      if (finished) {
        this.update(this.animations)
      }
    })
  }

  private reset() {
    this.animatedValue.setValue(this.initialValue)
    if (this.animeted) {
      this.animeted.reset()
      this.animeted = undefined
    }
    this.animations = createIterater(this.configs)
  }

  get value() {
    return this.animatedValue
  }

  onStart = (handler: () => void) => this.onStartEmitter.on(handler)
  onEnd = (handler: () => void) => this.onEndEmitter.on(handler)
  onPause = (handler: () => void) => this.onPauseEmitter.on(handler)
  onResume = (handler: () => void) => this.onResumeEmitter.on(handler)

  use(configs: Config[]) {
    this.configs = configs
    this.animations = createIterater(this.configs)
    return this
  }

  play() {
    this.reset()
    this.onStartEmitter.emit(null)
    this.update(this.animations)
  }

  stop() {
    this.reset()
  }

  pause() {
    this.animeted?.stop()
  }

  resume() {
    this.exec()
  }
}
