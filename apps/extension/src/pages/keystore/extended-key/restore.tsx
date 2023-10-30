import React, { useEffect, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { ArrowLeftIcon } from 'ui/src/components/icons'
import { Input } from 'ui/src/components/input'
import { Text } from 'ui/src/components/typography'
import type { Keystore } from 'ui/src/store/types'
import { KeystoreType } from 'ui/src/store/types'
import { generateId } from 'ui/src/utils/generate-id'

import { secretToData } from '@src/crypto/secret'
import { useIsUnlocked } from '@src/hooks/use-is-unlocked'
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
})

export const New: React.FC = () => {
	const navigate = useNavigate()
	const intl = useIntl()
	const { isUnlocked, isLoading } = useIsUnlocked()

	const [key, setKey] = useState<string>('')
	const [step, setStep] = useState<number>(0)

	useEffect(() => {
		if (!isLoading && !isUnlocked) navigate('/')
	}, [isUnlocked, isLoading])

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const evt = event.nativeEvent as InputEvent
		if (evt.isComposing) {
			return
		}

		setKey(event.target.value)
	}

	const handleSubmit = (): [Keystore, Data] => {
		const id = generateId()
		const keystore: Keystore = {
			id,
			name: '',
			type: KeystoreType.LOCAL,
		}
		const data = secretToData(DataType.PRIVATE_KEY, key)
		return [keystore, data]
	}

	const handleDone = () => navigate('/')

	switch (step) {
		case 2:
			return <Done onNext={handleDone} />
		case 1:
			return <KeystoreForm keystoreType={KeystoreType.LOCAL} onSubmit={handleSubmit} onNext={() => setStep(2)} />
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
