import React, { useEffect, useState } from 'react'
import { Box, Flex, Text, StyledLink, Image } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import { AccountSelector } from '@src/components/account-selector'
import { PageWrapper, PageHeading, PageSubHeading } from '@src/components/layout'
import { getShortAddress } from '@src/utils/string-utils'
import { useStore } from '@src/store'
import { useRoute } from 'wouter'
import { hexToJSON } from '@src/utils/encoding'
import { CONFIRM } from '@src/lib/actions'
import { EncryptMessage } from '@src/services/radix/message'

export const Encrypt = (): JSX.Element => {
	const [, { id }] = useRoute<{ id: string }>('/encrypt/:id')

	const { account, sendResponse, selectAccount, selectAccountForAddress, action } = useStore(state => ({
		account: state.account,
		sendResponse: state.sendResponseAction,
		selectAccount: state.selectAccountAction,
		selectAccountForAddress: state.selectAccountForAddressAction,
		action:
			state.pendingActions[id] && state.pendingActions[id].payloadHex
				? hexToJSON(state.pendingActions[id].payloadHex)
				: {},
	}))

	const {
		host,
		request: { toAddress, message, fromAddress },
	} = action
	const [shortAddress, setShortAddress] = useState(getShortAddress(account?.address?.toString()))

	useEffect(() => {
		selectAccountForAddress(fromAddress)
	}, [fromAddress])

	useEffect(() => {
		if (account?.address) {
			setShortAddress(getShortAddress(account?.address?.toString()))
		}
	}, [account])

	const handleCancel = async () => {
		await sendResponse(CONFIRM, {
			id,
			host,
			payload: { request: action.request, value: { code: 403, error: 'Declined' } },
		})
		window.close()
	}

	const handleConfirm = async () => {
		const ecnrypted = await EncryptMessage(account, toAddress, message)
		sendResponse(CONFIRM, {
			id,
			host,
			payload: { request: action.request, value: ecnrypted.toString('hex') },
		})
	}

	const handleAccountChange = async (accountIndex: number) => {
		await selectAccount(accountIndex)
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
				<Box css={{ py: '$5' }}>
					<AccountSelector shortAddress={shortAddress} onAccountChange={handleAccountChange} />
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
					<Text size="6">Poseidon finance - degen defi ...</Text>
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
