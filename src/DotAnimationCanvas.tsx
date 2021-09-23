import React, { FC, useEffect, useState } from 'react'
import { Animated } from 'react-native'
import { DotDrawer } from './DotDrawer'
import { DotAnimator } from './stateAnimate'
import { Animation } from './animations'

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
  const [frame, setFrame] = useState<[number, number]>(initialFrame.coordinate)

  if (!frame) return null

  const [x, y] = frame

  useEffect(() => {
    animator.onUpdateFrame(setFrame)
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
      <DotDrawer size={size} src={src} reverse={false} x={x} y={y} />
    </Animated.View>
  )
}
