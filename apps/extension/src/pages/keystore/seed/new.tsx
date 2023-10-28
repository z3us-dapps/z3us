import React, { useEffect, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { ArrowLeftIcon, HardwareWalletIcon, HomeIcon, Z3usIcon } from 'ui/src/components/icons'
import { Text } from 'ui/src/components/typography'
import { useSharedStore } from 'ui/src/hooks/use-store'
import { KeystoreType } from 'ui/src/store/types'

import { createMnemonic, secretToData } from '@src/crypto/secret'
import { useIsUnlocked } from '@src/hooks/use-is-unlocked'
import type { Data } from '@src/types/vault'
import { DataType } from '@src/types/vault'

import KeystoreForm from '../components/keystore-form'
import * as styles from './styles.css'

const messages = defineMessages({
	create_new_wallet: {
		defaultMessage: 'Create a new wallet',
		id: 'wx278L',
	},
	create_new_wallet_sub_title: {
		defaultMessage: 'The password will be used to unlock your wallet.',
		id: 'a4CP1S',
	},
})

export const New: React.FC = () => {
	const intl = useIntl()
	const navigate = useNavigate()
	const { isUnlocked, isLoading } = useIsUnlocked()
	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))

	const [mnemonic, setMnemonic] = useState<string>('')

	useEffect(() => {
		if (keystore?.type !== KeystoreType.LOCAL) navigate('/')
	}, [keystore])

	useEffect(() => {
		if (!isLoading && !isUnlocked) navigate('/')
	}, [isUnlocked, isLoading])

	useEffect(() => {
		if (!mnemonic) setMnemonic(createMnemonic())
	}, [])

	const handleSubmit = (): Data => secretToData(DataType.MNEMONIC, mnemonic)

	return (
		<Box className={styles.keystoreNewWrapper}>
			<Button onClick={() => navigate(-1)} styleVariant="ghost" sizeVariant="small" iconOnly>
				<ArrowLeftIcon />
			</Button>
			<Box className={styles.keystoreNewTextWrapper}>
				<Text size="xxlarge" weight="strong" color="strong">
					{intl.formatMessage(messages.create_new_wallet)}
				</Text>
				<Text>{intl.formatMessage(messages.create_new_wallet_sub_title)}</Text>
			</Box>
			{/* <Text>{mnemonic}</Text> */}
			{mnemonic && <KeystoreForm keystoreType={KeystoreType.LOCAL} onSubmit={handleSubmit} />}
		</Box>
	)
}

export default New
