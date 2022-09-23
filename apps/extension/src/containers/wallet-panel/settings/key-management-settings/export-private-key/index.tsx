import React from 'react'
import { useImmer } from 'use-immer'
import { useSharedStore } from '@src/hooks/use-store'
import { Box, Flex, Text } from 'ui/src/components/atoms'
import { copyTextToClipboard } from '@src/utils/copy-to-clipboard'
import { CopyIcon } from '@radix-ui/react-icons'
import Button from 'ui/src/components/button'
import AlertCard from 'ui/src/components/alert-card'
import Input from 'ui/src/components/input'
import ButtonTipFeedback from 'ui/src/components/button-tip-feedback'
import InputFeedBack from 'ui/src/components/input/input-feedback'
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogAction,
	AlertDialogCancel,
} from 'ui/src/components/alert-dialog'
import { UNLOCK } from '@src/lib/v1/actions'

interface ImmerT {
	password: string
	showError: boolean
	errorMessage: string
	showPrivateKey: boolean
}

export const ExportPrivateKey: React.FC = () => {
	const { seed, messanger } = useSharedStore(state => ({
		messanger: state.messanger,
		seed: state.masterSeed,
	}))

	const [state, setState] = useImmer<ImmerT>({
		password: '',
		showError: false,
		errorMessage: '',
		showPrivateKey: false,
	})

	const handleShowPrivateKey = async () => {
		try {
			await messanger.sendActionMessageFromPopup(UNLOCK, state.password)

			setState(draft => {
				draft.showPrivateKey = true
				draft.showError = false
				draft.errorMessage = ''
			})
		} catch (error) {
			setState(draft => {
				draft.showPrivateKey = false
				draft.showError = true
				draft.errorMessage = 'Invalid password'
			})
		}
	}

	const handleCopyMnemomic = () => {
		copyTextToClipboard(seed.masterNode().privateKey.toString())
	}

	const handleCancel = () => {
		setState(draft => {
			draft.showPrivateKey = false
			draft.showError = false
			draft.errorMessage = ''
		})
	}

	const handleDone = () => {
		setState(draft => {
			draft.showPrivateKey = false
			draft.showError = false
			draft.errorMessage = ''
		})
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button size="4" color="tertiary" fullWidth>
					Export private key
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogTitle>Export private key?</AlertDialogTitle>
				<Box css={{ py: '$3' }}>
					<AlertCard icon color="warning">
						<Text medium size="3" css={{ p: '$2' }}>
							Do not share your private key with anyone.
						</Text>
					</AlertCard>

					<Box css={{ mt: '$4' }}>
						{state.showPrivateKey ? (
							<Box
								css={{
									background: '$bgPanel',
									p: '$4',
									pb: '100px',
									br: '$2',
									border: '1px solid $borderPanel',
									position: 'relative',
								}}
							>
								<Flex css={{ overflow: 'hidden', flexWrap: 'wrap' }}>
									<Text size="4">{seed.masterNode().privateKey.toString()}</Text>
								</Flex>
								<ButtonTipFeedback tooltip="Copy phrase">
									<Button
										onClick={handleCopyMnemomic}
										size="2"
										color="primary"
										css={{ position: 'absolute', bottom: '$2', right: '$2' }}
									>
										<CopyIcon />
										Copy
									</Button>
								</ButtonTipFeedback>
							</Box>
						) : (
							<>
								<Text css={{ pb: '$3' }}>Enter your password to reveal private key.</Text>
								<Input
									type="password"
									placeholder="Password"
									error={state.showError}
									onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
										setState(draft => {
											draft.password = e.target.value
											draft.showError = false
											draft.errorMessage = ''
										})
									}}
								/>
								<InputFeedBack
									showFeedback={!!state.errorMessage}
									animateHeight={25}
									css={{ display: 'flex', alignItems: 'flex-end', overflow: 'clip' }}
								>
									<Text color="red" medium>
										{state.errorMessage}
									</Text>
								</InputFeedBack>
							</>
						)}
					</Box>
				</Box>
				<Flex justify="end">
					{state.showPrivateKey ? (
						<AlertDialogAction asChild>
							<Button size="4" color="tertiary" fullWidth onClick={handleDone}>
								Done
							</Button>
						</AlertDialogAction>
					) : (
						<>
							<AlertDialogCancel asChild>
								<Button size="2" color="tertiary" css={{ mr: '$2' }} onClick={handleCancel}>
									Cancel
								</Button>
							</AlertDialogCancel>
							<Button size="2" color="red" onClick={handleShowPrivateKey}>
								Show private key
							</Button>
						</>
					)}
				</Flex>
			</AlertDialogContent>
		</AlertDialog>
	)
}
