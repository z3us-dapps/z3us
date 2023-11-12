import dynamic from 'next/dynamic'
import React, { useContext, useEffect, useState } from 'react'

import { LandingPage } from './components/landing-page'
import { WebsiteDappContext, WebsiteDappContextProvider } from './website-dapp-context'

// const AppPage = dynamic(() => import('../app-page'), { ssr: false })

export const IndexPage: React.FC = () => {
	const { isDappVisible, isDappReadyToPreload } = useContext(WebsiteDappContext)

	const [Component, setComponent] = useState<any>(null)

	useEffect(() => {
		if (isDappReadyToPreload) {
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
