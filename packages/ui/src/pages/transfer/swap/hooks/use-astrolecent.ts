import type { StateEntityDetailsResponseFungibleResourceDetails } from '@radixdlt/babylon-gateway-api-sdk'
import { useEffect, useState } from 'react'

import { DAPP_ADDRESS } from 'ui/src/constants/dapp'
import { DEX_ASTROLECENT, FEE_RATIO } from 'ui/src/constants/swap'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'
import { useSwapPreview } from 'ui/src/hooks/queries/astrolescent'
import { generateId } from 'ui/src/utils/rand'

export const useAstrolecent = (account: string, from: string, to: string, side: 'send' | 'receive', amount: number) => {
	const { data: feeResource } = useEntityDetails(to)

	const [isLoading, setIsLoading] = useState<boolean>(amount > 0)
	const [manifest, setManifest] = useState<string>('')
	const [sendAmount, setSendAmount] = useState<number>(0)
	const [receiveAmount, setReceiveAmount] = useState<number>(0)

	const { data: preview, error, isFetching } = useSwapPreview(account, from, to, side, amount)

	const calculateSwap = ({ divisibility }: StateEntityDetailsResponseFungibleResourceDetails) => {
		if (side === 'send') {
			setSendAmount(amount)
			setReceiveAmount(preview.outputTokens * (1 - FEE_RATIO))
		} else {
			setSendAmount(preview.inputTokens)
			setReceiveAmount(amount)
		}

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

		setManifest(transactionManifest)
	}

	useEffect(() => {
		if (isFetching) {
			setIsLoading(true)
			return
		}
		if (!feeResource) return
		setManifest('')
		if (preview) {
			calculateSwap(feeResource.details as StateEntityDetailsResponseFungibleResourceDetails)
			setIsLoading(false)
		} else if (error) {
			setIsLoading(false)
		}
	}, [account, to, feeResource, isFetching, preview, error])

	return {
		dex: DEX_ASTROLECENT,
		allowsReceive: false,
		isLoading,
		error,
		manifest,
		sendAmount,
		receiveAmount,
		price: receiveAmount > 0 ? sendAmount / receiveAmount : 0,
		priceImpact: preview?.priceImpact || 0,
		swapFee: preview?.swapFee || 0,
	}
}
