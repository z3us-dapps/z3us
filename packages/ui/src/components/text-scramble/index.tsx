import { clsx } from 'clsx'
import React from 'react'

import Text, { type TextProps } from 'ui/src/components/typography/text'
import { useScrambleText } from 'ui/src/hooks/use-scramble-text'

import * as styles from './text-scramble.css'

interface IProps {
	children: React.ReactElement<TextProps>
	scramble: boolean
}

export const TextScramble: React.FC<IProps> = ({ children, scramble }) => {
	const { children: textChildren, className, ...rest } = children.props

	const scrambleText = useScrambleText(`${textChildren}`, scramble)

	return (
		<Text {...rest} blur={scramble} className={clsx(className, styles.textScrambleWrapper)}>
			{scrambleText}
		</Text>
	)
}
