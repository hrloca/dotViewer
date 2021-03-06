import React, { FC, useState } from 'react'
import { useRecoilState } from 'recoil'
import { DotDrawer } from './DotDrawer'
import { dots } from './../state'

import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemButton from '@material-ui/core/ListItemButton'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import ListSubheader from '@material-ui/core/ListSubheader'

export type DotListProps = {
  onSelect: (index: number) => void
  onDelete: (index: number) => void
}

export const DotList: FC<DotListProps> = ({ onSelect, onDelete }) => {
  // TODO: separate list and delete fn.
  const [dotsList] = useRecoilState(dots)
  const [deleteDotIndex, setDeleteIndex] = useState<number | null>(null)
  const is = deleteDotIndex !== null

  return (
    <>
      <List subheader={<ListSubheader>Dot Items</ListSubheader>}>
        {dotsList.map((item, index) => (
          <React.Fragment key={`${index}-${item.name}`}>
            <ListItem
              style={{
                backgroundColor: '#fff',
              }}
              disablePadding
              secondaryAction={
                item.edit ? (
                  <IconButton
                    onClick={() => setDeleteIndex(index)}
                    edge="end"
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                ) : null
              }
            >
              <ListItemButton
                onClick={() => {
                  onSelect(index)
                }}
              >
                <ListItemAvatar>
                  <DotDrawer size={64} src={item.src} reverse={false} y={0} x={4} />
                </ListItemAvatar>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>

      <Dialog open={is} onClose={() => setDeleteIndex(null)}>
        <DialogTitle>Delete Dot.</DialogTitle>
        <DialogContent>
          <DialogContentText>?????????????????????????????????</DialogContentText>
          <DialogActions>
            <Button onClick={() => setDeleteIndex(null)}>Cancel</Button>
            <Button
              disabled={!is}
              variant="contained"
              onClick={() => {
                if (is) {
                  onDelete(deleteDotIndex)
                  setDeleteIndex(null)
                }
              }}
            >
              OK
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  )
}
