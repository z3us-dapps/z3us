import React from 'react'
import { useEventListener } from 'usehooks-ts'
import { Box, Flex, Text, StyledLink, Image } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import { PageWrapper, PageHeading, PageSubHeading } from '@src/components/layout'
import { useSharedStore, useNoneSharedStore } from '@src/hooks/use-store'
import { useRoute } from 'wouter'
import { hexToJSON } from '@src/utils/encoding'
import { CONFIRM } from '@src/lib/v1/actions'
import { HardwareWalletReconnect } from '@src/components/hardware-wallet-reconnect'
import { useMessage } from '@src/hooks/use-message'

export const Encrypt = (): JSX.Element => {
	const [, { id }] = useRoute<{ id: string }>('/encrypt/:id')

	const { createMessage } = useMessage()
	const { signingKey, sendResponse } = useSharedStore(state => ({
		signingKey: state.signingKey,
		sendResponse: state.sendResponseAction,
	}))
	const { action } = useNoneSharedStore(state => ({
		action:
			state.pendingActions[id] && state.pendingActions[id].payloadHex
				? hexToJSON(state.pendingActions[id].payloadHex)
				: {},
	}))

	const { host, request = {} } = action
	const { toAddress, message = '' } = request

	const handleCancel = async () => {
		await sendResponse(CONFIRM, {
			id,
			host,
			payload: { request: action.request, value: { code: 403, error: 'Declined' } },
		})
		window.close()
	}

	const handleConfirm = async () => {
		if (!signingKey) return
		const ecnrypted = await createMessage(message, toAddress)
		sendResponse(CONFIRM, {
			id,
			host,
			payload: { request: action.request, value: ecnrypted },
		})
	}

	// keypress does not handle ESC on Mac
	useEventListener('keydown', async e => {
		switch (e.code) {
			case 'Escape':
				await handleCancel()
				break
			default:
				break
		}
	})

	useEventListener('keypress', async e => {
		switch (e.code) {
			case 'Enter':
				await handleConfirm()
				break
			default:
				break
		}
	})

	return (
		<>
			<PageWrapper css={{ flex: '1' }}>
				<Box>
					<PageHeading>Encrypt message</PageHeading>
					<PageSubHeading>
						Encrypt message from{' '}
						<StyledLink underline href="#" target="_blank">
							{host}
						</StyledLink>
						.
					</PageSubHeading>
				</Box>
				<Box css={{ mt: '$8', flex: '1' }}>
					<HardwareWalletReconnect />
				</Box>
				<Box css={{ pt: '$2', pb: '$8', flex: '1' }}>
					<Box
						css={{
							br: '$3',
							p: '16px',
							border: '1px solid $borderPanel',
						}}
					>
						<Text size="2">{message}</Text>
					</Box>
				</Box>

				<Flex
					direction="column"
					justify="center"
					align="center"
					css={{ mt: '$2', borderTop: '1px solid $borderPanel', borderBottom: '1px solid $borderPanel', py: '$5' }}
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
					aria-label="cancel encrypt wallet"
					css={{ px: '0', flex: '1', mr: '$1' }}
				>
					Cancel
				</Button>
				<Button
					onClick={handleConfirm}
					disabled={!signingKey}
					size="6"
					color="primary"
					aria-label="confirm encrypt wallet"
					css={{ px: '0', flex: '1', ml: '$1' }}
				>
					Confirm
				</Button>
			</PageWrapper>
		</>
	)
}

export default Encrypt
