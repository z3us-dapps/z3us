import type { Intent } from '@radixdlt/radix-engine-toolkit'
import { InstructionsKind, RadixEngineToolkit } from '@radixdlt/radix-engine-toolkit'
import React, { useEffect } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useImmer } from 'use-immer'

import { Box } from 'ui/src/components/box'
import { CopyAddressButton } from 'ui/src/components/copy-address-button'
import { Input } from 'ui/src/components/input'
import { Tabs, TabsContent } from 'ui/src/components/tabs'
import Code from 'ui/src/components/typography/code'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'

import type { TransactionSettings } from '@src/types/transaction'

import { Preview } from './preview'
import * as styles from './styles.css'

const messages = defineMessages({
	tab_preview: {
		id: 'TJo5E6',
		defaultMessage: 'Preview',
	},
	tab_manifest: {
		id: 'c+Uxfa',
		defaultMessage: 'Transaction manifest',
	},
	invalid_manifest: {
		id: 'fNbif/',
		defaultMessage: 'Invalid transaction manifest',
	},
})

const PREVIEW = 'preview'
const MANIFEST = 'manifest'

interface IProps {
	intent: Intent
	settings?: TransactionSettings
	onManifestChange?: (manifest: string) => void
}

type State = {
	manifest?: string
	error?: string
}

export const Manifest: React.FC<IProps> = ({ intent, settings = {}, onManifestChange = () => {} }) => {
	const intl = useIntl()

	const [state, setState] = useImmer<State>({ manifest: '' })

	useEffect(() => {
		RadixEngineToolkit.Instructions.convert(intent.manifest.instructions, intent.header.networkId, 'String').then(
			converted =>
				setState(draft => {
					draft.manifest = converted.value as string
				}),
		)
	}, [intent])

	const handleManifestChange = async (event: React.ChangeEvent<HTMLDivElement>) => {
		const newValue = event.target.textContent || ''

		setState(draft => {
			draft.manifest = newValue
		})

		try {
			await RadixEngineToolkit.Instructions.convert(
				{
					kind: InstructionsKind.String,
					value: newValue,
				},
				intent.header.networkId,
				'Parsed',
			)
			setState(draft => {
				draft.error = ''
			})
			onManifestChange(newValue)
		} catch (error) {
			setState(draft => {
				draft.error = intl.formatMessage(messages.invalid_manifest)
			})
		}
	}

	return (
		<Box className={styles.transactionManifestWrapper}>
			<Tabs
				list={[
					{ label: intl.formatMessage(messages.tab_preview), value: PREVIEW },
					{ label: intl.formatMessage(messages.tab_manifest), value: MANIFEST },
				]}
				defaultValue={PREVIEW}
				className={styles.transactionManifestTabsWrapper}
			>
				<TabsContent value={PREVIEW} className={styles.transactionManifestTabsContentWrapper}>
					<Preview intent={intent} settings={settings} />
				</TabsContent>
				<TabsContent value={MANIFEST} className={styles.transactionManifestTabsContentWrapper}>
					<Code
						content={state.manifest}
						className={styles.transactionManifestTextArea}
						onChange={handleManifestChange}
					/>
					<Box className={styles.transactionManifestValidationWrapper}>
						<ValidationErrorMessage message={state.error} />
					</Box>
				</TabsContent>
			</Tabs>
		</Box>
	)
}
