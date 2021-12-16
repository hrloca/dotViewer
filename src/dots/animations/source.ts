import { AnimationSource } from '../../Animator'

export const warkFront: AnimationSource = {
  id: 'warkFront',
  name: '歩き(前)',
  fps: 24,
  frames: 20,
  repeat: true,
  pause: 1,
  layers: [
    {
      name: 'dot',
      keyframes: [
        {
          type: 'static',
          startFrame: 1,
          endFrame: 5,
          value: 1,
        },
        {
          type: 'static',
          startFrame: 5,
          endFrame: 10,
          value: 2,
        },
        {
          type: 'static',
          startFrame: 10,
          endFrame: 15,
          value: 1,
        },
        {
          type: 'static',
          startFrame: 15,
          endFrame: 20,
          value: 0,
        },
      ],
    },
  ],
}

export const warkBack: AnimationSource = {
  id: 'warkBack',
  name: '歩き(後)',
  fps: 24,
  frames: 20,
  repeat: true,
  pause: 7,
  layers: [
    {
      name: 'dot',
      keyframes: [
        {
          type: 'static',
          startFrame: 1,
          endFrame: 5,
          value: 7,
        },
        {
          type: 'static',
          startFrame: 5,
          endFrame: 10,
          value: 8,
        },
        {
          type: 'static',
          startFrame: 10,
          endFrame: 15,
          value: 7,
        },
        {
          type: 'static',
          startFrame: 15,
          endFrame: 20,
          value: 6,
        },
      ],
    },
  ],
}

export const warkLeft: AnimationSource = {
  id: 'warkLeft',
  name: '歩き(左)',
  fps: 24,
  frames: 20,
  repeat: true,
  pause: 4,
  layers: [
    {
      name: 'dot',
      keyframes: [
        {
          type: 'static',
          startFrame: 1,
          endFrame: 5,
          value: 4,
        },
        {
          type: 'static',
          startFrame: 5,
          endFrame: 10,
          value: 5,
        },
        {
          type: 'static',
          startFrame: 10,
          endFrame: 15,
          value: 4,
        },
        {
          type: 'static',
          startFrame: 15,
          endFrame: 20,
          value: 3,
        },
      ],
    },
  ],
}

export const warkRight: AnimationSource = {
  id: 'warkRight',
  name: '歩き(右)',
  fps: 24,
  frames: 20,
  repeat: true,
  pause: -4,
  layers: [
    {
      name: 'dot',
      keyframes: [
        {
          type: 'static',
          startFrame: 1,
          endFrame: 5,
          value: -4,
        },
        {
          type: 'static',
          startFrame: 5,
          endFrame: 10,
          value: -5,
        },
        {
          type: 'static',
          startFrame: 10,
          endFrame: 15,
          value: -4,
        },
        {
          type: 'static',
          startFrame: 15,
          endFrame: 20,
          value: -3,
        },
      ],
    },
  ],
}

export const jutuHatsudou: AnimationSource = {
  id: 'jutuHatsudou',
  name: '術発動',
  fps: 24,
  frames: 45,
  repeat: false,
  pause: 4,
  layers: [
    {
      name: 'dot',
      keyframes: [
        {
          type: 'static',
          startFrame: 1,
          endFrame: 5,
          value: 11,
        },
        {
          type: 'static',
          startFrame: 5,
          endFrame: 9,
          value: 12,
        },
        {
          type: 'static',
          startFrame: 9,
          endFrame: 13,
          value: 11,
        },
        {
          type: 'static',
          startFrame: 13,
          endFrame: 17,
          value: 12,
        },
        {
          type: 'static',
          startFrame: 17,
          endFrame: 21,
          value: 11,
        },
        {
          type: 'static',
          startFrame: 21,
          endFrame: 25,
          value: 12,
        },
        {
          type: 'static',
          startFrame: 25,
          endFrame: 37,
          value: 13,
        },
        {
          type: 'static',
          startFrame: 37,
          endFrame: 45,
          value: 4,
        },
      ],
    },
  ],
}
