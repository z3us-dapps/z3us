import React from 'react'

import { AccountCard } from 'ui/src/components/account-cards'
import { Link } from 'ui/src/components/router-link'

import * as styles from './styles.css'

interface IProps {
	address: string
	className: string
}

export const AccountHomeCard: React.FC<IProps> = props => {
	const { address, className } = props

	return (
		<Link to={`/accounts/${address}`} className={styles.accountsHomeHorizontalCard} key={address} underline="never">
			<AccountCard address={address} showCopyAddressButton={false} className={className} />
		</Link>
	)
}
