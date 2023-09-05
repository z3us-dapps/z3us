import { t } from 'i18next'
import { useBalances } from 'packages/ui/src/hooks/dapp/use-balances'
import { useEntityNonFungibleIds } from 'packages/ui/src/hooks/dapp/use-entity-nft'
import type { ResourceBalance, ResourceBalanceType } from 'packages/ui/src/types/types'
import React, { forwardRef, useContext } from 'react'

import { capitalizeFirstLetter } from 'ui/src/utils/capitalize-first-letter'

import { Box } from '../../../box'
import { type IProps as WrapperProps } from '../../field-wrapper'
import { FieldContext } from '../../field-wrapper/context'
import { useFieldValue } from '../../use-field-value'
import SelectField from '../select-field'

interface IProps extends Omit<WrapperProps, 'name'> {
	fromAccount?: string
	resourceKey?: string
	itemKey?: string
}

export const NftSelect = forwardRef<HTMLButtonElement, IProps>((props, ref) => {
	const { fromAccount, resourceKey = 'address', itemKey = 'id', ...rest } = props
	const { name: parentName } = useContext(FieldContext)

	const { nonFungibleBalances = [], isLoading } = useBalances(fromAccount)
	const resource = useFieldValue(`${parentName ? `${parentName}.` : ''}${resourceKey}`)

	const selectedToken = nonFungibleBalances.find(
		b => b.address === resource,
	) as ResourceBalance[ResourceBalanceType.NON_FUNGIBLE]

	const pages = useEntityNonFungibleIds(fromAccount, selectedToken?.address, selectedToken?.vaults)
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
				placeholder={capitalizeFirstLetter(`${t('nft_select.collection')}`)}
				data={nonFungibleBalances.map(collection => ({ id: collection.address, title: collection.name }))}
			/>
			<SelectField {...rest} name={itemKey} placeholder={capitalizeFirstLetter(`${t('nft_select.item')}`)} data={ids} />
		</Box>
	)
})
