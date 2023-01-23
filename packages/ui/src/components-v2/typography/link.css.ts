import { style } from '@vanilla-extract/css'
import { darkMode, sprinkles } from '@/components/system/sprinkles.css'
import { vars } from '@/styles/themes.css'

export const underlineOnHover = style({
  selectors: {
    ['&:not(:hover)']: {
      textDecoration: 'none',
    },
  },
})

export const underlineNever = style({
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'none',
  },
})

export const highlightOnHover = style([
  sprinkles({
    transition: 'slow',
  }),
  {
    ':hover': {
      color: vars.palette.stone100,
      transition: 'ease-in .2s',
    },
    selectors: {
      [`.${darkMode} &:hover`]: {
        color: vars.palette.stone900,
      },
    },
    ':focus': {
      outline: 'none',
      color: vars.palette.pink500,
    },
  },
])
