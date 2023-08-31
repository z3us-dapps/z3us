import { AccountCard } from 'packages/ui/src/components/account-cards'
import { useGlobalResourceBalances } from 'packages/ui/src/hooks/dapp/use-balances'
import { useNoneSharedStore } from 'packages/ui/src/hooks/use-store'
import React from 'react'

import Loader from 'ui/src/components/loader'
import { Link } from 'ui/src/components/router-link'
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

interface IProps {
	address: string
	name: string
}

export const AccountHomeCard: React.FC<IProps> = props => {
	const { address, name } = props

	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))

	const { isLoading, totalValue } = useGlobalResourceBalances(address)

	if (isLoading) return <Loader />

	return (
		<Link to={`/accounts/${address}`} className={styles.accountsHomeHorizontalCard} key={address} underline="never">
			<AccountCard
				id={address}
				backgroundImage={accountCards[0].backgroundImage}
				accountName={name}
				accountBalance={formatBigNumber(totalValue, currency, 2)}
				accountAddress={address}
			/>
		</Link>
	)
}
