import React from 'react'
import { useParams } from 'react-router-dom'

import { AccountCard } from 'ui/src/components/account-cards'
import { Box } from 'ui/src/components/box'
import { useIsAllAccounts } from 'ui/src/hooks/use-is-all-accounts'

import * as styles from './styles.css'

export const SideBarAccountCard: React.FC = () => {
	const { accountId = '-' } = useParams()

	const isAllAccounts = useIsAllAccounts()

	if (accountId === '-') return null

	return (
		<Box className={styles.mobileCardWrapper}>
			<Box className={styles.mobileCardTransparentWrapper}>
				<AccountCard address={accountId} showCopyAddressButton={false} isTransparent={!isAllAccounts} />
			</Box>
		</Box>
	)
}
