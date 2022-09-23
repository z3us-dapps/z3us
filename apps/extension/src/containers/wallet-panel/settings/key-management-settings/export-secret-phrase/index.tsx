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
	words: Array<string>
	password: string
	showError: boolean
	errorMessage: string
	show: boolean
}

export const ExportSecretPhrase: React.FC = () => {
	const { messanger } = useSharedStore(state => ({
		messanger: state.messanger,
	}))

	const [state, setState] = useImmer<ImmerT>({
		words: [],
		password: '',
		showError: false,
		errorMessage: '',
		show: false,
	})

	const handleShow = async () => {
		try {
			const { mnemonic } = await messanger.sendActionMessageFromPopup(UNLOCK, state.password)
			setState(draft => {
				draft.show = true
				draft.words = mnemonic.words
				draft.showError = false
				draft.errorMessage = ''
			})
		} catch (error) {
			setState(draft => {
				draft.show = false
				draft.showError = true
				draft.errorMessage = 'Invalid password'
			})
		}
	}

	const handleCopyMnemomic = () => {
		copyTextToClipboard(state.words.join(' '))
	}

	const handleDone = () => {
		setState(draft => {
			draft.words = []
			draft.show = false
			draft.showError = false
			draft.errorMessage = ''
		})
	}

	const handleCancel = () => {
		setState(draft => {
			draft.words = []
			draft.show = false
			draft.showError = false
			draft.errorMessage = ''
		})
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button size="4" color="tertiary" fullWidth>
					Show recovery phrase
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogTitle>Show recovery phrase?</AlertDialogTitle>
				<Box css={{ py: '$3' }}>
					<AlertCard icon color="warning">
						<Text medium size="3" css={{ p: '$2' }}>
							Do not share your recovery phrase with anyone.
						</Text>
					</AlertCard>

					<Box css={{ mt: '$4' }}>
						{state.show ? (
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
									{state.words.map(word => (
										<Box key={word} css={{ mr: '$2', mb: '$1' }}>
											<Text size="4">{word}</Text>
										</Box>
									))}
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
								<Text css={{ pb: '$3' }}>Enter your password to reveal recovery phrase.</Text>
								<Input
									type="password"
									placeholder="Password"
									error={state.showError}
									onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
										setState(draft => {
											draft.password = e.target.value
											draft.showError = false
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
					{state.show ? (
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
							<Button size="2" color="red" onClick={handleShow}>
								Show recovery phrase
							</Button>
						</>
					)}
				</Flex>
			</AlertDialogContent>
		</AlertDialog>
	)
}
