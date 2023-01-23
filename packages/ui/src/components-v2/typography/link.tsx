import { sprinkles } from '@/components/system/sprinkles.css'
import classnames from 'classnames'
import Link, { LinkProps } from 'next/link'
import { ReactNode } from 'react'
import * as styles from './Link.css'
import { TextProps, TextStyles } from './Text'

interface Props extends LinkProps {
  baseline?: boolean;
  size?: 'standard' | 'small' | 'xsmall';
  underline?: 'always' | 'hover' | 'never';
  variant?: 'link' | 'button';
  weight?: TextProps['weight'];
  color?: TextProps['color'];
  type?: TextProps['type'];
  inline?: boolean;
  highlightOnFocus?: boolean;
  className?: string
  children?: ReactNode
}
const LinkComponent = (props: Props) => {
  const {
    href,
    baseline = false,
    size = 'standard',
    color = 'link',
    weight = 'regular',
    underline = 'hover',
    type = 'body',
    highlightOnFocus = true,
    inline = false,
    className,
    children,
    ...restProps
  } = props

  const classNames = classnames(
    inline ? undefined : sprinkles({ display: 'block' }),
    underline === 'hover' ? styles.underlineOnHover : undefined,
    underline === 'never' ? styles.underlineNever : undefined,
    highlightOnFocus ? styles.highlightOnHover : undefined,
    TextStyles({ size, type, color, weight, baseline }),
    className
  )

  return (
    <Link href={href} {...restProps} className={classNames} >
      {children}
    </Link>
  )
}

export default LinkComponent
