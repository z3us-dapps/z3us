import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'

import { ChevronRightIcon } from 'ui/src/components/icons'
import { Link } from 'ui/src/components/router-link'
import { Text } from 'ui/src/components/typography'
import { useWalletAccounts } from 'ui/src/hooks/use-accounts'
import { getShortAddress } from 'ui/src/utils/string-utils'

const messages = defineMessages({
	account: {
		id: 'dn8dg4',
		defaultMessage: `{hasName, select,
			true {{name}}
			other {{address}}
		}`,
	},
})

interface IProps {
	isLast?: boolean
}

export const AccountBreadcrumb: React.FC<IProps> = ({ isLast }) => {
	const intl = useIntl()
	const { accountId } = useParams()
	const accounts = useWalletAccounts()

	const displayName = intl.formatMessage(messages.account, {
		hasName: !!accounts[accountId]?.name,
		name: accounts[accountId]?.name,
		address: getShortAddress(accountId),
	})

	if (accountId === '-') return null

	return (
		<>
			<ChevronRightIcon />
			{isLast ? (
				<Text>{displayName}</Text>
			) : (
				<Link to={`/accounts/${accountId}`}>
					{accounts[accountId]?.name ||
						getShortAddress(accounts[accountId]?.address) ||
						intl.formatMessage(messages.account)}
				</Link>
			)}
		</>
	)
}
