import { t } from 'i18next'
import { useBalances } from 'packages/ui/src/hooks/dapp/use-balances'
import React, { forwardRef } from 'react'

import { capitalizeFirstLetter } from 'ui/src/utils/capitalize-first-letter'

import { Box } from '../../../box'
import { type IProps as WrapperProps } from '../../field-wrapper'
import SelectField from '../select-field'

interface IProps extends WrapperProps {
	fromAccount?: string
}

export const NftCollectionSelect = forwardRef<HTMLButtonElement, IProps>((props, ref) => {
	const { fromAccount, ...rest } = props
	const { nonFungibleBalances = [], isLoading } = useBalances(fromAccount)

	return (
		<Box disabled={!fromAccount || isLoading}>
			<SelectField
				{...rest}
				ref={ref}
				placeholder={capitalizeFirstLetter(`${t('nft_select.collection')}`)}
				data={nonFungibleBalances.map(collection => ({ id: collection.address, title: collection.name }))}
			/>
		</Box>
	)
})
