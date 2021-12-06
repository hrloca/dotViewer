import { AnimationReader } from './AnimationReader'
import { AnimationFrame } from './AnimationFrame'

export class AnimationBody {
  constructor(
    private readonly frame: AnimationFrame,
    private readonly reader: AnimationReader
  ) {}

  readFrame(frames: number) {
    return this.reader.read(frames)
  }

  readFromTime(msec: number) {
    const frames = this.frame.from(msec)
    return this.reader.read(frames)
  }
}
