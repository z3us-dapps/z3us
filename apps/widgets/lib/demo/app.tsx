import { GatewayApiClient } from '@radixdlt/babylon-gateway-api-sdk'
import type { GatewayApiClientConfig } from '@radixdlt/radix-dapp-toolkit'
import { useEffect, useState } from 'react'

import { findMetadataValue } from 'ui/src/services/metadata'

import './styles.css'

const Demo = () => {
	const [name, setName] = useState<string>()

	const handleClink = () => {
		if (!window.rdt) {
			// eslint-disable-next-line no-alert
			alert('nor rdt')
		} else {
			const walletData = window.rdt?.walletApi.getWalletData()
			if (!walletData || walletData.accounts.length === 0) {
				// eslint-disable-next-line no-alert
				alert('accounts empty')
			} else {
				window.rdt.walletApi.sendTransaction({
					transactionManifest: `
				CALL_METHOD
					Address("${walletData.accounts[0].address}")
					"withdraw"
					Address("resource_rdx1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxradxrd")
					Decimal("5")
				;
				TAKE_FROM_WORKTOP
					Address("resource_rdx1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxradxrd")
					Decimal("5")
					Bucket("bucket1")
				;
				CALL_METHOD
					Address("component_rdx1crduuu8q77xkngf88puhumrpqgqk5sy9fvfz6wwjzs3lvx05z3582h")
					"buy_member_card"
					Bucket("bucket1")
				;
				TAKE_FROM_WORKTOP
					Address("resource_rdx1nfyg2f68jw7hfdlg5hzvd8ylsa7e0kjl68t5t62v3ttamtejc9wlxa")
					Decimal("1")
					Bucket("bucket2")
				;
				CALL_METHOD
					Address("${walletData.accounts[0].address}")
					"deposit"
					Bucket("bucket2")
				;
					`,
				})
			}
		}
	}

	useEffect(() => {
		const gateway = GatewayApiClient.initialize(window.rdt?.gatewayApi.clientConfig as GatewayApiClientConfig)
		gateway.state
			.getEntityMetadata('resource_rdx1nfyg2f68jw7hfdlg5hzvd8ylsa7e0kjl68t5t62v3ttamtejc9wlxa')
			.then(({ items }) => {
				setName(findMetadataValue('name', items))
			})
	}, [])

	return (
		<div>
			<h1>AIRDROP</h1>
			<p>{name}</p>
			<button type="button" onClick={handleClink}>
				Redeem
			</button>
		</div>
	)
}

export default Demo
