import React, { FC, useEffect, useRef } from 'react'
import { Frame, Animation, animations } from './animations'
import Button from '@material-ui/core/Button'
import PauseCircleFilled from '@material-ui/icons/PauseCircleFilled'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'
import SkipNext from '@material-ui/icons/SkipNext'
import { css } from '@emotion/css'

type drawDotOption = {
  size: number
}

type Gen = Generator<Frame, void, unknown>

interface Drawer {
  draw([x, y]: [number, number], reverse: boolean): void
}

class DotSheetDrawer implements Drawer {
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

function* iterateFrames(frames: Animation['frames']) {
  for (const frame of frames) {
    yield frame
  }
}

class DotAnimator {
  isStop: boolean
  private timer: number
  private frames: Gen
  private readonly loop: boolean
  constructor(private readonly animation: Animation, private readonly drawer: Drawer) {
    this.loop = animation.loop
    this.frames = iterateFrames(this.animation.frames)
  }
  private exec(gen: Gen) {
    const g = gen.next()
    if (!g.value) {
      return g
    }
    this.drawer.draw(g.value.coordinate, this.animation.reverse)
    return g
  }

  private core(gen: Gen) {
    const { value } = this.exec(gen)
    if (!value) {
      if (this.loop) {
        this.init()
        this.run()
      }
      return
    }

    this.timer = window.setTimeout(() => {
      this.core(gen)
    }, value.duration)
  }

  private init() {
    this.frames = iterateFrames(this.animation.frames)
  }

  private run() {
    this.isStop = false
    this.core(this.frames)
  }

  next() {
    this.pause()
    const { done } = this.exec(this.frames)
    if (done) {
      this.init()
      this.next()
    }
  }

  pause() {
    if (this.isStop) return
    this.isStop = true
    window.clearTimeout(this.timer)
  }

  resume() {
    if (!this.isStop) return
    this.isStop = false
    this.core(this.frames)
  }

  start() {
    this.init()
    this.stop()
    this.isStop = false
    this.core(this.frames)
  }

  stop() {
    this.init()
    this.pause()
    this.exec(this.frames)
  }
}

interface DotCanvasProps {
  index: number
  imgPath: string
  size: number
}

export const DotCanvas: FC<DotCanvasProps> = ({ index, imgPath, size }) => {
  const ref = useRef<HTMLCanvasElement | null>(null)
  const an = useRef<DotAnimator | null>(null)

  useEffect(() => {
    const canvasEl: HTMLCanvasElement | null = ref.current
    if (!canvasEl) return
    const ctx = canvasEl.getContext('2d')
    if (!ctx) return
    const img = new Image()
    img.src = imgPath

    const drawer = new DotSheetDrawer(img, ctx, { size })
    an.current = new DotAnimator(animations[index], drawer)

    img.onload = () => {
      an.current?.start()
    }
    return () => {
      an.current?.stop()
    }
  }, [imgPath, index, size])

  return (
    <div>
      <canvas ref={ref} height={size} width={size} />
      <div className={styles.controller}>
        <Button onClick={() => an.current?.pause()}>
          <PauseCircleFilled />
        </Button>
        <Button onClick={() => an.current?.resume()}>
          <PlayCircleFilledIcon />
        </Button>
        <Button onClick={() => an.current?.next()}>
          <SkipNext />
        </Button>
      </div>
    </div>
  )
}

const styles = {
  controller: css({
    position: 'absolute',
    bottom: 8,
    right: 8,
  }),
}
