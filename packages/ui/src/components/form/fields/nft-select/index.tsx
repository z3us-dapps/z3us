import React, { forwardRef, useContext, useEffect, useMemo } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { useBalances } from 'ui/src/hooks/dapp/use-balances'
import { useNonFungibleIds } from 'ui/src/hooks/dapp/use-entity-nft'

import { Box } from '../../../box'
import { type IProps as WrapperProps } from '../../field-wrapper'
import { FieldContext } from '../../field-wrapper/context'
import { useFieldValue } from '../../use-field-value'
import SelectField from '../select-field'

const messages = defineMessages({
	collection: {
		defaultMessage: 'NFT Collection',
	},
	item: {
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

	const { data: idsData, isFetching, hasNextPage, fetchNextPage } = useNonFungibleIds(resource, [fromAccount])

	useEffect(() => {
		if (isFetching) return
		if (hasNextPage) {
			fetchNextPage()
		}
	}, [isFetching, fetchNextPage, hasNextPage])

	const ids = useMemo(
		() => idsData?.pages.reduce((container, page) => [...container, ...page.items], []) || [],
		[idsData],
	)

	return (
		<Box disabled={!fromAccount || isLoading || isFetching}>
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
