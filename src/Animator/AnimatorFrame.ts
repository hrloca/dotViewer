type AnimatorFrameOption = {
  total: number
  fps?: number
}

export class AnimatorFrame {
  private _total: number
  private _fps = 24
  constructor({ fps, total }: AnimatorFrameOption) {
    if (1 > total) {
      throw new Error('Set the number of frames to a value greater than 1.')
    }
    this._total = total
    if (fps) this._fps = fps
  }

  timeFrom(frame: number) {
    return ((frame - 1) / this._fps) * 1000
  }

  from(msTime: number) {
    return (msTime / 1000) * this._fps + 1
  }

  get totalTime() {
    return this.timeFrom(this._total)
  }

  get total() {
    return this._total
  }
}
