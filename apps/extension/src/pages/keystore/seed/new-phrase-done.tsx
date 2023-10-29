import React, { useEffect, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { ArrowLeftIcon } from 'ui/src/components/icons'
import { Text } from 'ui/src/components/typography'
import { Z3usLogoLarge } from 'ui/src/components/z3us-logo-babylon'
import { useSharedStore } from 'ui/src/hooks/use-store'
import { KeystoreType } from 'ui/src/store/types'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createMnemonic, secretToData } from '@src/crypto/secret'
import { useIsUnlocked } from '@src/hooks/use-is-unlocked'

import * as styles from './styles.css'

const messages = defineMessages({
	phrase_done_title: {
		defaultMessage: 'You’re all done',
		id: 'kwYgvL',
	},
	phrase_done_sub_title: {
		defaultMessage: 'You can now fully enjoy your wallet.',
		id: 'kDP2Gx',
	},
	phrase_done_button: {
		defaultMessage: 'Get started',
		id: '/aBLH2',
	},
})

export const NewPhraseDone: React.FC = () => {
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

	return (
		<Box className={styles.keystoreNewWrapper}>
			<Box display="flex" width="full" justifyContent="center" paddingY="large">
				<Z3usLogoLarge fillPurple />
			</Box>
			<Box className={styles.keystoreNewTextWrapper}>
				<Text size="xxlarge" weight="strong" color="strong">
					{intl.formatMessage(messages.phrase_done_title)}
				</Text>
				<Text>{intl.formatMessage(messages.phrase_done_sub_title)}</Text>
			</Box>
			<Button onClick={() => {}} sizeVariant="xlarge" styleVariant="primary" fullWidth>
				{intl.formatMessage(messages.phrase_done_button)}
			</Button>
		</Box>
	)
}

export default NewPhraseDone
