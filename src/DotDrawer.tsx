import React, { FC, useEffect, useRef } from 'react'

type drawDotOption = {
  size: number
}

interface Drawer {
  draw([x, y]: [number, number], reverse: boolean): void
}

export class DotSheetDrawer implements Drawer {
  constructor(
    private readonly img: HTMLImageElement,
    private readonly ctx: CanvasRenderingContext2D,
    private readonly option: drawDotOption = { size: 32 }
  ) {}

  private resolveSheetCoordinate = (x: number, y: number): [number, number] => {
    const sx = 8 + x * 48
    const sy = 8 + y * 48
    return [sx, sy]
  }

  draw([x, y]: [number, number], reverse: boolean) {
    const size = this.option.size
    this.ctx.clearRect(0, 0, size, size)
    this.ctx.imageSmoothingEnabled = false
    this.ctx.drawImage(
      this.img,
      ...this.resolveSheetCoordinate(x, y),
      32,
      32,
      0,
      0,
      size,
      size
    )
    if (reverse) {
      // TODO
    }
  }
}

export interface DotDrawer {
  x: number
  y: number
  src: string
  reverse: boolean
  size: number
}

export const DotDrawer: FC<DotDrawer> = ({ reverse, x, y, src: imgPath, size }) => {
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvasEl: HTMLCanvasElement | null = ref.current
    if (!canvasEl) return
    const ctx = canvasEl.getContext('2d')
    if (!ctx) return
    const img = new Image()
    img.src = imgPath

    const drawer = new DotSheetDrawer(img, ctx, { size })

    img.onload = () => {
      drawer.draw([x, y], reverse)
    }
  }, [imgPath, x, y, size, reverse])

  return <canvas ref={ref} height={size} width={size} />
}
