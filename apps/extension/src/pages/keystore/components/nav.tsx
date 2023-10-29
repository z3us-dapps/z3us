import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Z3usLogoText } from 'ui/src/components/z3us-logo-babylon'

import * as styles from './styles.css'

const messages = defineMessages({
	back: {
		id: 'cyR7Kh',
		defaultMessage: 'Back',
	},
})

const Nav: React.FC = () => {
	const intl = useIntl()
	const navigate = useNavigate()

	return (
		<Box className={styles.onboardingNavWrapper}>
			<Box display="flex" position="relative">
				<Z3usLogoText />
				{/* TODO: remove temp button */}
				<Box style={{ position: 'absolute', top: '-5px', left: '-75px', opacity: 0 }}>
					<Button onClick={() => navigate(-1)} styleVariant="ghost" sizeVariant="small">
						{intl.formatMessage(messages.back)}
					</Button>
				</Box>
			</Box>
		</Box>
	)
}

export default Nav
