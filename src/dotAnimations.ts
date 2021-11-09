import { Animation } from './Animator'

export const wark: Animation = {
  name: '歩き',
  fps: 24,
  total: 20,
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

export const animations: Animation[] = [wark]
