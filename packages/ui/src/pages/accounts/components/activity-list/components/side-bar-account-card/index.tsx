import clsx from 'clsx'
import React from 'react'
import { useParams } from 'react-router-dom'

import { AccountCard } from 'ui/src/components/account-cards'
import { Box } from 'ui/src/components/box'
import { useIsAllAccounts } from 'ui/src/hooks/use-is-all-accounts'

import * as styles from './styles.css'

export const SideBarAccountCard: React.FC = () => {
	const isAllAccounts = useIsAllAccounts()
	const { accountId = '-' } = useParams()

	if (accountId === '-') return null

	return (
		<Box className={clsx(styles.mobileCardWrapper, isAllAccounts && styles.mobileHiddenWrapper)}>
			<Box className={styles.mobileCardTransparentWrapper}>
				<AccountCard address={accountId} showCopyAddressButton={false} />
			</Box>
		</Box>
	)
}
