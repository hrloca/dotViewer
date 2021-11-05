import { TweenRate, TweenValue } from './Tween'
import { Animation, Layer } from './types'

export class AnimationFrameReader {
  constructor(private readonly animation: Animation) {}

  read(frame: number) {
    return this.animation.layers.map((layer) => this.readLayer(frame, layer))
  }

  private readLayer(frame: number, layer: Layer) {
    const ly = layer.find((l) => frame >= l.startPoint && frame <= l.endPoint)
    if (!ly) return undefined

    const start = ly.startPoint
    const end = ly.endPoint

    switch (ly.type) {
      case 'tween': {
        const rate = new TweenRate(start, end)
        const currentRate = rate.calc(frame)
        const value = new TweenValue(ly.from, ly.to)
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
