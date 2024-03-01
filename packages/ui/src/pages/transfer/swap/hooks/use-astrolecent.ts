import type { StateEntityDetailsResponseFungibleResourceDetails } from '@radixdlt/babylon-gateway-api-sdk'
import { useContext, useEffect } from 'react'

import { FormContext } from 'ui/src/components/form/context'
import { FieldContext } from 'ui/src/components/form/field-wrapper/context'
import { DAPP_ADDRESS } from 'ui/src/constants/dapp'
import { DEX_ASTROLECENT, FEE_RATIO } from 'ui/src/constants/swap'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'
import { useSwapPreview } from 'ui/src/hooks/queries/astrolescent'
import { generateId } from 'ui/src/utils/generate-id'

export const useAstrolecent = (
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

	const { data: preview, error, isFetching } = useSwapPreview(account, from, to, side, amount)

	useEffect(() => {
		if (dex !== DEX_ASTROLECENT) return
		if (!feeResource) return
		if (!preview) return

		if (side === 'send') {
			onFieldChange(
				`${parentName}${parentName ? '.' : ''}to[0].amount`,
				(preview.outputTokens * (1 - FEE_RATIO)).toString(),
			)
		} else {
			onFieldChange(`${parentName}${parentName ? '.' : ''}from[0].amount`, preview.inputTokens.toString())
		}

		const { divisibility } = feeResource.details as StateEntityDetailsResponseFungibleResourceDetails
		const bucketId = generateId()
		const feeInstructions = `
			TAKE_FROM_WORKTOP
				Address("${to}")
				Decimal("${(preview.outputTokens * FEE_RATIO).toFixed(divisibility)}")
				Bucket("fee_bucket${bucketId}")
			;
			CALL_METHOD
				Address("${DAPP_ADDRESS}")
				"try_deposit_or_abort"
				Bucket("fee_bucket${bucketId}")
				Enum<0u8>()
			;
		`

		const idx = preview.manifest.lastIndexOf('CALL_METHOD')
		const transactionManifest = `${preview.manifest.substring(
			0,
			idx,
		)}\n${feeInstructions}\n${preview.manifest.substring(idx)}`

		onFieldChange(`${parentName}${parentName ? '.' : ''}manifest`, transactionManifest)
	}, [dex, account, from, preview, feeResource])

	return { error, isFetching, allowsReceive: false, priceImpact: preview?.priceImpact, swapFee: preview?.swapFee }
}
