import { useEffect, useState } from 'react'
import {
  AnimatorFactry,
  AnimationSource,
  AnimatorPlayer,
  AnimationMeta,
} from '../Animator'

export const useAnimator = (
  animation: AnimationSource
): [AnimatorPlayer | null, AnimationMeta | null] => {
  const [player, setPlayer] = useState<AnimatorPlayer | null>(null)
  const [meta, setMeta] = useState<AnimationMeta | null>(null)
  useEffect(() => {
    player?.stop()
    const [newPlayer, meta] = new AnimatorFactry().create(animation)
    setPlayer(newPlayer)
    setMeta(meta)
  }, [animation])

  return [player, meta]
}
