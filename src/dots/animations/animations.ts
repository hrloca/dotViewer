import { Animated, Easing } from 'react-native'

const frame = (f: number) => 16 * f
const value = (b: number) => (c: number) => b + c
const motion = value(60)

export type Frame = {
  coordinate: [number, number]
  duration: number
  reverse?: boolean
}

export type TransitionOld = {
  toValue: { x: number; y: number }
  duration: number
  delay?: number
  easing?: Animated.TimingAnimationConfig['easing']
}

export type Animation = {
  name: string
  loop: boolean
  frames: Frame[]
  reverse?: boolean
  transition?: TransitionOld[]
  weapons?: Frame[]
}

export type Transition = Omit<Animated.TimingAnimationConfig, 'useNativeDriver'>

export type Transform = {
  translateX: Transition[]
  translateY: Transition[]
  rotate: Transition[]
  scaleX: Transition[]
  scaleY: Transition[]
}

export const animations: Animation[] = [
  {
    name: '歩き(前)',
    loop: true,
    frames: [
      { coordinate: [0, 0], duration: frame(12) },
      { coordinate: [1, 0], duration: frame(12) },
      { coordinate: [2, 0], duration: frame(12) },
      { coordinate: [1, 0], duration: frame(12) },
    ],
  },
  {
    name: '歩き(後)',
    loop: true,
    frames: [
      { coordinate: [1, 1], duration: frame(12) },
      { coordinate: [2, 1], duration: frame(12) },
      { coordinate: [3, 1], duration: frame(12) },
      { coordinate: [2, 1], duration: frame(12) },
    ],
  },
  {
    name: '歩き(左)',
    loop: true,
    frames: [
      { coordinate: [3, 0], duration: frame(12) },
      { coordinate: [4, 0], duration: frame(12) },
      { coordinate: [0, 1], duration: frame(12) },
      { coordinate: [4, 0], duration: frame(12) },
    ],
  },
  {
    name: '歩き(右)',
    loop: true,
    frames: [
      { coordinate: [3, 0], duration: frame(12), reverse: true },
      { coordinate: [4, 0], duration: frame(12), reverse: true },
      { coordinate: [0, 1], duration: frame(12), reverse: true },
      { coordinate: [4, 0], duration: frame(12), reverse: true },
    ],
  },
  {
    name: '走り(前)',
    loop: true,
    frames: [
      { coordinate: [0, 0], duration: frame(6) },
      { coordinate: [1, 0], duration: frame(6) },
      { coordinate: [2, 0], duration: frame(6) },
      { coordinate: [1, 0], duration: frame(6) },
    ],
  },
  {
    name: '走り(後)',
    loop: true,
    frames: [
      { coordinate: [1, 1], duration: frame(6) },
      { coordinate: [2, 1], duration: frame(6) },
      { coordinate: [3, 1], duration: frame(6) },
      { coordinate: [2, 1], duration: frame(6) },
    ],
  },
  {
    name: '走り(左)',
    loop: true,
    reverse: false,
    frames: [
      { coordinate: [0, 3], duration: frame(6) },
      { coordinate: [1, 3], duration: frame(6) },
      { coordinate: [2, 3], duration: frame(6) },
      { coordinate: [1, 3], duration: frame(6) },
    ],
  },
  {
    name: '走り(右)',
    loop: true,
    frames: [
      { coordinate: [0, 3], duration: frame(6), reverse: true },
      { coordinate: [1, 3], duration: frame(6), reverse: true },
      { coordinate: [2, 3], duration: frame(6), reverse: true },
      { coordinate: [1, 3], duration: frame(6), reverse: true },
    ],
  },
  {
    name: '行動決定(技)',
    loop: false,
    frames: [
      { coordinate: [4, 0], duration: frame(3) },
      { coordinate: [3, 1], duration: frame(3) },
      { coordinate: [3, 0], duration: frame(3), reverse: true },
      { coordinate: [2, 0], duration: frame(3) },
      { coordinate: [4, 2], duration: frame(18) },
    ],
  },
  {
    name: '行動決定(術)',
    loop: false,
    frames: [
      { coordinate: [0, 1], duration: frame(6) },
      { coordinate: [2, 2], duration: frame(18) },
    ],
  },
  {
    name: '術発動',
    loop: false,
    frames: [
      { coordinate: [1, 2], duration: frame(8) },
      { coordinate: [2, 2], duration: frame(8) },
      { coordinate: [1, 2], duration: frame(8) },
      { coordinate: [2, 2], duration: frame(8) },
      { coordinate: [1, 2], duration: frame(8) },
      { coordinate: [2, 2], duration: frame(8) },
      { coordinate: [3, 2], duration: frame(20) },
      { coordinate: [4, 0], duration: frame(12) },
    ],
  },
  {
    name: '成長',
    loop: false,
    frames: [
      { coordinate: [0, 2], duration: frame(3) },
      { coordinate: [2, 0], duration: frame(3) },
      { coordinate: [0, 1], duration: frame(3), reverse: true },
      { coordinate: [1, 1], duration: frame(3) },
      { coordinate: [0, 1], duration: frame(3) },
      { coordinate: [4, 2], duration: frame(18) },
    ],
  },
  {
    name: 'ダメージ',
    loop: false,
    transition: [
      { toValue: { x: 10, y: 0 }, duration: frame(6), easing: Easing.in(Easing.sin) },
      { toValue: { x: 0, y: 0 }, duration: frame(6), easing: Easing.out(Easing.sin) },
    ],
    frames: [{ coordinate: [3, 3], duration: frame(24) }],
  },
  {
    name: '勝利',
    loop: false,
    transition: [
      {
        toValue: { x: 0, y: -100 },
        delay: frame(14),
        duration: frame(14),
        easing: Easing.out(Easing.cubic),
      },
      { toValue: { x: 0, y: 0 }, duration: frame(14), easing: Easing.in(Easing.cubic) },
    ],
    frames: [
      { coordinate: [4, 0], duration: frame(4) },
      { coordinate: [4, 3], duration: frame(6) },
      { coordinate: [3, 1], duration: frame(4) }, // jump
      { coordinate: [3, 0], duration: frame(4), reverse: true },
      { coordinate: [2, 0], duration: frame(4) },
      { coordinate: [3, 0], duration: frame(4) }, // rev
      { coordinate: [3, 1], duration: frame(4) },
      { coordinate: [3, 0], duration: frame(4), reverse: true },
      { coordinate: [2, 0], duration: frame(4) },
      { coordinate: [4, 1], duration: frame(4) }, // done
    ],
  },
  {
    name: 'おまけ(円舞剣)',
    loop: false,
    transition: [
      {
        toValue: { x: motion(0), y: 0 },
        duration: frame(4),
        easing: Easing.out(Easing.sin),
      },
      {
        toValue: { x: motion(-25), y: -10 },
        delay: frame(24),
        duration: frame(3),
        easing: Easing.out(Easing.sin),
      },
      {
        toValue: { x: motion(-70), y: 0 },
        duration: frame(3),
        easing: Easing.in(Easing.sin),
      },
      {
        toValue: { x: motion(-10), y: 0 },
        delay: frame(9),
        duration: frame(9),
        easing: Easing.out(Easing.sin),
      },
      {
        toValue: { x: motion(-100), y: 0 },
        duration: frame(12),
        easing: Easing.out(Easing.sin),
      },
      {
        toValue: { x: motion(-50), y: -100 },
        delay: frame(6),
        duration: frame(6),
        easing: Easing.out(Easing.sin),
      },
      {
        toValue: { x: motion(0), y: 0 },
        duration: frame(6),
        easing: Easing.in(Easing.sin),
      },
      {
        toValue: { x: motion(-50), y: -100 },
        delay: frame(3),
        duration: frame(6),
        easing: Easing.out(Easing.sin),
      },
      {
        toValue: { x: motion(-100), y: 0 },
        duration: frame(6),
        easing: Easing.in(Easing.sin),
      },
      {
        toValue: { x: motion(-120), y: 0 },
        duration: frame(4),
        easing: Easing.in(Easing.sin),
      },
      {
        toValue: { x: motion(-50), y: -150 },
        delay: frame(6),
        duration: frame(9),
        easing: Easing.in(Easing.sin),
      },
      {
        toValue: { x: motion(-10), y: 0 },
        duration: frame(9),
        easing: Easing.in(Easing.sin),
      },
      {
        toValue: { x: motion(0), y: 0 },
        duration: frame(6),
        easing: Easing.in(Easing.sin),
      },
    ],
    frames: [
      { coordinate: [4, 1], duration: frame(28) },
      { coordinate: [2, 3], duration: frame(6) }, // Jump
      { coordinate: [0, 2], duration: frame(3) }, // ReadySword, Landing
      { coordinate: [4, 1], duration: frame(6) }, // HoldSword
      { coordinate: [0, 2], duration: frame(9) },
      { coordinate: [0, 3], duration: frame(6) },
      { coordinate: [1, 3], duration: frame(6) },
      { coordinate: [4, 3], duration: frame(6) },
      { coordinate: [0, 2], duration: frame(15) },
      { coordinate: [1, 3], duration: frame(6) },
      { coordinate: [0, 3], duration: frame(6) },
      { coordinate: [1, 3], duration: frame(6) },
      { coordinate: [4, 3], duration: frame(6) },

      { coordinate: [2, 3], duration: frame(5) },
      { coordinate: [1, 1], duration: frame(5) },
      { coordinate: [1, 3], duration: frame(5), reverse: true },
      { coordinate: [0, 1], duration: frame(3) },

      { coordinate: [4, 3], duration: frame(9) },
      { coordinate: [3, 0], duration: frame(9) },
      { coordinate: [4, 0], duration: 400 },
    ],
  },
]
