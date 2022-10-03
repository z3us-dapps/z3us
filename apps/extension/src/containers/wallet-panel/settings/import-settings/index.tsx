import React, { useContext } from 'react'
import { useImmer } from 'use-immer'
import { useNoneSharedStore, useSharedStore } from '@src/hooks/use-store'
import { Box, Flex, Text } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import AlertCard from 'ui/src/components/alert-card'
import Input from 'ui/src/components/input'
import InputFeedBack from 'ui/src/components/input/input-feedback'
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogCancel,
} from 'ui/src/components/alert-dialog'
import { noneSharedStoreWhitelist, sharedStore, sharedStoreWhitelist } from '@src/store'
import { NoneSharedStoreContext } from '@src/context/state'
import { whiteList as keystorehiteList } from '@src/store/keystores'

const sharedDisabledList = [...keystorehiteList]
const sharedWhiteList = sharedStoreWhitelist.filter(key => !sharedDisabledList.includes(key))

const accountDisabledList = ['pendingActions']
const accountWhiteList = noneSharedStoreWhitelist.filter(key => !accountDisabledList.includes(key))

interface ImmerT {
	data: string
	showError: boolean
	successMessage: string
	errorMessage: string
}

const settingsExportVersionV1 = 'v1'

export const ImportSettings: React.FC = () => {
	const noneSharedStoreContext = useContext(NoneSharedStoreContext)
	const sharedState = useSharedStore()
	const noneSharedState = useNoneSharedStore()

	const data = encodeURIComponent(
		JSON.stringify({
			version: settingsExportVersionV1,
			shared: Object.fromEntries(Object.entries(sharedState).filter(([key]) => sharedWhiteList.includes(key))),
			noneShared: Object.fromEntries(Object.entries(noneSharedState).filter(([key]) => accountWhiteList.includes(key))),
		}),
	)

	const [state, setState] = useImmer<ImmerT>({
		data: '',
		showError: false,
		successMessage: '',
		errorMessage: '',
	})

	const handleCancel = () => {
		setState(draft => {
			draft.showError = false
			draft.successMessage = ''
			draft.errorMessage = ''
		})
	}

	const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		try {
			const fileReader = new FileReader()
			fileReader.readAsText(e.target.files[0], 'UTF-8')
			fileReader.onload = (event: ProgressEvent<FileReader>) => {
				setState(draft => {
					draft.data = event.target.result.toString()
					draft.showError = false
					draft.successMessage = ''
					draft.errorMessage = ''
				})
			}
		} catch (error) {
			setState(draft => {
				draft.showError = true
				draft.successMessage = ''
				draft.errorMessage = 'Failed to upload file'
			})
		}
	}

	const handleImport = () => {
		try {
			const { version, shared, noneShared } = JSON.parse(state.data)
			switch (version) {
				case settingsExportVersionV1:
					sharedStore.setState(shared)
					noneSharedStoreContext.store.setState(noneShared)
					break
				default:
					throw new Error(`Invalid settings`)
			}

			setState(draft => {
				draft.showError = false
				draft.successMessage = 'Succesfully imported settings'
				draft.errorMessage = ''
			})
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error)
			setState(draft => {
				draft.showError = true
				draft.successMessage = ''
				draft.errorMessage = 'Invalid settings'
			})
		}
	}

	return (
		<AlertDialog>
			<Flex justify="end" gap="2" css={{ p: '$3', borderTop: '1px solid $borderPanel' }}>
				<Button
					size="4"
					color="primary"
					fullWidth
					target="_blank"
					download="z3us-settings.json"
					href={`data:text/json;charset=utf-8,${data}`}
					as="a"
				>
					Export
				</Button>
				<AlertDialogTrigger asChild>
					<Button size="4" color="tertiary" fullWidth>
						Import settings
					</Button>
				</AlertDialogTrigger>
			</Flex>
			<AlertDialogContent>
				<AlertDialogTitle>Export private key?</AlertDialogTitle>
				<Box css={{ py: '$3' }}>
					<AlertCard icon color="warning">
						<Text medium size="3" css={{ p: '$2' }}>
							All your settings, shared and current account&apos;s will be overriden!
						</Text>
					</AlertCard>

					<Box css={{ mt: '$4' }}>
						<Text css={{ pb: '$3' }}>Upload</Text>
						<Input type="file" size="2" error={state.showError} onChange={handleUpload} />
						<InputFeedBack
							showFeedback={!!state.errorMessage}
							animateHeight={25}
							css={{ display: 'flex', alignItems: 'flex-end', overflow: 'clip' }}
						>
							<Text color="red" medium>
								{state.errorMessage}
							</Text>
						</InputFeedBack>
						<InputFeedBack
							showFeedback={!!state.successMessage}
							animateHeight={25}
							css={{ display: 'flex', alignItems: 'flex-end', overflow: 'clip' }}
						>
							<Text color="green" medium>
								{state.successMessage}
							</Text>
						</InputFeedBack>
					</Box>
				</Box>

				<Flex justify="end">
					<AlertDialogCancel asChild>
						<Button size="2" color="tertiary" css={{ mr: '$2' }} onClick={handleCancel}>
							Close
						</Button>
					</AlertDialogCancel>
					<Button size="2" color="red" onClick={handleImport}>
						Import
					</Button>
				</Flex>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default ImportSettings
