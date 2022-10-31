import React from 'react'
import HDNode from 'hdkey'
import { Mnemonic } from '@radixdlt/crypto'
import { useLocation } from 'wouter'
import { useImmer } from 'use-immer'
import { useSharedStore, useNoneSharedStore } from '@src/hooks/use-store'
import { Box, Flex, Text, Grid } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import Input from 'ui/src/components/input'
import InputFeedBack from 'ui/src/components/input/input-feedback'
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogAction,
	AlertDialogCancel,
} from 'ui/src/components/alert-dialog'
import { KeystoreType, SigningKeyType } from '@src/types'
import { ExportPrivateKey } from './export-private-key'
import { ExportSecretPhrase } from './export-secret-phrase'

interface ImmerT {
	password: string
	newPassword: string
	confirmPassword: string
	showError: boolean
	errorMessage: string
	isLoading: boolean
}

export const KeyManagementSettings: React.FC = () => {
	const [, setLocation] = useLocation()
	const { signingKey, keystore, createWallet, getWallet, removeWallet, removeKeystore, addToast } = useSharedStore(
		state => ({
			signingKey: state.signingKey,
			keystore: state.keystores.find(({ id }) => id === state.selectKeystoreId),
			createWallet: state.createWalletAction,
			removeWallet: state.removeWalletAction,
			getWallet: state.getWalletAction,
			removeKeystore: state.removeKeystoreAction,
			addToast: state.addToastAction,
		}),
	)
	const { accountIndex, reset, selectAccount } = useNoneSharedStore(state => ({
		accountIndex: state.selectedAccountIndex,
		reset: state.resetAction,
		selectAccount: state.selectAccountAction,
	}))

	const [state, setState] = useImmer<ImmerT>({
		password: '',
		newPassword: '',
		confirmPassword: '',
		showError: false,
		errorMessage: '',
		isLoading: false,
	})

	const handleResetWallet = async () => {
		await removeWallet()
		reset()
		if (keystore) {
			removeKeystore(keystore.id)
		}
		setLocation('#/onboarding')
	}

	const handleSubmitForm = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (state.newPassword === state.confirmPassword) {
			try {
				setState(draft => {
					draft.isLoading = true
				})
				const { type, mnemonic, hdMasterNode } = await getWallet(state.password)

				if (type === SigningKeyType.MNEMONIC) {
					const mnemomicRes = await Mnemonic.fromEntropy({
						entropy: Buffer.from(mnemonic?.entropy, 'hex'),
						language: mnemonic?.language,
					})
					if (mnemomicRes.isErr()) throw mnemomicRes.error
					await createWallet(SigningKeyType.MNEMONIC, mnemonic?.entropy, state.newPassword, accountIndex)
				} else {
					const hdkey = HDNode.fromJSON(hdMasterNode)
					await createWallet(
						SigningKeyType.PRIVATE_KEY,
						hdkey.privateExtendedKey.toString(),
						state.newPassword,
						accountIndex,
					)
				}
				await selectAccount(accountIndex)

				setState(draft => {
					draft.isLoading = false
					draft.showError = false
					draft.errorMessage = ''
					draft.password = ''
					draft.newPassword = ''
					draft.confirmPassword = ''
				})

				addToast({
					type: 'success',
					title: 'Succesfully updated password',
					duration: 5000,
				})
			} catch (error) {
				setState(draft => {
					draft.isLoading = false
					draft.showError = true
					draft.errorMessage = 'Invalid password.'
				})
			}
		} else {
			setState(draft => {
				draft.isLoading = false
				draft.showError = true
				draft.errorMessage = 'Passwords do not match!'
			})
		}
	}

	return (
		<Box css={{ px: '$3', py: '$3' }}>
			<Box css={{ pb: '$4' }}>
				<Box css={{ pb: '$3' }}>
					<Text medium>Update wallet password:</Text>
				</Box>
				<form onSubmit={handleSubmitForm}>
					<Box>
						<Input
							type="password"
							placeholder="Current password"
							error={state.showError}
							onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
								setState(draft => {
									draft.password = e.target.value
									draft.showError = false
								})
							}}
						/>
						<Input
							type="password"
							placeholder="New password"
							error={state.showError}
							onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
								setState(draft => {
									draft.newPassword = e.target.value
									draft.showError = false
									draft.errorMessage = ''
								})
							}}
							css={{ mt: '$2' }}
						/>
						<Input
							type="password"
							placeholder="Confirm password"
							error={state.showError}
							onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
								setState(draft => {
									draft.confirmPassword = e.target.value
									draft.showError = false
									draft.errorMessage = ''
								})
							}}
							css={{ mt: '$2' }}
						/>
					</Box>
					<InputFeedBack
						showFeedback={!!state.errorMessage}
						animateHeight={25}
						css={{ display: 'flex', alignItems: 'flex-end', overflow: 'clip' }}
					>
						<Text color="red" medium>
							{state.errorMessage}
						</Text>
					</InputFeedBack>
					<Grid gap={3} flow="column" css={{ mt: '$3' }}>
						<Button size="4" color="primary" fullWidth loading={state.isLoading}>
							Save
						</Button>
					</Grid>
				</form>
			</Box>
			{keystore?.type === KeystoreType.LOCAL && (
				<Box css={{ pt: '$5', mt: '$1', borderTop: '1px solid $borderPanel' }}>
					<ExportPrivateKey />
				</Box>
			)}
			{signingKey?.type === SigningKeyType.MNEMONIC && (
				<Box css={{ mt: '$3' }}>
					<ExportSecretPhrase />
				</Box>
			)}
			<Box css={{ mt: '$3' }}>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button size="4" color="red" fullWidth>
							Remove wallet
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogTitle>Remove wallet?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. Please ensure you have your secret phrase backed up.
						</AlertDialogDescription>
						<Flex justify="end">
							<AlertDialogCancel asChild>
								<Button size="2" color="tertiary" css={{ mr: '$2' }}>
									Cancel
								</Button>
							</AlertDialogCancel>
							<AlertDialogAction asChild>
								<Button size="2" color="red" onClick={handleResetWallet}>
									Yes, remove wallet
								</Button>
							</AlertDialogAction>
						</Flex>
					</AlertDialogContent>
				</AlertDialog>
			</Box>
		</Box>
	)
}

export default KeyManagementSettings
