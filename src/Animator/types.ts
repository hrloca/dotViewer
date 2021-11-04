export type Frame = {
  value: number
  target: number
}

export type StaticSpan = {
  type: 'static'
  startFrame: number
  endFrame: number
  from: number
}

export type TweenSpan = {
  type: 'tween'
  startFrame: number
  endFrame: number
  from: number
  to: number
}

export type Keyframe = StaticSpan | TweenSpan

export type OldKeyframe = {
  type: 'static' | 'tween'
  start?: number
  end?: number
  from: Frame
  to: Frame
}

export type Label = {
  label: string
  from: number
  to: number
}

export type Tween = unknown

export type Layer = OldKeyframe

export type Animation = {
  fps: number
  layer: Layer[]
}
