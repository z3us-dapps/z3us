import React, { useState } from 'react'

import { Box } from 'ui/src/components/box'
import { useWalletAccounts } from 'ui/src/hooks/use-wallet-account'

import AccountRow from './row'
import * as rowStyles from './styles.css'

export const AccountsList: React.FC = () => {
	const [hoveredLink, setHoveredLink] = useState<string | null>(null)
	const accounts = useWalletAccounts()

	return (
		<Box component="ul" className={rowStyles.assetsList}>
			{Object.values(accounts).map(account => (
				<AccountRow
					key={account.address}
					account={account}
					isHovered={account.address === hoveredLink}
					onSelect={setHoveredLink}
				/>
			))}
		</Box>
	)
}
