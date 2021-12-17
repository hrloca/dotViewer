import React, { useEffect, useState } from 'react'
import { styled } from '@material-ui/system'
import { map, DotTarget } from '../../hooks/useDotSheet'
import { useAnimator } from '../../hooks/useAnimator'
import { DotDrawer } from '../DotDrawer'
import { Slider } from '../Slider'

import { animations } from '../../dots/animations'
import { Controller } from './Controller'
import { AspectRatio } from '../AspectRatio'
import { countup, countdown } from '../../libs'

import Drawer from '@material-ui/core/SwipeableDrawer'
import Close from '@material-ui/icons/Close'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemButton from '@material-ui/core/ListItemButton'
import Divider from '@material-ui/core/Divider'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'

type DotAnimatorProps = {
  src: string
  size: number
}

export const DotAnimator: React.FC<DotAnimatorProps> = ({ src, size }) => {
  const [anim, setAnim] = useState<number>(0)
  const [target, setTarget] = useState<number | undefined>(1)
  const [viewController, setViewController] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState(false)

  const { action, state, meta } = useAnimator(animations[anim], {
    onUpdate({ msec, values, meta }) {
      const [dotTargetNumber] = values
      action.seek(msec)
      setTarget(dotTargetNumber)
      if (msec === 0) {
        setTarget(meta.pause)
      }
    },
    onLoad({ pause }) {
      action.seek(0)
      setTarget(pause)
    },
  })

  useEffect(() => {
    action.seek(0)
  }, [src])

  const next = () => {
    setAnim(countup(animations.length - 1)(anim))
  }

  const prev = () => {
    if (state.time < 200) {
      setAnim(countdown(animations.length - 1)(anim))
    } else {
      action.seek(0)
    }
  }

  if (!meta || target === undefined) return null

  const reverse = target < 0
  const extract = (t: number) => map[Math.abs(t) as DotTarget]
  const [y, x] = extract(target)
  const step = meta.totalTime / meta.frames
  const slow = () => {
    if (state.speed === 1) {
      action.speed(0.5)
    } else if (state.speed === 0.5) {
      action.speed(0.2)
    } else {
      action.speed(1)
    }
  }

  return (
    <Wrapper
      onMouseOver={() => setViewController(true)}
      onMouseOut={() => setViewController(false)}
    >
      <TitleView show={true}>
        <div>{meta.name}</div>
      </TitleView>
      <AspectRatio ratio={[3, 2]}>
        <Display
          onClick={() => {
            if (state.isPlaying) {
              action.stop()
            } else {
              action.play()
            }
          }}
        >
          <DotDrawer reverse={reverse} x={x} y={y} src={src} size={size} />
        </Display>
      </AspectRatio>

      <ControllerView show={true}>
        <SliderWrapper show={viewController}>
          <Slider
            onChange={(_, v) => {
              if (typeof v === 'number') {
                action.stop()
                action.seek(v)
              }
            }}
            defaultValue={0}
            step={step}
            value={state.time}
            min={0}
            max={meta.totalTime}
          />
        </SliderWrapper>

        <Controller
          isPlaying={state.isPlaying}
          isRepeat={state.isRepeat}
          speed={state.speed}
          onStop={() => action.stop()}
          onPlay={() => action.play()}
          onSlow={() => slow()}
          onList={() => {
            setOpenModal(true)
          }}
          onPrev={prev}
          onNext={next}
          onRepeat={() => action.repeat(!state.isRepeat)}
        />
      </ControllerView>

      <Drawer
        anchor="bottom"
        open={openModal}
        onClose={() => setOpenModal(false)}
        onOpen={() => console.log('onopen')}
      >
        <Grid container direction="column">
          <Grid item ml="auto">
            <IconButton onClick={() => setOpenModal(false)}>
              <Close />
            </IconButton>
          </Grid>
        </Grid>

        <List subheader={<ListSubheader>Animations</ListSubheader>}>
          {animations.map((item, index) => {
            const [y, x] = extract(item.pause || 0)
            return (
              <React.Fragment key={`${index}-${item.id}`}>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      setAnim(index)
                    }}
                  >
                    <ListItemAvatar>
                      <DotDrawer size={32} src={src} reverse={false} y={y} x={x} />
                    </ListItemAvatar>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </React.Fragment>
            )
          })}
        </List>
      </Drawer>
    </Wrapper>
  )
}

const Display = styled('div')({
  position: 'relative',
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  alignContent: 'center',
  background: '#fff',
})

const Wrapper = styled('div')({
  position: 'relative',
})

const SliderWrapper = styled('div')<{ show: boolean }>(({ show }) => {
  return {
    paddingLeft: 16,
    paddingRight: 16,
    transition: 'all .3s ease',
    opacity: show ? 1 : 0.2,
  }
})

const ControllerView = styled('div')<{ show: boolean }>(({ show }) => {
  return {
    paddingTop: 8,
    paddingBottom: 8,
    transition: 'all .3s ease',
    opacity: show ? 1 : 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.03)',
  }
})

const TitleView = styled('div')<{ show: boolean }>(({ show }) => {
  return {
    padding: 8,
    transition: 'all .3s ease',
    opacity: show ? 1 : 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.03)',
  }
})
