import React from 'react'
import { useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { CARD_COLORS, CARD_IMAGES } from 'ui/src/constants/account'
import { useWalletAccounts } from 'ui/src/hooks/use-accounts'
import { useIsAllAccounts } from 'ui/src/hooks/use-is-all-accounts'

import * as styles from './styles.css'

export const MobileBackground: React.FC = () => {
	const isAllAccounts = useIsAllAccounts()
	const accounts = useWalletAccounts()

	const { accountId, resourceId } = useParams()

	const accountsArray = Object.values(accounts)
	const idx = accountsArray.findIndex(account => account.address === accountId) || 0

	const cardImage = Object.keys(CARD_IMAGES)[idx % Object.keys(CARD_IMAGES).length]
	const cardColor = Object.keys(CARD_COLORS)[idx % Object.keys(CARD_COLORS).length]

	return (
		<Box
			className={styles.accountsBgCardWrapper}
			style={{
				...(!isAllAccounts && !resourceId
					? {
							backgroundSize: '170% auto',
							backgroundRepeat: 'no-repeat',
							backgroundImage: `url(/images/account-images/${cardImage}), ${cardColor}`,
							opacity: '0.9',
					  }
					: {}),
			}}
		/>
	)
}
