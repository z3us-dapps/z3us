import clsx from 'clsx'
import React from 'react'
import { useParams } from 'react-router-dom'

import { AccountCard } from 'ui/src/components/account-cards'
import { Box } from 'ui/src/components/box'
import { useWalletAccounts } from 'ui/src/hooks/use-accounts'
import { useIsAllAccounts } from 'ui/src/hooks/use-is-all-accounts'

import * as styles from './styles.css'

export const SideBarAccountCard: React.FC = () => {
	const isAllAccounts = useIsAllAccounts()
	const accounts = useWalletAccounts()
	const { accountId } = useParams()
	const accountAddress = accounts?.[accountId]?.address

	return (
		<Box className={clsx(styles.mobileCardWrapper, isAllAccounts && styles.mobileHiddenWrapper)}>
			<Box className={styles.mobileCardTransparentWrapper}>
				<AccountCard address={accountAddress} showCopyAddressButton={false} />
			</Box>
		</Box>
	)
}
