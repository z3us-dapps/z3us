import React, { useMemo } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useMatch } from 'react-router-dom'

import { Home2Icon, Settings2Icon, Swap2Icon, SwitchHorizontal } from 'ui/src/components/icons'

const messages = defineMessages({
	accounts: {
		id: 'FvanT6',
		defaultMessage: 'Accounts',
	},
	transfer: {
		id: 'DtYelJ',
		defaultMessage: 'Transfer',
	},
	swap: {
		id: 's8BnAC',
		defaultMessage: 'Swap',
	},
	settings: {
		id: 'D3idYv',
		defaultMessage: 'Settings',
	},
})

const matchActiveFn =
	({ isActive }) =>
	() =>
		isActive

export const useMenuItems = () => {
	const intl = useIntl()
	const isSwapMatch = useMatch('/transfer/swap')

	return useMemo(
		() => [
			{ text: intl.formatMessage(messages.accounts), href: '/accounts', icon: <Home2Icon />, matchActiveFn },
			{
				text: intl.formatMessage(messages.transfer),
				href: '/transfer',
				icon: <SwitchHorizontal />,
				matchActiveFn:
					({ isActive }) =>
					() =>
						isActive && isSwapMatch === null,
			},
			{
				text: intl.formatMessage(messages.swap),
				href: '/transfer/swap',
				icon: <Swap2Icon />,
				end: true,
				matchActiveFn,
			},
			{ text: intl.formatMessage(messages.settings), href: '/settings', icon: <Settings2Icon />, matchActiveFn },
		],
		[intl, isSwapMatch],
	)
}
