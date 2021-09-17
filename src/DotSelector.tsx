import React, { FC } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { SheetSelector } from './SheetSelector'
import { useSelectorState, Phase } from './stateSelector'

export type DotSelectorProps = {
  onSelect: (src: string, name: string) => void
}

export const DotSelector: FC<DotSelectorProps> = ({ onSelect }) => {
  const { state, selectedSheet, editName, decided, idle } = useSelectorState({
    onEdited: (src, name) => {
      onSelect(src, name)
    },
  })

  return (
    <>
      <Dialog open={state.phase === Phase.SheetSelecting} onClose={idle}>
        <DialogTitle>Save Dot File.</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ドッドサイズ 32*32 のシートを選択してください。
          </DialogContentText>
          <Button variant="contained" component="label">
            Select
            <SheetSelector onSelect={selectedSheet} />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={idle}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={state.phase === Phase.NameEditing} onClose={idle}>
        <DialogTitle>Dot Name.</DialogTitle>
        <DialogContent>
          <DialogContentText>ドット名を決めてください。</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={state.name}
            onChange={(e) => editName(e.target.value)}
            variant="standard"
          />
          <DialogActions>
            <Button onClick={idle}>Cancel</Button>
            <Button variant="contained" disabled={!state.name.length} onClick={decided}>
              OK
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  )
}
