import { StateKeyValueStoreDataRequestAllOfFromJSONTyped } from '@radixdlt/babylon-gateway-api-sdk'
import React, { useEffect, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { ArrowLeftIcon } from 'ui/src/components/icons'
import { Input } from 'ui/src/components/input'
import { Text } from 'ui/src/components/typography'
import { useSharedStore } from 'ui/src/hooks/use-store'
import { KeystoreType } from 'ui/src/store/types'

import { secretToData } from '@src/crypto/secret'
import type { Data } from '@src/types/vault'
import { DataType } from '@src/types/vault'

import Done from '../components/done'
import KeystoreForm from '../components/keystore-form'
import * as styles from './styles.css'

const messages = defineMessages({
	seed_restore_title: {
		defaultMessage: 'Restore from seed phrase',
		id: '6I8Iyd',
	},
	seed_restore_sub_title: {
		defaultMessage: 'This phrase is the ONLY way to recover your wallet. Keep it secure!',
		id: '/2tD2/',
	},
	seed_restore_continue: {
		defaultMessage: 'Continue',
		id: 'acrOoz',
	},
})

export const New: React.FC = () => {
	const intl = useIntl()
	const navigate = useNavigate()
	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))

	const [mnemonic, setMnemonic] = useState<string>('')
	const [step, setStep] = useState<number>(0)

	useEffect(() => {
		if (keystore?.type !== KeystoreType.LOCAL) {
			navigate('/')
		}
	}, [keystore])

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const evt = event.nativeEvent as InputEvent
		if (evt.isComposing) {
			return
		}

		setMnemonic(event.target.value)
	}

	const handleSubmit = (): Data => secretToData(DataType.MNEMONIC, mnemonic)

	const handleDone = () => navigate('/')

	const words = ['', '', '', '', '', '', '', '', '', '', '', '']

	switch (step) {
		case 2:
			return <Done onNext={handleDone} />
		case 1:
			return <KeystoreForm keystoreType={KeystoreType.LOCAL} onSubmit={handleSubmit} onNext={() => setStep(2)} />
		default:
			return (
				<Box className={styles.keystoreNewWrapper}>
					<Button onClick={() => navigate(-1)} styleVariant="ghost" sizeVariant="small" iconOnly>
						<ArrowLeftIcon />
					</Button>
					<Box className={styles.keystoreNewTextWrapper}>
						<Text color="strong" size="xxlarge" weight="strong">
							{intl.formatMessage(messages.seed_restore_title)}
						</Text>
						<Text>{intl.formatMessage(messages.seed_restore_sub_title)}</Text>
					</Box>

					<Box className={styles.keystoreRestoreWrapper}>
						<Box className={styles.keystoreRestoreGridWrapper}>
							{words.map((word, i) => (
								<Box key={word}>
									<Input
										styleVariant="secondary"
										sizeVariant="large"
										leftIconClassName={styles.keystoreRestoreInputClassWrapper}
										leftIcon={
											<Box>
												<Text>{i + 1}.</Text>
											</Box>
										}
									/>
								</Box>
							))}
						</Box>
					</Box>

					{/* TODO: remove */}
					{/* <Input value={mnemonic} elementType="textarea" type="textarea" onChange={handleChange} /> */}

					<Button onClick={() => setStep(1)} sizeVariant="xlarge" styleVariant="primary" fullWidth disabled={!mnemonic}>
						{intl.formatMessage(messages.seed_restore_continue)}
					</Button>
				</Box>
			)
	}
}

export default New
