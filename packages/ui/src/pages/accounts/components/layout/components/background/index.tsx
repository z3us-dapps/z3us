import clsx from 'clsx'
import type { CSSProperties } from 'react'
import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { Image } from 'ui/src/components/account-cards/image'
import { Box } from 'ui/src/components/box'
import { useAccountCardSettings } from 'ui/src/hooks/use-account-card-settings'

import * as styles from './styles.css'

const imgStyles: CSSProperties = {
	objectFit: 'cover',
	opacity: 0.5,
	height: 'unset',
}

interface IProps {
	view: 'mobile' | 'sidebar'
}

export const CardBackground: React.FC<IProps> = ({ view }) => {
	const { accountId = '-', resourceId } = useParams()
	const { skin, cardColor, colorClassName } = useAccountCardSettings(accountId)

	const display = useMemo(() => (view === 'mobile' ? ['block', 'none'] : ['none', 'block']), [view])
	if (skin)
		return (
			<Box display={display}>
				<Image
					address={accountId}
					className={clsx(colorClassName, cardColor)}
					skin={{
						...skin,
						styles: imgStyles,
					}}
				/>
			</Box>
		)

	return (
		<Box
			className={styles.accountsBgCardWrapper}
			display={display}
			style={{
				...(accountId !== '-' && !resourceId
					? {
							backgroundSize: '170% auto',
							backgroundRepeat: 'no-repeat',
							backgroundImage: `${cardColor}`,
							opacity: '0.9',
					  }
					: {}),
			}}
		/>
	)
}
