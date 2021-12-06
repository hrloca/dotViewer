type AnimatorFrameOption = {
  fps?: number
}

export class AnimationFrame {
  private _fps = 24
  constructor({ fps }: AnimatorFrameOption) {
    if (fps) this._fps = fps
  }

  get fps() {
    return this._fps
  }

  timeFrom(frame: number) {
    return ((frame - 1) / this._fps) * 1000
  }

  from(msTime: number) {
    return (msTime / 1000) * this._fps + 1
  }
}
