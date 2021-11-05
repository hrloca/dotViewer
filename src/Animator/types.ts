export type Span = {
  startPoint: number
  endPoint: number
  label?: string
}

export type StaticSpan = Span & {
  type: 'static'
  value: number
}

export type TweenSpan = Span & {
  type: 'tween'
  from: number
  to: number
}

export type LabelSpan = Span & {
  type: 'label'
  label: string
}

export type Keyframe = StaticSpan | TweenSpan | LabelSpan

export type Layer = Keyframe[]

export type Animation = {
  name: string
  fps: number
  layers: Layer[]
}
