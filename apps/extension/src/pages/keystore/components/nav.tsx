import { Button } from 'packages/ui/src/components/button'
import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'

const messages = defineMessages({
	back: {
		id: 'keystore.nav.back',
		defaultMessage: 'Back',
	},
})

const Nav: React.FC = () => {
	const intl = useIntl()
	const navigate = useNavigate()

	return <Button onClick={() => navigate(-1)}>{intl.formatMessage(messages.back)}</Button>
}

export default Nav
