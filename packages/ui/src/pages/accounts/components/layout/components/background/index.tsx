import React from 'react'
import { useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { useAccountCardSettings } from 'ui/src/hooks/use-account-card-settings'

import * as styles from './styles.css'

interface IProps {
	view: 'mobile' | 'sidebar'
}
export const CardBackground: React.FC<IProps> = ({ view }) => {
	const { accountId = '-', resourceId } = useParams()
	const { cardColor } = useAccountCardSettings(accountId)

	return (
		<Box
			className={styles.accountsBgCardWrapper}
			display={view === 'mobile' ? ['block', 'none'] : ['none', 'block']}
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
