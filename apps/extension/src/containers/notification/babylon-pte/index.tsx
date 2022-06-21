import React from 'react'
import { Box, Flex, Text, StyledLink, Image } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import { PageWrapper, PageHeading, PageSubHeading } from '@src/components/layout'
import { useSharedStore, useStore } from '@src/store'
import { useRoute } from 'wouter'
import { hexToJSON } from '@src/utils/encoding'
import { CONFIRM } from '@src/lib/actions'
import { HardwareWalletReconnect } from '@src/components/hardware-wallet-reconnect'
import { useBabylonPTE } from '@src/hooks/use-babylon-pte'
import { ManifestBuilder } from 'pte-sdk'

export const Sign = (): JSX.Element => {
	const [, { id }] = useRoute<{ id: string }>('/sign/:id')

	const { service, publicKey } = useBabylonPTE()
	const { sendResponse } = useSharedStore(state => ({
		sendResponse: state.sendResponseAction,
	}))
	const { action } = useStore(state => ({
		action:
			state.pendingActions[id] && state.pendingActions[id].payloadHex
				? hexToJSON(state.pendingActions[id].payloadHex)
				: {},
	}))

	const { host, request } = action

	const handleCancel = async () => {
		await sendResponse(CONFIRM, {
			id,
			host,
			payload: { request, value: { code: 403, error: 'Declined' } },
		})
		window.close()
	}

	const handleConfirm = async () => {
		const receipt = await service.submitTransaction({
			transaction: {
				manifest: new ManifestBuilder().newAccount(publicKey).build().toString(),
				nonce: await service.getNonce({ signers: [publicKey] }),
				signatures: [],
			},
		})
		const address = receipt.newComponents[0]

		sendResponse(CONFIRM, {
			id,
			host,
			payload: { request, value: address },
		})
	}

	return (
		<>
			<PageWrapper css={{ flex: '1' }}>
				<Box>
					<PageHeading>Sign</PageHeading>
					<PageSubHeading>
						Sign message from{' '}
						<StyledLink underline href="#" target="_blank">
							{host}
						</StyledLink>
						.
					</PageSubHeading>
				</Box>
				<Box css={{ mt: '$8', flex: '1' }}>
					<HardwareWalletReconnect />
				</Box>
				<Flex
					direction="column"
					justify="center"
					align="center"
					css={{ borderTop: '1px solid $borderPanel', borderBottom: '1px solid $borderPanel', py: '$5' }}
				>
					<Box css={{ pb: '$3' }}>
						<Image src="/images/z3us-spinner.svg" css={{ width: '90px', height: '90px' }} />
					</Box>
					<StyledLink href="#" target="_blank">
						<Text size="4" color="muted" css={{ mt: '$2' }}>
							{host}
						</Text>
					</StyledLink>
				</Flex>
			</PageWrapper>

			<PageWrapper css={{ display: 'flex' }}>
				<Button
					onClick={handleCancel}
					size="6"
					color="tertiary"
					aria-label="cancel"
					css={{ px: '0', flex: '1', mr: '$1' }}
				>
					Cancel
				</Button>
				<Button
					onClick={handleConfirm}
					size="6"
					color="primary"
					aria-label="confirm"
					css={{ px: '0', flex: '1', ml: '$1' }}
				>
					Connect to Babylon PTE
				</Button>
			</PageWrapper>
		</>
	)
}
