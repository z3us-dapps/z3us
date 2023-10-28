import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Link } from 'ui/src/components/router-link'
import { Z3usLogoText } from 'ui/src/components/z3us-logo-babylon'

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
		<Box display="flex" justifyContent="center" paddingY="large">
			<Box display="flex" position="relative">
				<Link to="/">
					<Z3usLogoText />
				</Link>
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
