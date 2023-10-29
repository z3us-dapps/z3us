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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createMnemonic, secretToData } from '@src/crypto/secret'
import { useIsUnlocked } from '@src/hooks/use-is-unlocked'

import * as styles from './styles.css'

const messages = defineMessages({
	phrase_display_title: {
		defaultMessage: 'Secret recovery phrase',
		id: 'wLQ/u0',
	},
	phrase_display_sub_title: {
		defaultMessage: 'This phrase is the ONLY way to recover your wallet. Keep it secure!',
		id: '/2tD2/',
	},
	phrase_display_continue: {
		defaultMessage: 'Continue',
		id: 'acrOoz',
	},
})

export const NewPhraseDisplay: React.FC = () => {
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
			<Button onClick={() => navigate(-1)} styleVariant="ghost" sizeVariant="small" iconOnly>
				<ArrowLeftIcon />
			</Button>
			<Box className={styles.keystoreNewTextWrapper}>
				<Text size="xxlarge" weight="strong" color="strong">
					{intl.formatMessage(messages.phrase_display_title)}
				</Text>
				<Text>{intl.formatMessage(messages.phrase_display_sub_title)}</Text>
			</Box>
			<Box className={styles.keystoreNewPhraseGridWrapper}>
				{mnemonic.split(' ').map((word, i) => (
					<Box key={word} className={styles.keystoreInputBlurWrapper}>
						<Input
							styleVariant="secondary"
							sizeVariant="large"
							disabled
							leftIcon={
								<Box>
									<Text>{i + 1}.</Text>
								</Box>
							}
						/>
						<Box className={styles.keystoreInputBlurWordWrapper}>
							<Text>{word}</Text>
						</Box>
					</Box>
				))}
			</Box>
			<Button onClick={() => {}} sizeVariant="xlarge" styleVariant="primary" fullWidth>
				{intl.formatMessage(messages.phrase_display_continue)}
			</Button>
		</Box>
	)
}

export default NewPhraseDisplay
