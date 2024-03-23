import clsx from 'clsx'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { useAccountCardSettings } from 'ui/src/hooks/use-account-card-settings'

import * as styles from './icon.css'

interface IProps {
	address: string
	className?: string
}

export const Icon: React.FC<IProps> = props => {
	const { address, className } = props

	const { cardColor } = useAccountCardSettings(address)

	return <Box className={clsx(styles.icon, className)} style={{ backgroundImage: `${cardColor}` }} />
}
