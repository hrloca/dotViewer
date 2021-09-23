import { Animated, Easing } from 'react-native'

export type Frame = {
  coordinate: [number, number]
  duration: number
  reverse?: boolean
}

export type Transition = {
  value: { x: number; y: number }
  duration: number
  delay?: number
  easing?: Animated.TimingAnimationConfig['easing']
}

export type Animation = {
  name: string
  loop: boolean
  frames: Frame[]
  reverse?: boolean
  transition?: Transition[]
  weapons?: Frame[]
}

export const animations: Animation[] = [
  {
    name: '歩き(前)',
    loop: true,
    frames: [
      { coordinate: [0, 0], duration: 200 },
      { coordinate: [1, 0], duration: 200 },
      { coordinate: [2, 0], duration: 200 },
      { coordinate: [1, 0], duration: 200 },
    ],
  },
  {
    name: '歩き(後)',
    loop: true,
    frames: [
      { coordinate: [1, 1], duration: 200 },
      { coordinate: [2, 1], duration: 200 },
      { coordinate: [3, 1], duration: 200 },
      { coordinate: [2, 1], duration: 200 },
    ],
  },
  {
    name: '歩き(左)',
    loop: true,
    frames: [
      { coordinate: [3, 0], duration: 200 },
      { coordinate: [4, 0], duration: 200 },
      { coordinate: [0, 1], duration: 200 },
      { coordinate: [4, 0], duration: 200 },
    ],
  },
  {
    name: '歩き(右)',
    loop: true,
    frames: [
      { coordinate: [3, 0], duration: 200, reverse: true },
      { coordinate: [4, 0], duration: 200, reverse: true },
      { coordinate: [0, 1], duration: 200, reverse: true },
      { coordinate: [4, 0], duration: 200, reverse: true },
    ],
  },
  {
    name: '走り(前)',
    loop: true,
    frames: [
      { coordinate: [0, 0], duration: 100 },
      { coordinate: [1, 0], duration: 100 },
      { coordinate: [2, 0], duration: 100 },
      { coordinate: [1, 0], duration: 100 },
    ],
  },
  {
    name: '走り(後)',
    loop: true,
    frames: [
      { coordinate: [1, 1], duration: 100 },
      { coordinate: [2, 1], duration: 100 },
      { coordinate: [3, 1], duration: 100 },
      { coordinate: [2, 1], duration: 100 },
    ],
  },
  {
    name: '走り(左)',
    loop: true,
    reverse: false,
    frames: [
      { coordinate: [0, 3], duration: 100 },
      { coordinate: [1, 3], duration: 100 },
      { coordinate: [2, 3], duration: 100 },
      { coordinate: [1, 3], duration: 100 },
    ],
  },
  {
    name: '走り(右)',
    loop: true,
    frames: [
      { coordinate: [0, 3], duration: 100, reverse: true },
      { coordinate: [1, 3], duration: 100, reverse: true },
      { coordinate: [2, 3], duration: 100, reverse: true },
      { coordinate: [1, 3], duration: 100, reverse: true },
    ],
  },
  {
    name: '行動決定(技)',
    loop: false,
    frames: [
      { coordinate: [4, 0], duration: 50 },
      { coordinate: [3, 1], duration: 50 },
      { coordinate: [3, 0], duration: 50, reverse: true },
      { coordinate: [2, 0], duration: 50 },
      { coordinate: [4, 2], duration: 300 },
    ],
  },
  {
    name: '行動決定(術)',
    loop: false,
    frames: [
      { coordinate: [0, 1], duration: 100 },
      { coordinate: [2, 2], duration: 300 },
    ],
  },
  {
    name: '術発動',
    loop: false,
    frames: [
      { coordinate: [1, 2], duration: 150 },
      { coordinate: [2, 2], duration: 150 },
      { coordinate: [1, 2], duration: 150 },
      { coordinate: [2, 2], duration: 150 },
      { coordinate: [1, 2], duration: 150 },
      { coordinate: [2, 2], duration: 150 },
      { coordinate: [3, 2], duration: 500 },
      { coordinate: [4, 0], duration: 200 },
    ],
  },
  {
    name: '成長',
    loop: false,
    frames: [
      { coordinate: [0, 2], duration: 50 },
      { coordinate: [2, 0], duration: 50 },
      { coordinate: [0, 1], duration: 50, reverse: true },
      { coordinate: [1, 1], duration: 50 },
      { coordinate: [0, 1], duration: 50 },
      { coordinate: [4, 2], duration: 300 },
    ],
  },
  {
    name: 'ダメージ',
    loop: false,
    transition: [
      { value: { x: 10, y: 0 }, duration: 100, easing: Easing.in(Easing.sin) },
      { value: { x: 0, y: 0 }, duration: 100, easing: Easing.out(Easing.sin) },
    ],
    frames: [{ coordinate: [3, 3], duration: 500 }],
  },
  {
    name: '勝利',
    loop: false,
    transition: [
      {
        value: { x: 0, y: -100 },
        delay: 150,
        duration: 210,
        easing: Easing.out(Easing.cubic),
      },
      { value: { x: 0, y: 0 }, duration: 210, easing: Easing.in(Easing.cubic) },
    ],
    frames: [
      { coordinate: [4, 0], duration: 60 },
      { coordinate: [4, 3], duration: 90 },
      { coordinate: [3, 1], duration: 60 }, // jump
      { coordinate: [3, 0], duration: 60, reverse: true },
      { coordinate: [2, 0], duration: 60 },
      { coordinate: [3, 0], duration: 60 }, // rev
      { coordinate: [3, 1], duration: 60 },
      { coordinate: [3, 0], duration: 60, reverse: true },
      { coordinate: [2, 0], duration: 60 },
      { coordinate: [4, 1], duration: 60 }, // done
    ],
  },
]
