import React, { useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { ArrowLeftIcon } from 'ui/src/components/icons'
import { Input } from 'ui/src/components/input'
import { Text } from 'ui/src/components/typography'
import { KeystoreType } from 'ui/src/store/types'

import { secretToData } from '@src/crypto/secret'
import type { Data } from '@src/types/vault'
import { DataType } from '@src/types/vault'

import Done from '../components/done'
import KeystoreForm from '../components/keystore-form'
import * as styles from './styles.css'

const messages = defineMessages({
	extended_key_title: {
		id: 'sJD8De',
		defaultMessage: 'Restore using private key',
	},
	extended_key_sub_title: {
		id: 'k8GEXS',
		defaultMessage: 'enter private key to continue',
	},
	extended_key_input_placeholder: {
		id: 'IOLlx+',
		defaultMessage: 'Enter key',
	},
	extended_key_continue_button: {
		id: 'acrOoz',
		defaultMessage: 'Continue',
	},

	extended_key_complete_title: {
		defaultMessage: 'Create a new wallet',
		id: 'wx278L',
	},
	extended_key_complete_sub_title: {
		defaultMessage: 'The password will be used to unlock your wallet.',
		id: 'a4CP1S',
	},
})

export const New: React.FC = () => {
	const navigate = useNavigate()
	const intl = useIntl()

	const [key, setKey] = useState<string>('')
	const [step, setStep] = useState<number>(0)

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const evt = event.nativeEvent as InputEvent
		if (evt.isComposing) {
			return
		}

		setKey(event.target.value)
	}

	const handleSubmit = (): Data => secretToData(DataType.PRIVATE_KEY, key)

	const handleDone = () => navigate('/')

	switch (step) {
		case 2:
			return <Done onNext={handleDone} />

		case 1:
			return (
				<Box className={styles.extendedKeyWrapper}>
					<Box className={styles.extendedKeyWrapperTextWrapper}>
						<Text size="xxlarge" weight="strong" color="strong">
							{intl.formatMessage(messages.extended_key_complete_title)}
						</Text>
						<Text>{intl.formatMessage(messages.extended_key_complete_sub_title)}</Text>
					</Box>
					<KeystoreForm keystoreType={KeystoreType.LOCAL} onSubmit={handleSubmit} onNext={() => setStep(2)} />
				</Box>
			)
		default:
			return (
				<Box className={styles.extendedKeyWrapper}>
					<Button onClick={() => navigate(-1)} styleVariant="ghost" sizeVariant="small" iconOnly>
						<ArrowLeftIcon />
					</Button>
					<Box className={styles.extendedKeyWrapperTextWrapper}>
						<Text color="strong" size="xxlarge" weight="strong">
							{intl.formatMessage(messages.extended_key_title)}
						</Text>
						<Text>{intl.formatMessage(messages.extended_key_sub_title)}</Text>
					</Box>
					<Box className={styles.extendedKeyInputWrapper}>
						<Input
							placeholder={intl.formatMessage(messages.extended_key_input_placeholder)}
							value={key}
							elementType="textarea"
							type="textarea"
							onChange={handleChange}
							className={styles.extendedKeyInput}
						/>
					</Box>
					<Button onClick={() => setStep(1)} sizeVariant="xlarge" styleVariant="primary" fullWidth disabled={!key}>
						{intl.formatMessage(messages.extended_key_continue_button)}
					</Button>
				</Box>
			)
	}
}

export default New
