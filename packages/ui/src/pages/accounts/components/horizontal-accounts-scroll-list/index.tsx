import clsx from 'clsx'
import React from 'react'
import { useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import {
	ScrollAreaRoot,
	ScrollAreaScrollbar,
	ScrollAreaThumb,
	ScrollAreaViewport,
} from 'ui/src/components/scroll-area-radix'
import { useWalletAccounts } from 'ui/src/hooks/use-wallet-account'

import { AccountHomeCard } from '../account-home-card'
import * as styles from './styles.css'

interface IProps {
	horizontalScrollWidth: number
}

export const HorizontalAccountsScrollList: React.FC<IProps> = props => {
	const { horizontalScrollWidth } = props
	const { accountId = '-' } = useParams()
	const isAllAccounts = accountId === '-'
	console.log('🚀 ~ file: index.tsx:23 ~ accountId:', accountId)

	const accounts = useWalletAccounts()

	return (
		<Box className={styles.accountsHorizontalWrapper}>
			<Box className={styles.accountsHorizontalAbsoluteWrapper}>
				<ScrollAreaRoot style={{ maxWidth: `${horizontalScrollWidth}px`, width: '100%' }}>
					<ScrollAreaViewport>
						<Box className={styles.accountsHorizontalCardsWrapper}>
							{Object.values(accounts).map(({ address, name }) => (
								<AccountHomeCard
									key={address}
									name={name}
									address={address}
									className={clsx(!isAllAccounts && address !== accountId && styles.accountCardOpacity)}
								/>
							))}
						</Box>
					</ScrollAreaViewport>
					<ScrollAreaScrollbar orientation="horizontal">
						<ScrollAreaThumb />
					</ScrollAreaScrollbar>
				</ScrollAreaRoot>
			</Box>
		</Box>
	)
}

export default HorizontalAccountsScrollList
