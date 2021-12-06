export type EventmitHandler<T> = (value: T) => void

export type Eventmitter<T> = {
  on: (handler: EventmitHandler<T>) => void
  off: (handler: EventmitHandler<T>) => void
  offAll: () => void
  emit: (value: T) => void
  size: number
}

export const eventmit: <T>() => Eventmitter<T> = <T>() => {
  const set = new Set<EventmitHandler<T>>()
  return {
    get size() {
      return set.size
    },
    on(handler: EventmitHandler<T>) {
      set.add(handler)
    },
    off(handler: EventmitHandler<T>) {
      set.delete(handler)
    },
    offAll() {
      set.clear()
    },
    emit(value: T) {
      set.forEach((handler) => handler(value))
    },
  }
}
