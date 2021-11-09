import { Easing } from './Tween/bezier'

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
  bezier?: [number, number, number, number]
  ease?: Easing
}

export type LabelSpan = Span & {
  type: 'label'
  label: string
}

export type Keyframe = StaticSpan | TweenSpan | LabelSpan

export type Layer = {
  name: string
  keyframes: Keyframe[]
}

export type Animation = {
  name: string
  fps: number
  // TODO: to automation
  total: number
  layers: Layer[]
}
