import React, { forwardRef, useContext } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { useBalances } from 'ui/src/hooks/dapp/use-balances'
import { useNonFungibleIds } from 'ui/src/hooks/dapp/use-entity-nft'
import type { ResourceBalance, ResourceBalanceType } from 'ui/src/types/types'

import { Box } from '../../../box'
import { type IProps as WrapperProps } from '../../field-wrapper'
import { FieldContext } from '../../field-wrapper/context'
import { useFieldValue } from '../../use-field-value'
import SelectField from '../select-field'

const messages = defineMessages({
	collection: {
		id: 'nft.collection',
		defaultMessage: 'NFT Collection',
	},
	item: {
		id: 'nft.item',
		defaultMessage: 'NFT',
	},
})

interface IProps extends Omit<WrapperProps, 'name'> {
	fromAccount?: string
	resourceKey?: string
	itemKey?: string
}

export const NftSelect = forwardRef<HTMLButtonElement, IProps>((props, ref) => {
	const intl = useIntl()

	const { fromAccount, resourceKey = 'address', itemKey = 'id', ...rest } = props
	const { name: parentName } = useContext(FieldContext)

	const { data: balanceData, isLoading } = useBalances(fromAccount)
	const { nonFungibleBalances = [] } = balanceData || {}
	const resource = useFieldValue(`${parentName ? `${parentName}.` : ''}${resourceKey}`)

	const selectedToken = nonFungibleBalances.find(
		b => b.address === resource,
	) as ResourceBalance[ResourceBalanceType.NON_FUNGIBLE]

	const pages = useNonFungibleIds(fromAccount, selectedToken?.address, selectedToken?.vaults)
	const ids =
		pages
			?.filter(({ data }) => !!data)
			.map(({ data }) => data)
			?.flat()
			.map(id => ({ id, title: id })) || []

	return (
		<Box disabled={!fromAccount || isLoading}>
			<SelectField
				{...rest}
				ref={ref}
				name={resourceKey}
				placeholder={intl.formatMessage(messages.collection)}
				data={nonFungibleBalances.map(collection => ({ id: collection.address, title: collection.name }))}
			/>
			<SelectField {...rest} name={itemKey} placeholder={intl.formatMessage(messages.item)} data={ids} />
		</Box>
	)
})
