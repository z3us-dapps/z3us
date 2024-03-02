import type { StateEntityDetailsResponseFungibleResourceDetails } from '@radixdlt/babylon-gateway-api-sdk'
import { useEffect, useState } from 'react'

import { DAPP_ADDRESS } from 'ui/src/constants/dapp'
import { DEX_OCI, FEE_RATIO } from 'ui/src/constants/swap'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'
import { useSwapPreview } from 'ui/src/hooks/queries/oci'
import { generateId } from 'ui/src/utils/generate-id'

export const useOci = (account: string, from: string, to: string, side: 'send' | 'receive', amount: number) => {
	const { data: feeResource } = useEntityDetails(to)
	const { data: preview, error, isFetching } = useSwapPreview(from, to, side, amount)

	const [isLoading, setIsLoading] = useState<boolean>(amount > 0)
	const [manifest, setManifest] = useState<string>('')
	const [sendAmount, setSendAmount] = useState<number>(0)
	const [receiveAmount, setReceiveAmount] = useState<number>(0)

	const calculateSwap = ({ divisibility }: StateEntityDetailsResponseFungibleResourceDetails) => {
		const s = preview.input_address === from ? 'send' : 'receive'
		const fromKey = s === 'send' ? 'input' : 'output'
		const toKey = s === 'send' ? 'output' : 'input'
		if (s === 'send') {
			setSendAmount(amount)
			setReceiveAmount(Number.parseFloat(preview[`${toKey}_amount`].token) * (1 - FEE_RATIO))
		} else {
			setSendAmount(Number.parseFloat(preview[`${fromKey}_amount`].token))
			setReceiveAmount(amount)
		}

		const bucketId = generateId()
		const transactionManifest = preview.swaps.reduce(
			(currentManifest, swap) => `
		${currentManifest}
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
	}, [account, from, feeResource, isFetching, preview, error])

	return {
		dex: DEX_OCI,
		allowsReceive: true,
		isLoading,
		error,
		manifest,
		sendAmount,
		receiveAmount,
		price: receiveAmount > 0 ? sendAmount / receiveAmount : 0,
		priceImpact: preview ? Number.parseFloat(preview.price_impact) : 0,
		swapFee: preview ? Number.parseFloat(preview.input_fee_lp.token) : 0,
	}
}
