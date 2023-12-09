import React, { useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { ArrowLeftIcon } from 'ui/src/components/icons'
import { Input } from 'ui/src/components/input'
import { KeystoreType } from 'ui/src/store/types'

import { secretToData } from '@src/crypto/secret'
import type { Data } from '@src/types/vault'
import { DataType } from '@src/types/vault'

import Done from '../components/done'
import KeystoreForm from '../components/keystore-form'
import { Title } from '../components/title'
import * as styles from './styles.css'

const messages = defineMessages({
	raw_key_title: {
		id: '3Pv03t',
		defaultMessage: 'Restore from raw private key',
	},
	raw_key_sub_title: {
		id: '3f4QUe',
		defaultMessage: 'Enter private key to continue (64 hex digits)',
	},
	raw_key_input_placeholder: {
		id: 'IOLlx+',
		defaultMessage: 'Enter key',
	},
	raw_key_continue_button: {
		id: 'acrOoz',
		defaultMessage: 'Continue',
	},

	raw_key_complete_title: {
		defaultMessage: 'Create a new wallet',
		id: 'wx278L',
	},
	raw_key_complete_sub_title: {
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

	const handleSubmit = (): Data => secretToData(DataType.RAW_PRIVATE_KEY, key.trim())

	const handleDone = () => navigate('/')

	switch (step) {
		case 2:
			return <Done onNext={handleDone} />

		case 1:
			return (
				<Box className={styles.rawKeyWrapper}>
					<Title
						title={intl.formatMessage(messages.raw_key_complete_title)}
						subTitle={intl.formatMessage(messages.raw_key_complete_sub_title)}
					/>
					<KeystoreForm keystoreType={KeystoreType.LOCAL} onSubmit={handleSubmit} onNext={() => setStep(2)} />
				</Box>
			)
		default:
			return (
				<Box className={styles.rawKeyWrapper}>
					<Button onClick={() => navigate(-1)} styleVariant="ghost" sizeVariant="small" iconOnly>
						<ArrowLeftIcon />
					</Button>
					<Title
						title={intl.formatMessage(messages.raw_key_title)}
						subTitle={intl.formatMessage(messages.raw_key_sub_title)}
					/>
					<Box className={styles.rawKeyInputWrapper}>
						<Input
							placeholder={intl.formatMessage(messages.raw_key_input_placeholder)}
							value={key}
							elementType="textarea"
							type="textarea"
							onChange={handleChange}
							className={styles.rawKeyInput}
						/>
					</Box>
					<Button onClick={() => setStep(1)} sizeVariant="xlarge" styleVariant="primary" fullWidth disabled={!key}>
						{intl.formatMessage(messages.raw_key_continue_button)}
					</Button>
				</Box>
			)
	}
}

export default New
