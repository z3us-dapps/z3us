import { NextButton } from '@/components/next-button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import { Box } from 'ui/src/components/box'
import { Text } from 'ui/src/components/typography'

import * as styles from './styles.css'

export const DownloadButton: React.FC = () => {
	const [buttonText, setButtonText] = useState<string>('Download for chrome')
	const [buttonImage, setButtonImage] = useState<string>('google-chrome-logo.png')
	const [buttonLink, setButtonLink] = useState<string>(
		'https://chrome.google.com/webstore/detail/z3us/icpikagpkkbldbfjlbefnmmmcohbjije',
	)

	useEffect(() => {
		const isFirefoxBrowser = navigator.userAgent.toLowerCase().includes('firefox')

		if (isFirefoxBrowser) {
			setButtonText('Download for Firefox')
			setButtonImage('google-firefox-logo.png')
			setButtonLink('https://addons.mozilla.org/en-US/firefox/addon/z3us/')
		}
	}, [])

	return (
		<NextButton
			rounded
			sizeVariant="xlarge"
			styleVariant="primary"
			to={buttonLink}
			target="_blank"
			leftIcon={
				<Box className={styles.landingCalloutButtonIcon}>
					<Image priority src={`/landing-page-2023/${buttonImage}`} width={20} height={20} alt="Chrome logo" />
				</Box>
			}
		>
			<Box paddingRight="small">
				<Text color="strong" weight="strong" size="large">
					{buttonText}
				</Text>
			</Box>
		</NextButton>
	)
}
