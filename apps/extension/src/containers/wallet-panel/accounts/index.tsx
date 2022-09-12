import React, { lazy, Suspense } from 'react'
import { useHashLocation } from '@src/hooks/use-hash-location'
import { AnimatedSwitch } from '@src/components/router-animated-switch'
import { Loader } from '@src/components/loader'
import { RouterScope } from '@src/components/router-scope'
import { Route } from 'wouter'
import { Box } from 'ui/src/components/atoms'

const TokenList = lazy(() => import('./token-list'))
const Token = lazy(() => import('./token'))
const SendToken = lazy(() => import('./send-token'))
const DepositToken = lazy(() => import('./deposit-token'))
const AccountActivity = lazy(() => import('./account-activity'))

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
			<Suspense fallback={Loader}>
				<AnimatedSwitch>
					<Route path="/account" component={TokenList} />
					<Route path="/account/token/:rri" component={Token} />
					<Route path="/account/send" component={SendToken} />
					<Route path="/account/send/:rri" component={SendToken} />
					<Route path="/account/deposit" component={DepositToken} />
					<Route path="/account/deposit/:rri" component={DepositToken} />
					<Route path="/account/activity" component={AccountActivity} />
				</AnimatedSwitch>
			</Suspense>
		</RouterScope>
	</Box>
)
