export class TweenRate {
  constructor(private readonly start: number, private readonly end: number) {}

  calc(value: number) {
    const total = this.end - this.start
    const elapsedFrame = value - this.start
    const currentRate = elapsedFrame / total

    if (currentRate > 1) {
      return 1
    }

    return currentRate
  }
}
