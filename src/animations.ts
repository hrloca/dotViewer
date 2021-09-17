export type Frame = {
  coordinate: [number, number]
  duration: number
}

export type Animation = {
  name: string
  loop: boolean
  reverse: boolean
  frames: Frame[]
}

export const animations: Animation[] = [
  {
    name: '歩き(前)',
    loop: true,
    reverse: false,
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
    reverse: false,
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
    reverse: false,
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
    reverse: true,
    frames: [
      { coordinate: [3, 0], duration: 200 },
      { coordinate: [4, 0], duration: 200 },
      { coordinate: [0, 1], duration: 200 },
      { coordinate: [4, 0], duration: 200 },
    ],
  },
  {
    name: '走り(前)',
    loop: true,
    reverse: false,
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
    reverse: false,
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
    reverse: true,
    frames: [
      { coordinate: [0, 3], duration: 100 },
      { coordinate: [1, 3], duration: 100 },
      { coordinate: [2, 3], duration: 100 },
      { coordinate: [1, 3], duration: 100 },
    ],
  },
  {
    name: '術発動',
    loop: false,
    reverse: false,
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
]

/*
  {
    name: '歩き(後)',
    roop: true,
  },
  {
    name: '歩き(左)',
    roop: true,
  },
  {
    name: '歩き(右)',
  },
  {
    name: '走り(前)',
  },
  {
    name: '走り(後)',
  },
  {
    name: '走り(左)',
  },
  {
    name: '走り(右)',
  },
  {
    name: '行動選択',
  },
  {
    name: '行動決定(技)',
  },
  {
    name: '行動決定(術)',
  },
  {
    name: '術発動',
  },
  {
    name: '成長',
  },
  {
    name: '勝利',
  },
  {
    name: 'ダメージ',
  },
*/
