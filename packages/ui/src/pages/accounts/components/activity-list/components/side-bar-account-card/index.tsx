import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { AccountCard, AccountCards } from 'ui/src/components/account-cards'
import { Box } from 'ui/src/components/box'
import { useWalletAccounts } from 'ui/src/hooks/use-accounts'

import * as styles from './styles.css'

export const SideBarAccountCard: React.FC = () => {
	const { accountId = '-' } = useParams()
	const walletAccounts = useWalletAccounts()

	const accounts = useMemo(() => Object.values(walletAccounts).reverse(), [walletAccounts])

	return (
		<Box className={styles.mobileCardWrapper}>
			<Box className={styles.mobileCardTransparentWrapper}>
				{accountId !== '-' ? (
					<AccountCard address={accountId} showCopyAddressButton={false} />
				) : (
					<AccountCards
						accounts={accounts}
						isAllAccount={accountId === '-'}
						enableClick
						showCopyAddressButton={false}
					/>
				)}
			</Box>
		</Box>
	)
}
