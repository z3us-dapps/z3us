import React, { useEffect } from 'react'
import { Box, Flex, Text, StyledLink, Image } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import { PageWrapper, PageHeading, PageSubHeading } from '@src/components/layout'
import { useSharedStore, useStore } from '@src/store'
import { useRoute } from 'wouter'
import { hexToJSON } from '@src/utils/encoding'
import { CONFIRM } from '@src/lib/actions'
import { EncryptMessage } from '@src/services/radix/message'
import { getShortAddress } from '@src/utils/string-utils'
import { useImmer } from 'use-immer'
import { HardwareWalletReconnect } from '@src/components/hardware-wallet-reconnect'

export const Encrypt = (): JSX.Element => {
	const [, { id }] = useRoute<{ id: string }>('/encrypt/:id')

	const { hw, seed, sendResponse } = useSharedStore(state => ({
		sendResponse: state.sendResponseAction,
		hw: state.hardwareWallet,
		seed: state.masterSeed,
	}))

	const { account, entry, selectAccountForAddress, action } = useStore(state => {
		const accountAddress = state.getCurrentAddressAction()
		return {
			entry: Object.values(state.publicAddresses).find(_account => _account.address === accountAddress),
			account: state.account,
			selectAccountForAddress: state.selectAccountForAddressAction,
			action:
				state.pendingActions[id] && state.pendingActions[id].payloadHex
					? hexToJSON(state.pendingActions[id].payloadHex)
					: {},
		}
	})

	const {
		host,
		request: { toAddress, message, fromAddress },
	} = action

	const [state, setState] = useImmer({
		shortAddress: getShortAddress(entry?.address),
	})

	useEffect(() => {
		if (fromAddress) {
			selectAccountForAddress(fromAddress, hw, seed)
		}
	}, [fromAddress])

	useEffect(() => {
		if (entry) {
			setState(draft => {
				draft.shortAddress = getShortAddress(entry?.address)
			})
		}
	}, [entry])

	const handleCancel = async () => {
		await sendResponse(CONFIRM, {
			id,
			host,
			payload: { request: action.request, value: { code: 403, error: 'Declined' } },
		})
		window.close()
	}

	const handleConfirm = async () => {
		if (!account) return
		const ecnrypted = await EncryptMessage(account, toAddress, message)
		sendResponse(CONFIRM, {
			id,
			host,
			payload: { request: action.request, value: ecnrypted.toString('hex') },
		})
	}

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
				<Flex
					direction="column"
					justify="center"
					align="center"
					css={{ borderTop: '1px solid $borderPanel', borderBottom: '1px solid $borderPanel', py: '$5' }}
				>
					<Box css={{ pb: '$3' }}>
						<Image src="/images/z3us-spinner.svg" css={{ width: '90px', height: '90px' }} />
					</Box>
					<Flex css={{ position: 'relative', pb: '15px' }}>
						<Text css={{ flex: '1' }}>Using account:</Text>
						<Text>{entry?.name ? `${entry.name} (${state.shortAddress})` : state.shortAddress}</Text>
					</Flex>
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
					disabled={!account}
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
