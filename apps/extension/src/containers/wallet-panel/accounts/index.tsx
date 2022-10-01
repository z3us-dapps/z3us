import React, { lazy, ReactNode, Suspense } from 'react'
import { useHashLocation } from '@src/hooks/use-hash-location'
import { AnimatedSwitch } from '@src/components/router-animated-switch'
import { RouterScope } from '@src/components/router-scope'
import { Route } from 'wouter'
import { Box } from 'ui/src/components/atoms'

const TokenList = lazy(() => import('./token-list'))
const Token = lazy(() => import('./token'))
const SendToken = lazy(() => import('./send-token'))
const DepositToken = lazy(() => import('./deposit-token'))
const AccountActivity = lazy(() => import('./account-activity'))

const AcounteRoute = ({ children }: { children: ReactNode }) => <Suspense fallback="Loading...">{children}</Suspense>

const TokenListRoute = () => (
	<AcounteRoute>
		<TokenList />
	</AcounteRoute>
)
const TokenRoute = () => (
	<AcounteRoute>
		<Token />
	</AcounteRoute>
)
const SendTokenRoute = () => (
	<AcounteRoute>
		<SendToken />
	</AcounteRoute>
)
const DepositTokenRoute = () => (
	<AcounteRoute>
		<DepositToken />
	</AcounteRoute>
)
const AccountActivityRoute = () => (
	<AcounteRoute>
		<AccountActivity />
	</AcounteRoute>
)

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
				<Route path="/account" component={TokenListRoute} />
				<Route path="/account/token/:rri" component={TokenRoute} />
				<Route path="/account/send" component={SendTokenRoute} />
				<Route path="/account/send/:rri" component={SendTokenRoute} />
				<Route path="/account/deposit" component={DepositTokenRoute} />
				<Route path="/account/deposit/:rri" component={DepositTokenRoute} />
				<Route path="/account/activity" component={AccountActivityRoute} />
			</AnimatedSwitch>
		</RouterScope>
	</Box>
)
