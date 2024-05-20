import React, { useContext, useMemo } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { FieldContext } from 'ui/src/components/form/field-wrapper/context'
import { NftSelect } from 'ui/src/components/form/fields/nft-select'
import { TokenAmountSelect } from 'ui/src/components/form/fields/token-amount-field'
import { useFieldValue } from 'ui/src/components/form/use-field-value'
import { Tabs, TabsContent } from 'ui/src/components/tabs'
import { useBalances } from 'ui/src/hooks/dapp/use-balances'
import { capitalizeFirstLetter } from 'ui/src/utils/string'

import * as styles from './styles.css'

export const TOKENS = 'tokens'
export const NFTS = 'nfts'

const messages = defineMessages({
	tab_tokens: {
		id: 'P6EE/a',
		defaultMessage: 'Tokens',
	},
	tab_nfts: {
		id: 'nqRscq',
		defaultMessage: 'NFTs',
	},
})

interface IProps {
	from: string
}

export const ResourceFieldsTabs: React.FC<IProps> = ({ from }) => {
	const intl = useIntl()
	const { name: parentName } = useContext(FieldContext)
	const { id } = useFieldValue(`${parentName}`) || {}

	const {
		data: { fungibleBalances = [] },
	} = useBalances([from])

	const resourceAddresses = useMemo(() => fungibleBalances.map(b => b.address), [fungibleBalances])

	return (
		<Box className={styles.transferActionToAssetWrapper}>
			<Tabs
				list={[
					{ label: capitalizeFirstLetter(intl.formatMessage(messages.tab_tokens)), value: TOKENS },
					{ label: capitalizeFirstLetter(intl.formatMessage(messages.tab_nfts)), value: NFTS },
				]}
				defaultValue={id ? NFTS : TOKENS}
				className={styles.transferActionTabsWrapper}
			>
				<TabsContent value={TOKENS} className={styles.transferActionTabsContentWrapper}>
					<TokenAmountSelect balances={fungibleBalances} resourceAddresses={resourceAddresses} />
				</TabsContent>
				<TabsContent value={NFTS} className={styles.transferActionTabsContentWrapper}>
					<NftSelect fromAccount={from} />
				</TabsContent>
			</Tabs>
		</Box>
	)
}
