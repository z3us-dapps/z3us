import React from 'react'
import { useHashLocation } from '@src/hooks/use-hash-location'
import { AnimatedSwitch } from '@src/components/router-animated-switch'
import { RouterScope } from '@src/components/router-scope'
import { Route } from 'wouter'
import { Box } from 'ui/src/components/atoms'
import { TokenList } from './token-list'
import { Token } from './token'
import { SendToken } from './send-token'
import { AccountActivity } from './account-activity'
import { DepositToken } from './deposit-token'

export const Accounts: React.FC = () => (
	<Box
		css={{
			position: 'absolute',
			width: '100%',
			height: '100%',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'flex-end',
		}}
	>
		<RouterScope base="/wallet" hook={useHashLocation as any}>
			<AnimatedSwitch>
				<Route path="/account" component={TokenList} />
				<Route path="/account/token/:rri" component={Token} />
				<Route path="/account/send" component={SendToken} />
				<Route path="/account/send/:rri" component={SendToken} />
				<Route path="/account/deposit" component={DepositToken} />
				<Route path="/account/deposit/:rri" component={DepositToken} />
				<Route path="/account/activity" component={AccountActivity} />
			</AnimatedSwitch>
		</RouterScope>
	</Box>
)
