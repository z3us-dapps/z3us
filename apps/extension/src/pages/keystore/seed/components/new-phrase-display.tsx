import React, { useState } from 'react'
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
	download: {
		defaultMessage: 'Download',
		id: '5q3qC0',
	},
})

interface IProps {
	words: string[]
	onBack: () => void
	onNext: () => void
}

export const NewPhraseDisplay: React.FC<IProps> = ({ words, onBack, onNext }) => {
	const intl = useIntl()
	const [canContinue, setCanContinue] = useState<boolean>(false)

	const handleDownload = () => {
		const element = document.createElement('a')
		element.setAttribute(
			'href',
			`data:text/plain;charset=utf-8,${encodeURIComponent(words.map((w, i) => `${i + 1}. ${w}`).join('\n'))}`,
		)
		element.setAttribute('download', `seed-${Date.now()}.txt`)
		document.body.appendChild(element)

		element.click()

		document.body.removeChild(element)
		setCanContinue(true)
	}

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

			<Box className={styles.keystoreContinueBtnWrapper}>
				<Button
					onClick={handleDownload}
					sizeVariant="xlarge"
					styleVariant={!canContinue ? 'primary' : 'secondary'}
					fullWidth
				>
					{intl.formatMessage(messages.download)}
				</Button>
				<Button onClick={onNext} sizeVariant="xlarge" styleVariant="primary" fullWidth disabled={!canContinue}>
					{intl.formatMessage(messages.phrase_display_continue)}
				</Button>
			</Box>
		</Box>
	)
}

export default NewPhraseDisplay
