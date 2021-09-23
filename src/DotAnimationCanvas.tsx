import React, { FC, useEffect, useState } from 'react'
import { Animated } from 'react-native'
import { DotDrawer } from './DotDrawer'
import { DotAnimator } from './stateAnimate'
import { Animation, Frame } from './animations'

interface DotAnimationCanvasProps {
  animator: DotAnimator
  initialAnimation: Animation
  src: string
  size: number
}

export const DotAnimationCanvas: FC<DotAnimationCanvasProps> = ({
  initialAnimation,
  size,
  src,
  animator,
}) => {
  const initialFrame = initialAnimation.frames[0]
  const [frame, setFrame] = useState<Frame>(initialFrame)

  const [x, y] = frame.coordinate
  const reverse = frame.reverse

  useEffect(() => {
    animator.onUpdateFrame((arg) => {
      setFrame(arg)
    })
  }, [])

  return (
    <Animated.View
      style={{
        transform: [
          { translateX: animator.transitionValue.x },
          { translateY: animator.transitionValue.y },
        ],
      }}
    >
      <DotDrawer size={size} src={src} reverse={reverse} x={x} y={y} />
    </Animated.View>
  )
}
