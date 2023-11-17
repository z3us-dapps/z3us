import type { Intent } from '@radixdlt/radix-engine-toolkit'
import { InstructionsKind, RadixEngineToolkit } from '@radixdlt/radix-engine-toolkit'
import React, { useEffect } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import useMeasure from 'react-use-measure'
import { useImmer } from 'use-immer'

import { Box } from 'ui/src/components/box'
import { Tabs, TabsContent } from 'ui/src/components/tabs'
import Code from 'ui/src/components/typography/code'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'

import type { TransactionMeta, TransactionSettings } from '@src/types/transaction'

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
	settings: TransactionSettings
	meta: TransactionMeta
	onManifestChange?: (manifest: string) => void
	onSettingsChange: (settings: TransactionSettings) => void
}

type State = {
	manifest?: string
	error?: string
}

export const Manifest: React.FC<IProps> = ({ intent, settings, meta, onManifestChange, onSettingsChange }) => {
	const intl = useIntl()
	const [measureRef, { height: tabHeight }] = useMeasure()
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
		<Box ref={measureRef} className={styles.transactionManifestWrapper}>
			<Tabs
				list={[
					{ label: intl.formatMessage(messages.tab_preview), value: PREVIEW },
					{ label: intl.formatMessage(messages.tab_manifest), value: MANIFEST },
				]}
				defaultValue={PREVIEW}
				className={styles.transactionManifestTabsWrapper}
			>
				<TabsContent value={PREVIEW} className={styles.transactionManifestTabsContentWrapper}>
					<Preview intent={intent} settings={settings} meta={meta} onSettingsChange={onSettingsChange} />
				</TabsContent>
				<TabsContent value={MANIFEST} className={styles.transactionManifestTabsContentWrapper}>
					<Code
						content={state.manifest}
						className={styles.transactionManifestTextArea}
						onChange={handleManifestChange}
						style={{ height: `${tabHeight - 80}px` }}
					/>
					<Box className={styles.transactionManifestValidationWrapper}>
						<ValidationErrorMessage message={state.error} />
					</Box>
				</TabsContent>
			</Tabs>
		</Box>
	)
}
