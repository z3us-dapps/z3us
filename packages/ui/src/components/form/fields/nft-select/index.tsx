import React, { forwardRef, useContext, useEffect, useMemo } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { ToolTip } from 'ui/src/components/tool-tip'
import { useBalances } from 'ui/src/hooks/dapp/use-balances'
import { useNonFungibleIds } from 'ui/src/hooks/dapp/use-entity-nft'

import { Box } from '../../../box'
import { type IProps as WrapperProps } from '../../field-wrapper'
import { FieldContext } from '../../field-wrapper/context'
import { useFieldValue } from '../../use-field-value'
import SelectField from '../select-field'
import * as styles from './styles.css'

const messages = defineMessages({
	collection: {
		id: 'IOSCB1',
		defaultMessage: 'NFT Collection',
	},
	item: {
		id: 'W2OoOl',
		defaultMessage: 'NFT',
	},
	nonFungiblesCollectionToolTip: {
		defaultMessage: "You don't have any NFT collections",
		id: 'CV+lHE',
	},
	nonFungiblesToolTip: {
		defaultMessage: "You don't have any NFT's",
		id: 'aqiLsu',
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

	const { data: balanceData, isLoading } = useBalances([fromAccount])
	const { nonFungibleBalances = [] } = balanceData || {}
	const resource = useFieldValue(`${parentName ? `${parentName}.` : ''}${resourceKey}`)

	const {
		data: idsData,
		isFetching,
		hasNextPage,
		fetchNextPage,
	} = useNonFungibleIds(resource, [fromAccount], balanceData?.at ? new Date(balanceData.at) : undefined)

	const nonFungiblesCollection = useMemo(
		() => nonFungibleBalances.map(collection => ({ id: collection.address, title: collection.name })),
		[nonFungibleBalances],
	)
	const hasNonFungiblesCollection = nonFungiblesCollection?.length > 0

	const nonFungibles = useMemo(
		() =>
			idsData?.pages.reduce(
				(container, page) => [...container, ...page.items.map(nftId => ({ id: nftId, title: nftId }))],
				[],
			) || [],
		[idsData],
	)
	const hasNonFungibles = nonFungibles?.length > 0

	useEffect(() => {
		if (isFetching) return
		if (hasNextPage) {
			fetchNextPage()
		}
	}, [isFetching, fetchNextPage, hasNextPage])

	return (
		<Box disabled={!fromAccount || isLoading || isFetching} className={styles.nftSelectWrapper}>
			<ToolTip
				message={intl.formatMessage(messages.nonFungiblesCollectionToolTip)}
				disabled={hasNonFungiblesCollection}
			>
				<span>
					<SelectField
						{...rest}
						ref={ref}
						name={resourceKey}
						placeholder={intl.formatMessage(messages.collection)}
						data={nonFungiblesCollection}
						disabled={!hasNonFungiblesCollection}
						fullWidth
					/>
				</span>
			</ToolTip>
			<ToolTip message={intl.formatMessage(messages.nonFungiblesToolTip)} disabled={hasNonFungibles}>
				<span>
					<SelectField
						{...rest}
						name={itemKey}
						placeholder={intl.formatMessage(messages.item)}
						data={nonFungibles}
						disabled={!hasNonFungibles}
						fullWidth
					/>
				</span>
			</ToolTip>
		</Box>
	)
})
