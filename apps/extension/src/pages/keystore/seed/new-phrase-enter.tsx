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
	phrase_enter_title: {
		defaultMessage: 'Verify recovery phrase',
		id: 'RTnITK',
	},
	phrase_enter_sub_title: {
		defaultMessage: 'Select each recovery phrase word below in their correct order.',
		id: 'u0lsey',
	},
	phrase_display_continue: {
		defaultMessage: 'Continue',
		id: 'acrOoz',
	},
})

export const NewPhraseEnter: React.FC = () => {
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
					{intl.formatMessage(messages.phrase_enter_title)}
				</Text>
				<Text>{intl.formatMessage(messages.phrase_enter_sub_title)}</Text>
			</Box>
			<Box className={styles.keystoreNewPhraseGridButtonWrapper}>
				{Array.from({ length: 12 }, (_, i) => (
					<Box key={i}>
						<Button fullWidth sizeVariant="xsmall" styleVariant="tertiary" rounded>
							zero
						</Button>
					</Box>
				))}
			</Box>
			<Box className={styles.keystoreNewPhraseGridWrapper}>
				{Array.from({ length: 12 }, (_, i) => (
					<Box key={i}>
						<Input
							styleVariant="secondary"
							sizeVariant="large"
							leftIcon={
								<Box>
									<Text>{i + 1}.</Text>
								</Box>
							}
						/>
					</Box>
				))}
			</Box>

			<Button onClick={() => {}} sizeVariant="xlarge" styleVariant="primary" fullWidth>
				{intl.formatMessage(messages.phrase_display_continue)}
			</Button>
		</Box>
	)
}

export default NewPhraseEnter
