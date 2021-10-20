import { useRef, useState, useEffect } from 'react'
import { Animated } from 'react-native'
import { TransformAnimator, DotAnimator, DotAnimatorOption } from './DotAnimator'
import { Frame, Animation } from './animations'

export type AnimationState = 'stop' | 'play' | 'pause'
export type AnimatorAction = {
  play: () => void
  stop: () => void
  use: (animation: Animation) => void
}

export type Animator = {
  action: AnimatorAction
  state: AnimationState
  loop: boolean
  onUpdateDotFrame: (f: (c: Frame) => void) => void
  transform: Animated.ValueXY
}

export const useDotAnimator = (option: DotAnimatorOption = {}): Animator => {
  const dotAnimatorRef = useRef(new DotAnimator(option)).current
  const transformAnimator = useRef(new TransformAnimator()).current

  const [playState, setPlayState] = useState<AnimationState>('stop')
  const [loop, setLoop] = useState(false)

  const play = () => {
    setPlayState('play')
    dotAnimatorRef.play()
    transformAnimator.play()
  }

  const stop = () => {
    setPlayState('stop')
    dotAnimatorRef.stop()
    transformAnimator.stop()
  }

  const use = (animation: Animation) => {
    setLoop(animation.loop)
    dotAnimatorRef.use(animation)
    transformAnimator.use(animation.transition || [])
  }

  const onUpdateDotFrame = (f: (c: Frame) => void) => {
    dotAnimatorRef.onUpdate(f)
  }

  useEffect(() => {
    dotAnimatorRef.onEnd(() => {
      setPlayState('stop')
      if (loop) {
        play()
      }
    })
    return () => {
      dotAnimatorRef.offOnEnd()
    }
  }, [loop])

  return {
    loop,
    action: {
      play,
      stop,
      use,
    },
    state: playState,
    onUpdateDotFrame,
    transform: transformAnimator.value,
  }
}
