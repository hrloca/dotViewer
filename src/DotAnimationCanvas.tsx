import React, { FC, useEffect, useState } from 'react'
import { Animated } from 'react-native'
import { DotDrawer } from './DotDrawer'
import { Animation, Frame } from './animations'
import { Animator } from './stateAnimate'

interface DotAnimationCanvasProps {
  animator: Animator
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
    animator.onUpdateDotFrame(setFrame)
  }, [])

  return (
    <Animated.View
      style={{
        transform: [
          { translateX: animator.transform.x },
          { translateY: animator.transform.y },
        ],
      }}
    >
      <DotDrawer size={size} src={src} reverse={reverse} x={x} y={y} />
    </Animated.View>
  )
}
