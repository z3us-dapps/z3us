import React from 'react'
import { useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { useAccountCardSettings } from 'ui/src/hooks/use-account-card-settings'

import * as styles from './styles.css'

export const MobileBackground: React.FC = () => {
	const { accountId = '-', resourceId } = useParams()
	const { cardColor } = useAccountCardSettings(accountId)

	return (
		<Box
			className={styles.accountsBgCardWrapper}
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
