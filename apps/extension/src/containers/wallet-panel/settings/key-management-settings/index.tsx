import React from 'react'
import { useLocation } from 'wouter'
import { UNLOCK } from '@src/lib/actions'
import { useImmer } from 'use-immer'
import { useSharedStore, useStore } from '@src/store'
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
import { ExportPrivateKey } from './export-private-key'
import { ExportSecretPhrase } from './export-secret-phrase'

export const KeyManagementSettings: React.FC = () => {
	const [, setLocation] = useLocation()
	const { keystore, messanger, createWallet, removeWallet, removeKeystore } = useSharedStore(state => ({
		messanger: state.messanger,
		keystore: state.selectKeystoreName,
		createWallet: state.createWalletAction,
		removeWallet: state.removeWalletAction,
		removeKeystore: state.removeKeystore,
	}))
	const { reset, setSeed } = useStore(state => ({
		reset: state.resetAction,
		setSeed: state.setMasterSeedAction,
	}))

	const [state, setState] = useImmer({
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
		if (keystore !== '') {
			removeKeystore(keystore)
		}
		setLocation('#/onboarding')
	}

	const handleSubmitForm = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (state.newPassword === state.confirmPassword) {
			try {
				setState(draft => {
					draft.isLoading = false
				})

				const { mnemonic } = await messanger.sendActionMessageFromPopup(UNLOCK, state.password)
				const seed = await createWallet(mnemonic.words, state.newPassword)
				await setSeed(seed)

				setState(draft => {
					draft.isLoading = false
					draft.showError = false
					draft.errorMessage = ''
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
			<Box css={{ pt: '$5', mt: '$1', borderTop: '1px solid $borderPanel' }}>
				<ExportPrivateKey />
			</Box>
			<Box css={{ mt: '$3' }}>
				<ExportSecretPhrase />
			</Box>
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
