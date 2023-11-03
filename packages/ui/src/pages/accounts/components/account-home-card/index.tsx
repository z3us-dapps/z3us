import React from 'react'

import { AccountCard } from 'ui/src/components/account-cards'
import { Box } from 'ui/src/components/box'

import * as styles from './styles.css'

interface IProps {
	address: string
	className: string
}

export const AccountHomeCard: React.FC<IProps> = props => {
	const { address, className } = props

	return (
		<Box className={styles.accountsHomeHorizontalCard}>
			<AccountCard address={address} showCopyAddressButton className={className} enableClick />
		</Box>
	)
}
