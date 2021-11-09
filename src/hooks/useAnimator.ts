import { useEffect, useState } from 'react'
import { AnimatorFactry, Animation, AnimatorOption, AnimatorPlayer } from '../Animator'

export const useAnimator = (animation: Animation, option: AnimatorOption) => {
  const [player, set] = useState<AnimatorPlayer | null>(null)
  useEffect(() => {
    const player = new AnimatorFactry().create(animation, option)
    set(player)
  }, [])

  return player
}
