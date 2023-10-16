import React, { useMemo } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { PageMenu } from 'ui/src/components/navigation/page-menu'

const messages = defineMessages({
	home: {
		id: 'DtYelJ',
		defaultMessage: 'Transfer',
	},
	raw: {
		id: '3Rx6Qo',
		defaultMessage: 'Advanced',
	},
	deploy: {
		id: '2UvVKh',
		defaultMessage: 'Deploy package',
	},
})

const Navigation: React.FC = () => {
	const intl = useIntl()

	const menu = useMemo(
		() => [
			{
				title: intl.formatMessage(messages.home),
				href: '/transfer',
			},
			// {
			//   title: intl.formatMessage(messages.deploy),
			//   href: '/transfer/deploy',
			// },
			{
				title: intl.formatMessage(messages.raw),
				href: '/transfer/raw',
			},
		],
		[intl, messages],
	)

	return <PageMenu menu={menu} />
}

export default Navigation
