// import { Paring } from '@radixdlt/connector-extension/src/pairing/pairing'
import React, { useEffect, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'
import browser from 'webextension-polyfill'

import { Box } from 'ui/src/components/box'
import { Text } from 'ui/src/components/typography'
import { KeystoreType } from 'ui/src/store/types'

import type { Data } from '@src/types/vault'
import { DataType } from '@src/types/vault'

import Done from '../components/done'
import KeystoreForm from '../components/keystore-form'
import { Title } from '../components/title'
import { PASSWORD_STORAGE_KEY, Pairing, PairingState } from './components/pairing'
import * as styles from './styles.css'

const messages = defineMessages({
	hardware_wallet_complete_title: {
		defaultMessage: 'Create a new wallet',
		id: 'wx278L',
	},
	hardware_wallet_complete_sub_title: {
		defaultMessage: 'The password will be used to unlock your wallet.',
		id: 'a4CP1S',
	},
})

export const Radix: React.FC = () => {
	const intl = useIntl()
	const navigate = useNavigate()

	const [pairingState, setPairingState] = useState<PairingState>(PairingState.LOADING)
	const [connectionPassword, setConnectionPassword] = useState<string>('')
	const [step, setStep] = useState<number>(0)

	useEffect(() => {
		browser.storage.local.remove(PASSWORD_STORAGE_KEY)
	}, [])

	useEffect(() => {
		if (step === 0 && pairingState === PairingState.PAIRED) setStep(1)
	}, [pairingState])

	const handleSubmit = (): Data => ({
		type: DataType.STRING,
		secret: connectionPassword,
	})

	const handleDone = () => navigate('/')

	switch (step) {
		case 2:
			return <Done onNext={handleDone} />

		case 1:
			return (
				<Box className={styles.pairingWrapper}>
					<Title
						title={intl.formatMessage(messages.hardware_wallet_complete_title)}
						subTitle={intl.formatMessage(messages.hardware_wallet_complete_sub_title)}
					/>
					<KeystoreForm keystoreType={KeystoreType.RADIX_WALLET} onSubmit={handleSubmit} onNext={() => setStep(2)} />
				</Box>
			)
		default:
			return (
				<Pairing
					pairingState={pairingState}
					connectionPassword={connectionPassword}
					onPairingStateChange={setPairingState}
					onConnectionPasswordChange={setConnectionPassword}
				/>
			)
	}
}

export default Radix
