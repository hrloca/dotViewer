import { MutableSnapshot } from 'recoil'
import { dots, defaultDots } from './stateDots'

export const initializeState = ({ set }: MutableSnapshot) => {
  const d = JSON.parse(localStorage.getItem('dots') || '[]')

  set(dots, defaultDots(d))
}
