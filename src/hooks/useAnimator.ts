import { useEffect, useState } from 'react'
import {
  AnimatorPlayer,
  AnimatorOption,
  AnimationFactory,
  AnimationSource,
  AnimationMeta,
} from '../Animator'

type UseAnimatorOption = AnimatorOption

export const useAnimator = (src: AnimationSource, option: UseAnimatorOption) => {
  const [player, setPlayer] = useState<AnimatorPlayer | null>(null)
  const [meta, setMeta] = useState<AnimationMeta | null>(null)

  const [speed, setSpeed] = useState<number>(1)
  const [time, setTime] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [isRepeat, setIsRepeat] = useState<boolean>(false)

  useEffect(() => {
    const playing = isPlaying
    player?.stop()

    const anim = new AnimationFactory(src).create()
    const newPlayer = new AnimatorPlayer(...anim, option)
    const meta = anim[0]

    newPlayer.speed = speed
    newPlayer.onEnd(() => {
      setIsPlaying(false)
    })

    setPlayer(newPlayer)
    setMeta(meta)
    setIsRepeat(meta.repeat)

    if (playing) {
      newPlayer.play(meta.repeat)
    }
  }, [src])

  useEffect(() => {
    if (!player) return
    player?.repeat(isRepeat)
  }, [isRepeat])

  useEffect(() => {
    if (!player) return
    player.speed = speed
  }, [speed])

  useEffect(() => {
    if (isPlaying) {
      player?.play(isRepeat)
    } else {
      player?.stop()
    }
  }, [isPlaying])

  useEffect(() => {
    if (time === undefined) return
    player?.seek(time)
  }, [time])

  const state = {
    speed,
    time,
    isPlaying,
    isRepeat,
  }

  const action = {
    play() {
      setIsPlaying(true)
    },
    stop() {
      setIsPlaying(false)
    },
    repeat(is: boolean) {
      setIsRepeat(is)
    },
    speed(is: number) {
      setSpeed(is)
    },
    seek(msec: number) {
      setTime(msec)
    },
  }

  return { action, state, meta }
}
