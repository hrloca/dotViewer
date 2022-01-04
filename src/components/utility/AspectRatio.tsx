import React from 'react'
import { styled } from '@material-ui/system'

type AspectRatioProps = { ratio: [number, number] }

export const AspectRatio: React.FC<AspectRatioProps> = ({ children, ...props }) => {
  return (
    <Wrapper {...props}>
      <Content>{children}</Content>
    </Wrapper>
  )
}

const Wrapper = styled('div')<AspectRatioProps>(({ ratio }) => {
  const rate = (ratio[1] / ratio[0]) * 100
  return {
    position: 'relative',
    width: '100%',
    '&:before': {
      content: '""',
      display: 'block',
      paddingTop: `${rate}%`,
    },
  }
})

const Content = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
})
