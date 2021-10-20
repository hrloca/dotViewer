import { Easing } from 'react-native'

export class TweenValue {
  constructor(
    private readonly from = 0,
    private readonly to = 1,
    private readonly easing = Easing.inOut(Easing.ease)
  ) {}

  calc(rate: number /* 0 ~ 1 */) {
    if (1 < rate || 0 > rate) throw new Error()
    const abs = this.to - this.from
    return this.from + this.easing(rate) * abs
  }
}
