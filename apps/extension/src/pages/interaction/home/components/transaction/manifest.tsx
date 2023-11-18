import type { Intent } from '@radixdlt/radix-engine-toolkit'
import { InstructionsKind, RadixEngineToolkit } from '@radixdlt/radix-engine-toolkit'
import React, { useEffect } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useImmer } from 'use-immer'

import { Box } from 'ui/src/components/box'
import { TextAreaAdapter as TextAreaField } from 'ui/src/components/form/fields/text-area-field'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'

import * as styles from './styles.css'

const messages = defineMessages({
	invalid_manifest: {
		id: 'fNbif/',
		defaultMessage: 'Invalid transaction manifest',
	},
})

interface IProps {
	intent: Intent
	onChange: (manifest: string) => void
}

type State = {
	manifest: string
	error: string
}

export const Manifest: React.FC<IProps> = ({ intent, onChange }) => {
	const intl = useIntl()
	const [state, setState] = useImmer<State>({ manifest: '', error: '' })

	useEffect(() => {
		RadixEngineToolkit.Instructions.convert(intent.manifest.instructions, intent.header.networkId, 'String').then(
			converted =>
				setState(draft => {
					draft.manifest = converted.value as string
				}),
		)
	}, [intent])

	const handleManifestChange = async (newValue: string) => {
		setState(draft => {
			draft.manifest = newValue
		})

		RadixEngineToolkit.Instructions.convert(
			{
				kind: InstructionsKind.String,
				value: newValue,
			},
			intent.header.networkId,
			'Parsed',
		)
			.then(() => {
				setState(draft => {
					draft.error = ''
				})
				onChange(newValue)
			})
			.catch(() => {
				setState(draft => {
					draft.error = intl.formatMessage(messages.invalid_manifest)
				})
			})
	}

	return (
		<>
			<Box className={styles.transactionManifestValidationWrapper}>
				<ValidationErrorMessage message={state.error} />
			</Box>
			<TextAreaField
				name="manifest"
				sizeVariant="large"
				className={styles.transactionManifestTextArea}
				value={state.manifest}
				onChange={handleManifestChange}
			/>
		</>
	)
}
