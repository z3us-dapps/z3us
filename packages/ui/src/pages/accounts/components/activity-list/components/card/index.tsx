/* eslint-disable  @typescript-eslint/no-unused-vars */
import { AccountCard, AccountCards } from 'packages/ui/src/components/account-cards'
import { useGlobalResourceBalances } from 'packages/ui/src/hooks/dapp/use-balances'
import { useNoneSharedStore } from 'packages/ui/src/hooks/use-store'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { CardButtons } from 'ui/src/components/card-buttons'
import { ArrowLeftIcon, ArrowRightIcon, Close2Icon } from 'ui/src/components/icons'
import { useWalletAccounts } from 'ui/src/hooks/use-wallet-account'
import { formatBigNumber } from 'ui/src/utils/formatters'

import * as styles from './styles.css'

const CARD_COLORS = [
	'radial-gradient(77.21% 96.45% at 50% 100%, #FE845E 0%, #E08BAB 17.71%, #AB8CFF 50.52%, #946DFF 100%)',
	'radial-gradient(77.21% 96.45% at 50% 100%, #C0D7EF 0%, #C0D7EF 17.71%, #C0D7EF 50.52%, #C0D7EF 100%)',
	'radial-gradient(77.21% 96.45% at 50% 100%, #BF9E76 0%, #BF9E76 17.71%, #BF9E76 50.52%, #BF9E76 100%)',
]

const CARD_IMAGES = ['z3us-apple-hermes.png', 'z3us-athens.png', 'z3us-apple-hermes-v2.png']

const accountCards = [
	{
		accountId: 'rdx1b7073886',
		accountAddress: 'rdx1b7073886',
		accountName: 'Spend',
		accountBalance: '$1043.43',
		backgroundImage: `url(/images/account-images/${CARD_IMAGES[0]}), ${CARD_COLORS[0]}`,
	},
	{
		accountId: 'rdx8374837243886',
		accountAddress: 'rdx8374837243886',
		accountName: 'Spend',
		accountBalance: '$1043.43',
		backgroundImage: `url(/images/account-images/${CARD_IMAGES[1]}), ${CARD_COLORS[1]}`,
	},
	{
		accountId: 'rdx1b70747843847',
		accountAddress: 'rdx1b70747843847',
		accountName: 'Spend',
		accountBalance: '$1043.43',
		backgroundImage: `url(/images/account-images/${CARD_IMAGES[2]}), ${CARD_COLORS[2]}`,
	},
]

export const Card: React.FC = () => {
	const { accountId, resourceId } = useParams()

	const accounts = useWalletAccounts()
	const { address, name } = accounts[accountId] || {}

	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))

	const { isLoading, totalValue } = useGlobalResourceBalances(address)

	if (!accountId || accountId?.length < 1) {
		return null
	}

	return (
		<Box className={styles.accountCardWrapper}>
			<Box className={styles.accountCardInnerWrapper}>
				<Box className={styles.accountHeightFlexWrapper}>
					<AccountCard
						id={address}
						backgroundImage={accountCards[0].backgroundImage}
						accountName={name}
						accountBalance={formatBigNumber(totalValue, currency, 2)}
						accountAddress={address}
						showCopyAddressButton={false}
					/>
				</Box>
				<Box className={styles.accountCardButtonWrapper}>
					<CardButtons />
				</Box>
			</Box>
		</Box>
	)
}
