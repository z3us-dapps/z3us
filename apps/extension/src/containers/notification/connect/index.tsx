import React, { useEffect, useState } from 'react'
import { Box, Flex, Text, StyledLink } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import { AccountSelector } from '@src/components/account-selector'
import { PageWrapper, PageHeading, PageSubHeading } from '@src/components/layout'
import { CheckboxIcon } from '@radix-ui/react-icons'
import { getShortAddress } from '@src/utils/string-utils'
import { useSharedStore, useStore } from '@src/store'
import { useRoute } from 'wouter'
import { hexToJSON } from '@src/utils/encoding'
import { CONFIRM } from '@src/lib/actions'

export const Connect = (): JSX.Element => {
	const [, { id }] = useRoute<{ id: string }>('/connect/:id')

	const { sendResponse } = useSharedStore(state => ({
		sendResponse: state.sendResponseAction,
	}))
	const { accountAddress, action, approveWebsite, declineWebsite, selectAccount, approvedWebsites } = useStore(
		state => ({
			accountAddress: state.getCurrentAddressAction(),
			approvedWebsites: state.approvedWebsites,
			approveWebsite: state.approveWebsiteAction,
			declineWebsite: state.declineWebsiteAction,
			selectAccount: state.selectAccountAction,
			action:
				state.pendingActions[id] && state.pendingActions[id].payloadHex
					? hexToJSON(state.pendingActions[id].payloadHex)
					: {},
		}),
	)

	const { host, request } = action
	const [shortAddress, setShortAddress] = useState(getShortAddress(accountAddress))

	useEffect(() => {
		if (accountAddress) {
			setShortAddress(getShortAddress(accountAddress))
		}
	}, [accountAddress])

	useEffect(() => {
		if (host in approvedWebsites) {
			sendResponse(CONFIRM, { id, host, payload: { request, value: accountAddress } })
		}
	}, [approvedWebsites])

	const handleCancel = async () => {
		declineWebsite(host)
		await sendResponse(CONFIRM, {
			id,
			host,
			payload: { request: action.request, value: { code: 403, error: 'Declined' } },
		})
		window.close()
	}

	const handleConfirm = () => {
		approveWebsite(host)
	}

	const handleAccountChange = async (accountIndex: number) => {
		await selectAccount(accountIndex)
	}

	return (
		<>
			<PageWrapper css={{ flex: '1' }}>
				<Box>
					<PageHeading>Connect</PageHeading>
					<PageSubHeading>
						Connect to{' '}
						<StyledLink underline href={host} target="_blank">
							{host}
						</StyledLink>
						.
					</PageSubHeading>
				</Box>
				<Box css={{ py: '$5' }}>
					<AccountSelector shortAddress={shortAddress} onAccountChange={handleAccountChange} />
				</Box>
				<Box
					css={{
						borderTop: '1px solid $borderPanel',
						py: '$5',
					}}
				>
					{/*<Box css={{ pb: '$3' }}>
						<Image src="/images/z3us-spinner.svg" css={{ width: '90px', height: '90px' }} />
					</Box>*/}
					<Text medium size="5">
						{host}
					</Text>
					<Text size="3" color="muted" css={{ mt: '$2' }}>
						This dApp would like to:
					</Text>
					<Box as="ul" css={{ mt: '$4' }}>
						<Flex align="center" as="li">
							<Box css={{ mr: '$2', mt: '2px' }}>
								<CheckboxIcon />
							</Box>
							<Text>View wallet balance.</Text>
						</Flex>
						<Flex align="center" as="li" css={{ mt: '$1' }}>
							<Box css={{ mr: '$2', mt: '2px' }}>
								<CheckboxIcon />
							</Box>
							<Text>Request approval for transactions.</Text>
						</Flex>
					</Box>
				</Box>
			</PageWrapper>
			<PageWrapper css={{ display: 'flex', gridGap: '12px', borderTop: '1px solid $borderPanel' }}>
				<Button
					onClick={handleCancel}
					size="6"
					color="tertiary"
					aria-label="cancel connect wallet"
					css={{ px: '0', flex: '1' }}
				>
					Cancel
				</Button>
				<Button
					onClick={handleConfirm}
					size="6"
					color="primary"
					aria-label="confirm connect wallet"
					css={{ px: '0', flex: '1' }}
				>
					Connect
				</Button>
			</PageWrapper>
		</>
	)
}
