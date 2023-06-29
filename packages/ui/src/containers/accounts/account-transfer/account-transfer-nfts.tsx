import type { NonFungibleLocalIdString } from '@radixdlt/radix-dapp-toolkit'
import { ManifestBuilder } from '@radixdlt/radix-dapp-toolkit'
import { useResourceBalances } from 'packages/ui/src/hooks/dapp/use-balances'
import { useNetworkId } from 'packages/ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'packages/ui/src/hooks/use-store'
import { useWalletAccounts } from 'packages/ui/src/hooks/use-wallet-account'
import { sendNftTokens } from 'packages/ui/src/manifests/tokens'
import React from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { useImmer } from 'use-immer'

import { Box } from 'ui/src/components/box'

import type { TransactionDetailsGetter } from './account-transfer'
import { AccountTransfer } from './account-transfer'
import { defaultNft } from './account-transfer-constants'
import { type IAccountTransferNftsImmer } from './account-transfer-types'
import { validateTransferForm } from './account-transfer-utils'
import { GroupTransactionButton } from './group-transaction-button'
import { GroupTransfer } from './group-transfer'

export const AccountTransferNfts: React.FC = () => {
	const networkId = useNetworkId()
	const { addressBook, selectedAccount } = useNoneSharedStore(state => ({
		addressBook: state.addressBook[networkId] || {},
		selectedAccount: state.selectedAccount,
	}))
	const balances = useResourceBalances(selectedAccount ? { [selectedAccount]: null } : null)
	const accounts = useWalletAccounts()

	const [state, setState] = useImmer<IAccountTransferNftsImmer>({
		transaction: {
			from: selectedAccount || Object.values(accounts)[0]?.address,
			isMessageEncrypted: false,
			message: '',
			sends: [{ to: '', nfts: [defaultNft] }],
		},
		slides: [0, 0],
		isMessageUiVisible: false,
		initValidation: false,
		validation: undefined,
	})

	useDeepCompareEffect(() => {
		if (state.initValidation) {
			setState(draft => {
				draft.validation = validateTransferForm(state.transaction)
			})
		}
	}, [state.transaction])

	const handleUpdateFromAccount = (account: string) => {
		setState(draft => {
			draft.transaction.from = account
		})
	}

	const handleContinue: TransactionDetailsGetter = () => {
		const validation = validateTransferForm(state.transaction)

		setState(draft => {
			draft.initValidation = true
			draft.validation = validation
		})

		if (!validation.success) {
			return null
		}

		const nfts = state.transaction.sends.map(({ to, nfts: tokens }) => ({
			from: state.transaction.from,
			to,
			tokens: tokens.map(nft => ({ resource: nft.address, ids: [nft.id as NonFungibleLocalIdString] })),
		}))

		const transactionManifest = sendNftTokens(new ManifestBuilder(), nfts).build().toString()

		return {
			version: 1,
			transactionManifest,
			message: state.transaction.message,
		}
	}

	const handleRemoveGroupTransaction = (sendIndex: number) => {
		setState(draft => {
			if (sendIndex === 0) {
				draft.transaction.sends = [{ to: '', nfts: [defaultNft] }]
			} else {
				draft.transaction.sends = state.transaction.sends.filter((_, index) => index !== sendIndex)
			}
		})
	}

	const handleAddToken = (sendIndex: number) => {
		setState(draft => {
			draft.transaction.sends[sendIndex].nfts = [...state.transaction.sends[sendIndex].nfts, defaultNft]
		})
	}

	const handleAddGroup = () => {
		setState(draft => {
			draft.transaction.sends = [...state.transaction.sends, { to: '', nfts: [defaultNft] }]
		})
	}

	const handleUpdateToAccount = (sendIndex: number) => (value: string) => {
		setState(draft => {
			draft.transaction.sends[sendIndex].to = value
		})
	}

	const handleUpdateTokenValue = (sendIndex: number) => (tokenIndex: number) => (id: number) => {
		setState(draft => {
			draft.transaction.sends[sendIndex].nfts[tokenIndex].id = `#${id}#`
		})
	}

	const handleUpdateToken = (sendIndex: number) => (tokenIndex: number) => (address: string) => {
		setState(draft => {
			draft.transaction.sends[sendIndex].nfts[tokenIndex].address = address
		})
	}

	const handleToggleMessageUi = () => {
		setState(draft => {
			draft.isMessageUiVisible = !state.isMessageUiVisible
		})
	}

	const handleUpdateMessage = (message: string) => {
		setState(draft => {
			draft.transaction.message = message
		})
	}

	const handleUpdateIsMessageEncrypted = (isEncrypted: boolean) => {
		setState(draft => {
			draft.transaction.isMessageEncrypted = isEncrypted
		})
	}

	return (
		<AccountTransfer
			title="Transfer tokens"
			description="Transfer tokens"
			helpTitle="Transfer tokens"
			help="Transfer tokens."
			transaction={handleContinue}
		>
			<Box position="relative">
				<GroupTransfer
					transaction={state.transaction}
					isMessageUiVisible={state.isMessageUiVisible}
					fromAccount={state.transaction.from}
					accounts={accounts}
					addressBook={addressBook}
					balances={balances}
					validation={state.validation}
					onUpdateFromAccount={handleUpdateFromAccount}
					onUpdateToAccount={handleUpdateToAccount}
					onRemoveGroupTransaction={handleRemoveGroupTransaction}
					onUpdateTokenValue={handleUpdateTokenValue}
					onUpdateToken={handleUpdateToken}
					onAddToken={handleAddToken}
					onToggleMessageUi={handleToggleMessageUi}
					onUpdateMessage={handleUpdateMessage}
					onUpdateIsMessageEncrypted={handleUpdateIsMessageEncrypted}
				/>
				<Box paddingTop="large" display="flex" flexDirection="column" gap="medium">
					<GroupTransactionButton onAddGroup={handleAddGroup} />
				</Box>
			</Box>
		</AccountTransfer>
	)
}
