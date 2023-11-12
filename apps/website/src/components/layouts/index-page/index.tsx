import dynamic from 'next/dynamic'
import React, { useContext, useEffect, useState } from 'react'

import { LandingPage } from './components/landing-page'
import { WebsiteDappContext, WebsiteDappContextProvider } from './website-dapp-context'

// const AppPage = dynamic(() => import('../app-page'), { ssr: false })

export const IndexPage: React.FC = () => {
	const { isDappVisible, isDappReadyToPreload } = useContext(WebsiteDappContext)
	const [Component, setComponent] = useState<any>(null)

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const loadComponent = async () => {
		const component = (await import('../app-page')).default
		setComponent(component)
	}

	useEffect(() => {
		if (isDappReadyToPreload || isDappVisible) {
			// TODO: loading using `loadComponent` will instantly preload, as opposed to using dynamic, but need to resolve error
			// loadComponent()

			setComponent(dynamic(() => import('../app-page')))
		}
	}, [isDappReadyToPreload])

	if (isDappVisible) {
		return <Component />
	}

	return <LandingPage />
}

export const IndexPageTest: React.FC = () => (
	<WebsiteDappContextProvider>
		<IndexPage />
	</WebsiteDappContextProvider>
)
