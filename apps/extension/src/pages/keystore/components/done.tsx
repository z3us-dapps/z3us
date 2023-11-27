import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Z3usLogoLarge } from 'ui/src/components/z3us-logo-babylon'
import { useSharedStore } from 'ui/src/hooks/use-store'
import { KeystoreType } from 'ui/src/store/types'

import { useAddAccount } from '@src/hooks/use-add-account'

import * as styles from '../seed/styles.css'
import { Title } from './title'

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
		if (keystore && keystore.type !== KeystoreType.RADIX_WALLET && keystore.type !== KeystoreType.COMBINED) {
			addAccount('', false, keystore.id)
		}
		onNext()
	}

	return (
		<Box className={styles.keystoreNewWrapper}>
			<Box display="flex" width="full" justifyContent="center" paddingY="large">
				<Z3usLogoLarge fillPurple />
			</Box>
			<Title
				title={intl.formatMessage(messages.phrase_done_title)}
				subTitle={intl.formatMessage(messages.phrase_done_sub_title)}
			/>
			<Button onClick={handleNext} sizeVariant="xlarge" styleVariant="primary" fullWidth>
				{intl.formatMessage(messages.phrase_done_button)}
			</Button>
		</Box>
	)
}

export default Done
