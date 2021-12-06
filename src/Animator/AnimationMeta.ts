import { AnimationSource } from './types'
import { AnimationFrame } from './AnimationFrame'

export class AnimationMeta {
  private readonly frame: AnimationFrame
  constructor(private readonly animation: AnimationSource) {
    this.frame = new AnimationFrame({
      fps: this.fps,
    })
  }

  get fps() {
    return this.animation.fps
  }

  get name() {
    return this.animation.name
  }

  get frames() {
    return this.animation.frames
  }

  get totalTime() {
    return this.frame.timeFrom(this.frames)
  }
}
