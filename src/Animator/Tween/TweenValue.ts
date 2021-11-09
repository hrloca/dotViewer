import { Easing as RNEasing } from 'react-native'
import { bezier } from './bezier'

export class TweenValue {
  constructor(
    private readonly from = 0,
    private readonly to = 1,
    private readonly _bezier = bezier.ease
  ) {}

  calc(rate: number /* 0 ~ 1 */) {
    if (1 < rate || 0 > rate) throw new Error()
    const abs = this.to - this.from
    const easing = RNEasing.bezier(...(this._bezier as [number, number, number, number]))
    return this.from + easing(rate) * abs
  }
}
