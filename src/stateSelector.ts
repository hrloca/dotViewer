import { atom, useRecoilState, useResetRecoilState } from 'recoil'

export enum Phase {
  SheetSelecting,
  NameEditing,
  Idle,
}

type Selector = {
  name: string
  src: string
  phase: Phase
}

export const selectorState = atom<Selector>({
  key: 'selector',
  default: {
    name: '',
    src: '',
    phase: Phase.Idle,
  },
})

type useSelectorStateInput = {
  onEdited?: (src: string, name: string) => void
}

export const useSelectorState = ({ onEdited }: useSelectorStateInput = {}) => {
  const [selector, setSelector] = useRecoilState(selectorState)
  const reset = useResetRecoilState(selectorState)
  const idle = () => {
    reset()
  }
  const startSelectSheet = () => {
    setSelector({
      ...selector,
      name: '',
      src: '',
      phase: Phase.SheetSelecting,
    })
  }

  const selectedSheet = (src: string, name: string) => {
    setSelector({
      ...selector,
      name,
      src,
      phase: Phase.NameEditing,
    })
  }

  const editName = (name: string) => {
    setSelector({
      ...selector,
      name,
      phase: Phase.NameEditing,
    })
  }

  const decided = () => {
    onEdited?.(selector.src, selector.name)
    idle()
  }

  return {
    state: selector,
    startSelectSheet,
    selectedSheet,
    editName,
    decided,
    idle,
  }
}
