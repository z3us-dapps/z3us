import { Box } from '@/components/Box'
import { sprinkles, Sprinkles } from '@/components/system/sprinkles.css'
import classnames from 'classnames'
import { ElementType, ReactNode } from 'react'
import * as styles from './typography.css'

export type HeadingLevel = keyof typeof styles.heading

const getHeadingComponent = (level: HeadingLevel) => {
  if (level === '1') {
    return 'h1'
  }
  if (level === '2') {
    return 'h2'
  }
  if (level === '3') {
    return 'h3'
  }
  if (level === '4') {
    return 'h4'
  }

  throw new Error('No valid heading level')
}

export interface HeadingProps {
  children: ReactNode
  level: HeadingLevel
  align?: Sprinkles['textAlign']
  branded?: boolean
  component?: ElementType
}

export const useHeadingStyles = (
  level: HeadingLevel,
  branded?: boolean,
  align?: Sprinkles['textAlign']
) =>
  classnames(
    branded ? styles.font.brand : styles.font.heading,
    sprinkles({
      textAlign: align,
      color: { lightMode: 'gray900', darkMode: 'gray100' },
    }),
    styles.heading[level].trimmed,
  )

export const Heading = ({
  level,
  component,
  branded = false,
  align,
  children,
}: HeadingProps) => {
  return (
    <Box
      component={component || getHeadingComponent(level)}
      className={useHeadingStyles(level, branded, align)}
      style={{
        fontWeight: 900,
      }}
    >
      {children}
    </Box>
  )
}
