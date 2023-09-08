import { AccountCard } from 'packages/ui/src/components/account-cards'
import React from 'react'
import { useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { CardButtons } from 'ui/src/components/card-buttons'

import * as styles from './styles.css'

export const Card: React.FC = () => {
	const { accountId } = useParams()
	if (!accountId || accountId === '-') {
		return null
	}

	return (
		<Box className={styles.accountCardWrapper}>
			<Box className={styles.accountCardInnerWrapper}>
				<Box className={styles.accountHeightFlexWrapper}>
					<AccountCard address={accountId} showCopyAddressButton={false} />
				</Box>
				<Box className={styles.accountCardButtonWrapper}>
					<CardButtons />
				</Box>
			</Box>
		</Box>
	)
}
