import React, { FC } from 'react'

interface SheetSelectorProps {
  onSelect: (path: string, name: string) => void
}

export const SheetSelector: FC<SheetSelectorProps> = ({ onSelect }) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()
    if (e.target.files && e.target.files[0]) {
      const t = e.target.files[0]
      reader.readAsDataURL(t)
      reader.addEventListener('load', (loadE) => {
        if (typeof loadE.target?.result !== 'string') throw new Error()
        onSelect(loadE.target?.result, t.name)
      })
    }
  }

  return <input hidden onChange={onChange} type="file" accept="image/png" />
}
