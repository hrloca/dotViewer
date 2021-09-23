import React, { FC, useEffect, useRef, useState } from 'react'

const resolveSheetCoordinate = (x: number, y: number): [number, number] => {
  const sx = 8 + x * 48
  const sy = 8 + y * 48
  return [sx, sy]
}

const draw =
  (ctx: CanvasRenderingContext2D, img: HTMLImageElement, size = 32) =>
  ([x, y]: [number, number]) => {
    ctx.clearRect(0, 0, size, size)
    ctx.imageSmoothingEnabled = false
    ctx.drawImage(img, ...resolveSheetCoordinate(x, y), 32, 32, 0, 0, size, size)
  }

export interface DotDrawer {
  x: number
  y: number
  src: string
  reverse?: boolean
  size: number
}

export const DotDrawer: FC<DotDrawer> = ({ reverse = false, x, y, src, size }) => {
  const ref = useRef<HTMLCanvasElement | null>(null)
  const [drawer, setDrawer] = useState<ReturnType<typeof draw> | null>(null)

  useEffect(() => {
    const canvasEl: HTMLCanvasElement | null = ref.current
    if (!canvasEl) return
    const ctx = canvasEl.getContext('2d')
    if (!ctx) return
    const img = new Image()
    img.src = src

    const d = draw(ctx, img, size)
    img.onload = () => {
      setDrawer(() => d)
    }
  }, [src, size])

  useEffect(() => {
    if (!drawer) return
    drawer([x, y])
  }, [drawer, x, y, size, reverse])

  return (
    <div style={{ transform: reverse ? 'scale(-1, 1)' : undefined }}>
      <canvas ref={ref} height={size} width={size} />
    </div>
  )
}
