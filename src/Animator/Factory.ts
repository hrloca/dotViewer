import { AnimationSource } from './types'
import { AnimationMeta } from './AnimationMeta'
import { AnimationReader } from './AnimationReader'
import { AnimationFrame } from './AnimationFrame'
import { AnimationBody } from './Animation'

export class AnimationFactory {
  constructor(private readonly src: AnimationSource) {}
  create(): [AnimationMeta, AnimationBody] {
    const meta = new AnimationMeta(this.src)
    const reader = new AnimationReader(this.src)
    const frame = new AnimationFrame({ fps: meta.fps })
    const body = new AnimationBody(frame, reader)

    return [meta, body]
  }
}
