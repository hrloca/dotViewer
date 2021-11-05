import { Animation } from './types'
import { AnimationMeta } from './AnimationMeta'
import { AnimationFrameReader } from './AnimationFrameReader'
import { AnimatorTimeline } from './AnimatorTimeline'
import { AnimatorFrame } from './AnimatorFrame'
import { Animator, AnimatorOption } from './Animator'

export class AnimatorFactry {
  create(animation: Animation, option: AnimatorOption) {
    const meta = new AnimationMeta(animation)
    const reader = new AnimationFrameReader(animation)
    const timeline = new AnimatorTimeline(meta.totalTime)
    const frame = new AnimatorFrame({ fps: meta.fps, total: meta.frames })
    return new Animator(timeline, frame, meta, reader, option)
  }
}
