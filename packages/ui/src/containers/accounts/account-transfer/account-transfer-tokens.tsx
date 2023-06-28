import { useResourceBalances } from 'packages/ui/src/hooks/dapp/use-balances'
import { useNetworkId } from 'packages/ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'packages/ui/src/hooks/use-store'
import { useWalletAccounts } from 'packages/ui/src/hooks/use-wallet-account'
import React from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { useImmer } from 'use-immer'

import { Box } from 'ui/src/components/box'

import { AccountTransfer } from './account-transfer'
import { defaultToken } from './account-transfer-constants'
import { type IAccountTransferImmer } from './account-transfer-types'
import { validateTransferForm } from './account-transfer-utils'
import { GroupTransactionButton } from './group-transaction-button'
import { GroupTransfer } from './group-transfer'

export const AccountTransferTokens: React.FC = () => {
	const networkId = useNetworkId()
	const { addressBook, selectedAccount } = useNoneSharedStore(state => ({
		addressBook: state.addressBook[networkId] || {},
		selectedAccount: state.selectedAccount,
	}))
	const balances = useResourceBalances(selectedAccount ? { [selectedAccount]: null } : null)
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
		isSubmittingReview: false,
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

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const handleContinue = () => {
		const validation = validateTransferForm(state.transaction)

		setState(draft => {
			draft.initValidation = true
			draft.validation = validation
		})

		if (!validation.success) {
			return
		}

		// DEMO FOR SUBMIT AND REVIEW...
		setState(draft => {
			draft.isSubmittingReview = true
		})

		setTimeout(() => {
			setState(draft => {
				draft.isSubmittingReview = false
			})
		}, 2000)
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
		<AccountTransfer
			title="Transfer tokens"
			description="Transfer tokens"
			helpTitle="Transfer tokens"
			help="Transfer tokens."
		>
			{/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
			{setTransaction => (
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
			)}
		</AccountTransfer>
	)
}
