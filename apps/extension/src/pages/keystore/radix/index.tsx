// import { Pairing } from '@radixdlt/connector-extension/src/pairing/pairing'
import React, { useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { KeystoreType } from 'ui/src/store/types'

import type { Data } from '@src/types/vault'
import { DataType } from '@src/types/vault'

import Done from '../components/done'
import KeystoreForm from '../components/keystore-form'
import { Title } from '../components/title'
import { Pairing } from './components/pairing'
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

	const [publicKey, setPublicKey] = useState<string>()
	const [step, setStep] = useState<number>(0)

	const handleSubmit = (): Data => ({
		type: DataType.STRING,
		secret: publicKey,
	})

	const handleDone = () => navigate('/')

	const handlePair = (pk: string) => {
		setPublicKey(pk)
		setStep(1)
	}

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
			return <Pairing onPair={handlePair} />
	}
}

export default Radix
