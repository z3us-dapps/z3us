import type { LedgerDevice } from '@radixdlt/connector-extension/src/ledger/schemas'
import React, { useEffect, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { ArrowLeftIcon } from 'ui/src/components/icons'
import { Text } from 'ui/src/components/typography'
import { useSharedStore } from 'ui/src/hooks/use-store'
import { KeystoreType } from 'ui/src/store/types'

import { secretToData } from '@src/crypto/secret'
import { useIsUnlocked } from '@src/hooks/use-is-unlocked'
import { useLedgerClient } from '@src/hooks/use-ledger-client'
import type { Data } from '@src/types/vault'
import { DataType } from '@src/types/vault'

import Done from '../components/done'
import KeystoreForm from '../components/keystore-form'
import * as styles from './styles.css'

const messages = defineMessages({
	hardware_wallet_title: {
		id: 'iarOLy',
		defaultMessage: 'Connect hardware ledger device',
	},
	hardware_wallet_sub_title: {
		id: 'NgajQk',
		defaultMessage: 'Click connect and follow the prompts to connect device.',
	},
	connect: {
		id: 'cotGK8',
		defaultMessage: 'Connect device',
	},
	info: {
		id: 'AsESAY',
		defaultMessage: 'Do not close this tab and continue with the device in another one, we will come back here later.',
	},
})

export const New: React.FC = () => {
	const intl = useIntl()
	const navigate = useNavigate()
	const client = useLedgerClient()
	const { isUnlocked, isLoading: isLoadingUnlocked } = useIsUnlocked()
	const { keystore, changeKeystoreLedgerDevice } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
		changeKeystoreLedgerDevice: state.changeKeystoreLedgerDeviceAction,
	}))

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [device, setDevice] = useState<LedgerDevice>()
	const [step, setStep] = useState<number>(0)

	useEffect(() => {
		if (keystore?.type !== KeystoreType.HARDWARE) {
			navigate('/')
		}
	}, [keystore])

	useEffect(() => {
		if (!isLoadingUnlocked && !isUnlocked) navigate('/')
	}, [isUnlocked, isLoadingUnlocked])

	useEffect(() => {
		if (step === 0 && device) setStep(1)
	}, [device])

	const handleGetDeviceInfo = async () => {
		setIsLoading(true)
		try {
			setDevice(await client.getDeviceInfo())
		} finally {
			setIsLoading(false)
		}
	}

	const handleSubmit = (): Data => {
		changeKeystoreLedgerDevice(keystore.id, device)
		return secretToData(DataType.STRING, JSON.stringify(device))
	}

	const handleDone = () => navigate('/')

	switch (step) {
		case 2:
			return <Done onNext={handleDone} />
		case 1:
			return <KeystoreForm keystoreType={KeystoreType.HARDWARE} onSubmit={handleSubmit} onNext={() => setStep(2)} />
		default:
			return (
				<Box className={styles.hardwareWalletWrapper}>
					<Button onClick={() => navigate(-1)} styleVariant="ghost" sizeVariant="small" iconOnly>
						<ArrowLeftIcon />
					</Button>
					<Box className={styles.hardwareWalletTextWrapper}>
						<Text color="strong" size="xxlarge" weight="strong">
							{intl.formatMessage(messages.hardware_wallet_title)}
						</Text>
						<Text>{intl.formatMessage(messages.hardware_wallet_sub_title)}</Text>
					</Box>
					<Button
						onClick={handleGetDeviceInfo}
						styleVariant="primary"
						sizeVariant="xlarge"
						fullWidth
						disabled={isLoading}
						loading={isLoading}
					>
						{intl.formatMessage(messages.connect)}
					</Button>
					{isLoading && intl.formatMessage(messages.info)}
				</Box>
			)
	}
}

export default New
