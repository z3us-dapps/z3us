import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { ArrowLeftIcon } from 'ui/src/components/icons'
import SeedPhraseDisplay from 'ui/src/components/seed-phrase-display'

import { Title } from '../../components/title'
import * as styles from '../styles.css'

const messages = defineMessages({
	phrase_display_title: {
		defaultMessage: 'Secret recovery phrase',
		id: 'wLQ/u0',
	},
	phrase_display_sub_title: {
		defaultMessage:
			'This phrase is the ONLY way to recover your wallet. Keep it secure! Hover over the word to reveal and write it down.',
		id: 'M+5Wvf',
	},
	phrase_display_continue: {
		defaultMessage: 'Continue',
		id: 'acrOoz',
	},
})

interface IProps {
	words: string[]
	onBack: () => void
	onNext: () => void
}

export const NewPhraseDisplay: React.FC<IProps> = ({ words, onBack, onNext }) => {
	const intl = useIntl()

	return (
		<Box className={styles.keystoreNewWrapper}>
			<Button onClick={onBack} styleVariant="ghost" sizeVariant="small" iconOnly>
				<ArrowLeftIcon />
			</Button>
			<Title
				title={intl.formatMessage(messages.phrase_display_title)}
				subTitle={intl.formatMessage(messages.phrase_display_sub_title)}
			/>
			<SeedPhraseDisplay words={words} />
			<Button onClick={onNext} sizeVariant="xlarge" styleVariant="primary" fullWidth>
				{intl.formatMessage(messages.phrase_display_continue)}
			</Button>
		</Box>
	)
}

export default NewPhraseDisplay
