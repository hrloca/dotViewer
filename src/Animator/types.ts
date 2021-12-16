import { Easing } from './Tween/bezier'

export type Span = {
  startFrame: number
  endFrame: number
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

export type AnimationSource = {
  id: string
  name: string
  fps: number
  // TODO: to automation
  frames: number
  layers: Layer[]
  repeat: boolean
  pause?: number
  stage?: {
    src?: string
    bgcolor?: string
  }
}
