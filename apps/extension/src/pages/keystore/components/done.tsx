import { useSharedStore } from 'packages/ui/src/hooks/use-store'
import { KeystoreType } from 'packages/ui/src/store/types'
import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Text } from 'ui/src/components/typography'
import { Z3usLogoLarge } from 'ui/src/components/z3us-logo-babylon'

import { useAddAccount } from '@src/hooks/use-add-account'

import * as styles from '../seed/styles.css'

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

interface IProps {
	onNext: () => void
}

export const Done: React.FC<IProps> = ({ onNext }) => {
	const intl = useIntl()
	const addAccount = useAddAccount()
	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))

	const handleNext = () => {
		if (keystore?.type && keystore.type !== KeystoreType.RADIX_WALLET) addAccount()
		onNext()
	}

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
			<Button onClick={handleNext} sizeVariant="xlarge" styleVariant="primary" fullWidth>
				{intl.formatMessage(messages.phrase_done_button)}
			</Button>
		</Box>
	)
}

export default Done
