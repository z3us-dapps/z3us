import React, { useMemo } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Home2Icon, Settings2Icon, SwitchHorizontal } from 'ui/src/components/icons'

const messages = defineMessages({
	accounts: {
		id: 'FvanT6',
		defaultMessage: 'Accounts',
	},
	transfer: {
		id: 'DtYelJ',
		defaultMessage: 'Transfer',
	},
	staking: {
		id: '+14VoL',
		defaultMessage: 'Staking',
	},
	airdrop: {
		id: 'UCBwbC',
		defaultMessage: 'Airdrop',
	},
	settings: {
		id: 'D3idYv',
		defaultMessage: 'Settings',
	},
})

export const useMenuItems = () => {
	const intl = useIntl()

	return useMemo(
		() => [
			{ text: intl.formatMessage(messages.accounts), href: '/accounts', icon: <Home2Icon /> },
			{ text: intl.formatMessage(messages.transfer), href: '/transfer', icon: <SwitchHorizontal /> },
			// { text: intl.formatMessage(messages.staking), href: '/staking', icon: <StakingIcon /> },
			// { text: intl.formatMessage(messages.airdrop), href: '/airdrop', icon: <CoinsIcon /> },
			{ text: intl.formatMessage(messages.settings), href: '/settings', icon: <Settings2Icon /> },
		],
		[intl],
	)
}
