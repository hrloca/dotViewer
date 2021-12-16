export * from './ee'

export const countup =
  (max: number, min = 0, up = 1, loop = true) =>
  (current: number) => {
    const next = current + up
    if (!loop) return next
    return next > max ? min : next
  }

export const countdown =
  (max: number, min = 0, down = 1, loop = true) =>
  (current: number) => {
    const next = current - down
    if (!loop) return next
    return next < min ? max : next
  }
