import { TweenRate, TweenValue } from './Tween'
import { bezier } from './Tween/bezier'
import { AnimationSource, Layer } from './types'

export class AnimationReader {
  constructor(private readonly animation: AnimationSource) {}

  read(frame: number) {
    return this.animation.layers.map((layer) => this.readLayer(frame, layer))
  }

  private readLayer(frame: number, layer: Layer) {
    const ly = layer.keyframes.find((l) => frame >= l.startFrame && frame <= l.endFrame)
    if (!ly) return

    const start = ly.startFrame
    const end = ly.endFrame

    switch (ly.type) {
      case 'tween': {
        const rate = new TweenRate(start, end)
        const currentRate = rate.calc(frame)
        const b = ly.ease ? bezier[ly.ease] : undefined
        const value = new TweenValue(ly.from, ly.to, ly.bezier || b)

        return value.calc(currentRate)
      }
      case 'static': {
        return ly.value
      }
      default: {
        throw new Error()
      }
    }
  }
}
