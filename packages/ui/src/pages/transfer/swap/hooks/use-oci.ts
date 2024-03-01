import type { StateEntityDetailsResponseFungibleResourceDetails } from '@radixdlt/babylon-gateway-api-sdk'
import { useContext, useEffect } from 'react'

import { FormContext } from 'ui/src/components/form/context'
import { FieldContext } from 'ui/src/components/form/field-wrapper/context'
import { DAPP_ADDRESS } from 'ui/src/constants/dapp'
import { DEX_OCI, FEE_RATIO } from 'ui/src/constants/swap'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'
import { useSwapPreview } from 'ui/src/hooks/queries/oci'
import { generateId } from 'ui/src/utils/generate-id'

export const useOci = (
	dex: string,
	account: string,
	from: string,
	to: string,
	side: 'send' | 'receive',
	amount: number,
) => {
	const { onFieldChange } = useContext(FormContext)
	const { name: parentName } = useContext(FieldContext)
	const { data: feeResource } = useEntityDetails(to)
	const { data: preview, error, isFetching } = useSwapPreview(from, to, side, amount)

	useEffect(() => {
		if (dex !== DEX_OCI) return
		if (!feeResource) return
		if (!preview) return
		const s = preview.input_address === from ? 'send' : 'receive'
		const fromKey = s === 'send' ? 'input' : 'output'
		const toKey = s === 'send' ? 'output' : 'input'
		if (s === 'send') {
			onFieldChange(
				`${parentName}${parentName ? '.' : ''}to[0].amount`,
				(Number.parseFloat(preview[`${toKey}_amount`].token) * (1 - FEE_RATIO)).toString(),
			)
		} else {
			onFieldChange(`${parentName}${parentName ? '.' : ''}from[0].amount`, preview[`${fromKey}_amount`].token)
		}

		const { divisibility } = feeResource.details as StateEntityDetailsResponseFungibleResourceDetails
		const bucketId = generateId()
		const transactionManifest = preview.swaps.reduce(
			(manifest, swap) => `
		${manifest}
			CALL_METHOD
				Address("${account}")
				"withdraw"
				Address("${swap[`${fromKey}_address`]}")
				Decimal("${swap[`${fromKey}_amount`].token}")
			;
			TAKE_ALL_FROM_WORKTOP
				Address("${swap[`${fromKey}_address`]}")
				Bucket("bucket${bucketId}")
			;
			CALL_METHOD
				Address("${swap.pool_address}")
				"swap"
				Bucket("bucket${bucketId}")
			;
			TAKE_FROM_WORKTOP
				Address("${swap[`${toKey}_address`]}")
				Decimal("${(Number.parseFloat(swap[`${toKey}_amount`].token) * FEE_RATIO).toFixed(divisibility)}")
				Bucket("fee_bucket${bucketId}")
			;
			CALL_METHOD
				Address("${DAPP_ADDRESS}")
				"try_deposit_or_abort"
				Bucket("fee_bucket${bucketId}")
				Enum<0u8>()
			;
			CALL_METHOD
				Address("${account}")
				"deposit_batch"
				Expression("ENTIRE_WORKTOP")
			;
		`,
			'',
		)

		onFieldChange(`${parentName}${parentName ? '.' : ''}manifest`, transactionManifest)
	}, [dex, account, from, preview, feeResource])

	return {
		error,
		isFetching,
		allowsReceive: true,
		priceImpact: preview ? Number.parseFloat(preview.price_impact) : undefined,
		swapFee: preview ? Number.parseFloat(preview.input_fee_lp.token) : undefined,
	}
}
