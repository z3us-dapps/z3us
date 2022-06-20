import React, { useEffect } from 'react'
import { Box, Flex, Text, StyledLink, Image } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import { PageWrapper, PageHeading, PageSubHeading } from '@src/components/layout'
import { useSharedStore, useStore } from '@src/store'
import { useRoute } from 'wouter'
import { hexToJSON } from '@src/utils/encoding'
import { CONFIRM } from '@src/lib/actions'
import { getShortAddress } from '@src/utils/string-utils'
import { useImmer } from 'use-immer'
import { HardwareWalletReconnect } from '@src/components/hardware-wallet-reconnect'
import { AccountSelector } from '@src/components/account-selector'
import { useSignature } from '@src/hooks/use-signature'

export const Sign = (): JSX.Element => {
	const [, { id }] = useRoute<{ id: string }>('/sign/:id')

	const { sign } = useSignature()
	const { hw, seed, sendResponse } = useSharedStore(state => ({
		sendResponse: state.sendResponseAction,
		hw: state.hardwareWallet,
		seed: state.masterSeed,
	}))

	const { account, entry, action, selectAccount } = useStore(state => {
		const accountAddress = state.getCurrentAddressAction()
		return {
			selectAccount: state.selectAccountAction,
			entry: Object.values(state.publicAddresses).find(_account => _account.address === accountAddress),
			account: state.account,
			action:
				state.pendingActions[id] && state.pendingActions[id].payloadHex
					? hexToJSON(state.pendingActions[id].payloadHex)
					: {},
		}
	})

	const { host, request = {} } = action
	const { message = '' } = request

	const [state, setState] = useImmer({
		shortAddress: getShortAddress(entry?.address),
	})

	useEffect(() => {
		if (entry) {
			setState(draft => {
				draft.shortAddress = getShortAddress(entry?.address)
			})
		}
	}, [entry])

	const handleAccountChange = async (accountIndex: number) => {
		await selectAccount(accountIndex, hw, seed)
	}

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

		sendResponse(CONFIRM, {
			id,
			host,
			payload: { request: action.request, value: await sign(message) },
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
				<Box css={{ mt: '$8', flex: '1' }}>
					<AccountSelector shortAddress={state.shortAddress} onAccountChange={handleAccountChange} />
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
					aria-label="cancel"
					css={{ px: '0', flex: '1', mr: '$1' }}
				>
					Cancel
				</Button>
				<Button
					onClick={handleConfirm}
					disabled={!account}
					size="6"
					color="primary"
					aria-label="confirm"
					css={{ px: '0', flex: '1', ml: '$1' }}
				>
					Confirm
				</Button>
			</PageWrapper>
		</>
	)
}
