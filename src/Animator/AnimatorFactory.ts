import { Animation } from './types'
import { AnimationMeta } from './AnimationMeta'
import { AnimationFrameReader } from './AnimationReader'
import { AnimatorTimeline } from './AnimatorTimeline'
import { AnimatorFrame } from './AnimatorFrame'
import { AnimatorPlayer, AnimatorOption } from './AnimatorPlayer'

export class AnimatorFactry {
  create(animation: Animation, option: AnimatorOption) {
    const meta = new AnimationMeta(animation)
    const reader = new AnimationFrameReader(animation)
    const timeline = new AnimatorTimeline(meta.totalTime)
    const frame = new AnimatorFrame({ fps: meta.fps, total: meta.frames })
    return new AnimatorPlayer(timeline, frame, meta, reader, option)
  }
}
