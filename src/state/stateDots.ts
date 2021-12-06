import { useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'
import { dotsrc } from '../dots'

export type Dot = {
  src: string
  name: string
  edit: boolean
}

const defaultDot: Dot = {
  name: 'デフォルト',
  src: dotsrc,
  edit: false,
}

export const dots = atom<Dot[]>({
  key: 'dots',
  default: [defaultDot],
})

export const carouselIndex = atom<0 | 1>({
  key: 'carouselIndex',
  default: 0,
})

export const defaultDots = (d: Dot) => {
  return [defaultDot].concat(d)
}

export const useManegeDots = () => {
  const [dotlist, setDots] = useRecoilState(dots)
  const setDot = (dot: Dot) => {
    setDots(dotlist.concat([dot]))
  }

  const removeDot = (index: number) => {
    setDots(dotlist.filter((_, i) => i !== index))
  }

  useEffect(() => {
    localStorage.setItem('dots', JSON.stringify(dotlist.filter((d) => d.edit)))
  }, [dotlist])

  return {
    dots: dotlist,
    setDot,
    removeDot,
  }
}
