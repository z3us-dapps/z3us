import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useLocation, useNavigate } from 'react-router-dom'

import { SearchButtonInput } from 'ui/src/components/search-button-input'

import * as styles from './styles.css'

const messages = defineMessages({
	searchToolTip: {
		defaultMessage: 'Search for a transaction ID, or an address for an account, or a resource',
		id: 'MYKtWJ',
	},
	search: {
		defaultMessage: 'Search for a transaction ID, or an address for an account, or a resource',
		id: 'MYKtWJ',
	},
})

export const SearchResource: React.FC = () => {
	const intl = useIntl()
	const location = useLocation()
	const navigate = useNavigate()

	const handleSearch = (value: string) => {
		const [, params] = location.search.split('?')
		const query = new URLSearchParams(params)
		if (value.startsWith('account_')) {
			navigate(`/accounts/${value}`)
		} else if (value.startsWith('txid_')) {
			query.delete('query')
			query.set('tx', `${value}`)
			navigate(`${location.pathname}?${query}`)
		} else {
			query.delete('tx')
			query.set('query', `${value}`)
			navigate(`${location.pathname}?${query}`)
		}
	}

	return (
		<SearchButtonInput
			className={styles.searchWrapper}
			searchBtnToolTipMsg={intl.formatMessage(messages.searchToolTip)}
			inputPlaceholder={intl.formatMessage(messages.search)}
			onCommitSearch={handleSearch}
		/>
	)
}
