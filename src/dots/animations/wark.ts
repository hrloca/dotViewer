import { AnimationSource } from '../../Animator'

export const warkFront: AnimationSource = {
  name: '歩き(前)',
  fps: 24,
  frames: 20,
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
  name: '歩き(後)',
  fps: 24,
  frames: 20,
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
  name: '歩き(左)',
  fps: 24,
  frames: 20,
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
  name: '歩き(右)',
  fps: 24,
  frames: 20,
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
