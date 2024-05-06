import React from 'react'
import { useParams } from 'react-router-dom'

import { AccountCard } from 'ui/src/components/account-cards'
import { Box } from 'ui/src/components/box'

import { CardBackground } from '../../../layout/components/background'
import * as styles from './styles.css'

export const SideBarAccountCard: React.FC = () => {
	const { accountId = '-' } = useParams()

	if (accountId === '-') return null

	return (
		<Box className={styles.mobileCardWrapper}>
			<CardBackground view="sidebar" />
			<Box className={styles.mobileCardTransparentWrapper}>
				<AccountCard address={accountId} showCopyAddressButton={false} />
			</Box>
		</Box>
	)
}
