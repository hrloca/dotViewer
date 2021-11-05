import { Animation } from './types'
import { AnimatorFrame } from './AnimatorFrame'

export class AnimationMeta {
  private readonly frame: AnimatorFrame
  constructor(private readonly animation: Animation) {
    this.frame = new AnimatorFrame({
      fps: this.fps,
      total: this.frames,
    })
  }

  get fps() {
    return this.animation.fps
  }

  get name() {
    return this.animation.name
  }

  get frames() {
    return 20
  }

  get totalTime() {
    return this.frame.timeFrom(this.frames)
  }
}
