import { ManifestBuilder } from '@radixdlt/radix-engine-toolkit'
import { useGlobalResourceBalances } from 'packages/ui/src/hooks/dapp/use-balances'
import { useNetworkId } from 'packages/ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'packages/ui/src/hooks/use-store'
import { useWalletAccounts } from 'packages/ui/src/hooks/use-wallet-account'
import { sendFungibleTokens } from 'packages/ui/src/manifests/transfer'
import React from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { useImmer } from 'use-immer'

import { Box } from 'ui/src/components/box'
import Translation from 'ui/src/components/translation'

import { GroupTransactionButton } from '../components/group-transaction-button'
import { GroupTransfer } from '../components/group-transfer'
import { TransferWrapper } from '../components/transfer-wrapper'
import type { TransactionDetailsGetter } from '../components/transfer-wrapper'
import { defaultToken } from '../constants'
import { type IAccountTransferImmer } from '../types'
import { validateTransferForm } from '../utils/validate-transfer-form'

export const Fungibles: React.FC = () => {
	const networkId = useNetworkId()
	const { addressBook, selectedAccount } = useNoneSharedStore(state => ({
		addressBook: state.addressBook[networkId] || {},
		selectedAccount: state.selectedAccount,
	}))
	const accounts = useWalletAccounts()

	const [state, setState] = useImmer<IAccountTransferImmer>({
		transaction: {
			from: selectedAccount || Object.values(accounts)[0]?.address,
			isMessageEncrypted: false,
			message: '',
			sends: [{ to: '', tokens: [defaultToken] }],
		},
		slides: [0, 0],
		isMessageUiVisible: false,
		initValidation: false,
		validation: undefined,
	})

	const { data, isLoading } = useGlobalResourceBalances(state.transaction.from)

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

		const fungibles = state.transaction.sends.map(({ to, tokens }) => ({
			from: state.transaction.from,
			to,
			tokens: tokens.map(token => ({ amount: token.amount, resource: token.address })),
		}))

		const transactionManifest = sendFungibleTokens(new ManifestBuilder(), fungibles).build().toString()

		return {
			version: 1,
			transactionManifest,
			message: state.transaction.message,
		}
	}

	const handleRemoveGroupTransaction = (sendIndex: number) => {
		setState(draft => {
			if (sendIndex === 0) {
				draft.transaction.sends = [{ to: '', tokens: [defaultToken] }]
			} else {
				draft.transaction.sends = state.transaction.sends.filter((_, index) => index !== sendIndex)
			}
		})
	}

	const handleAddToken = (sendIndex: number) => {
		setState(draft => {
			draft.transaction.sends[sendIndex].tokens = [...state.transaction.sends[sendIndex].tokens, defaultToken]
		})
	}

	const handleAddGroup = () => {
		setState(draft => {
			draft.transaction.sends = [...state.transaction.sends, { to: '', tokens: [defaultToken] }]
		})
	}

	const handleUpdateToAccount = (sendIndex: number) => (value: string) => {
		setState(draft => {
			draft.transaction.sends[sendIndex].to = value
		})
	}

	const handleUpdateTokenValue = (sendIndex: number) => (tokenIndex: number) => (tokenValue: number) => {
		setState(draft => {
			draft.transaction.sends[sendIndex].tokens[tokenIndex].amount = tokenValue
		})
	}

	const handleUpdateToken =
		(sendIndex: number) => (tokenIndex: number) => (address: string, symbol: string, name: string) => {
			setState(draft => {
				draft.transaction.sends[sendIndex].tokens[tokenIndex] = {
					...draft.transaction.sends[sendIndex].tokens[tokenIndex],
					address,
					name,
					symbol,
				}
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
		<TransferWrapper
			title={<Translation capitalizeFirstLetter text="transfer.tokens.title" />}
			titleSuffix={<Translation text="transfer.tokens.titleSuffix" />}
			transaction={handleContinue}
		>
			<Box position="relative">
				<GroupTransfer
					transaction={state.transaction}
					isMessageUiVisible={state.isMessageUiVisible}
					fromAccount={state.transaction.from}
					accounts={accounts}
					addressBook={addressBook}
					balances={data?.balances}
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
				<GroupTransactionButton onAddGroup={handleAddGroup} />
			</Box>
		</TransferWrapper>
	)
}

export default Fungibles
