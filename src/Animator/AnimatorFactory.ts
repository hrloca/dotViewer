import { AnimationSource } from './types'
import { AnimationMeta } from './AnimationMeta'
import { AnimationReader } from './AnimationReader'
import { Timekeeper } from './Timekeeper'
import { AnimationFrame } from './AnimationFrame'
import { AnimatorPlayer } from './AnimatorPlayer'
import { AnimationBody } from './Animation'

export class AnimationFactory {
  create(src: AnimationSource): [AnimationMeta, AnimationBody] {
    const meta = new AnimationMeta(src)
    const reader = new AnimationReader(src)
    const frame = new AnimationFrame({ fps: meta.fps })
    const body = new AnimationBody(frame, reader)

    return [meta, body]
  }
}

export class AnimatorFactry {
  create(animation: AnimationSource): [AnimatorPlayer, AnimationMeta] {
    const [meta, body] = new AnimationFactory().create(animation)

    const timekeeper = new Timekeeper()
    timekeeper.total = meta.totalTime

    return [new AnimatorPlayer(timekeeper, body), meta]
  }
}
