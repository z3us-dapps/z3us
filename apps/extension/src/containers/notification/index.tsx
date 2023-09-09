import React, { Suspense, lazy } from 'react'
import { Route } from 'wouter'

import { Loader } from '@src/components/loader'
import { RouterScope } from '@src/components/router-scope'
import UnlockedPanel from '@src/components/unlocked-panel'
import { useHashLocation } from '@src/hooks/use-hash-location'

const Connect = lazy(() => import('./connect'))
const Encrypt = lazy(() => import('./encrypt'))
const Decrypt = lazy(() => import('./decrypt'))
const Sign = lazy(() => import('./sign'))
const Transaction = lazy(() => import('./transaction'))

export const Notification: React.FC = () => (
	<UnlockedPanel css={{ display: 'flex', flexDirection: 'column' }}>
		<RouterScope base="/notification" hook={useHashLocation}>
			<Suspense fallback={<Loader />}>
				<Route path="/connect/:id" component={Connect} />
				<Route path="/encrypt/:id" component={Encrypt} />
				<Route path="/decrypt/:id" component={Decrypt} />
				<Route path="/sign/:id" component={Sign} />
				<Route path="/transaction/:id" component={Transaction} />
			</Suspense>
		</RouterScope>
	</UnlockedPanel>
)

export default Notification