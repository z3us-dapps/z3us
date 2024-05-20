import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
import React, { useContext, useEffect, useState } from 'react'

import { darkThemeClass, lightThemeClass } from 'ui/src/theme/theme.css'

import { LandingPage } from './components/landing-page'
import { WebsiteDappContext, WebsiteDappContextProvider } from './website-dapp-context'

// const AppPage = dynamic(() => import('../app-page'), { ssr: false })

export const IndexPage: React.FC = () => {
	const { isDappVisible, isDappReadyToPreload } = useContext(WebsiteDappContext)
	const [Component, setComponent] = useState<any>(null)
	const { resolvedTheme } = useTheme()

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

	// TODO: remove this when we have light theme for website
	useEffect(() => {
		setTimeout(() => {
			if (!isDappVisible) {
				document.documentElement.classList.add(darkThemeClass)
				document.documentElement.classList.add('dark')
			} else if (resolvedTheme === 'light') {
				document.documentElement.classList.remove('dark')
				document.documentElement.classList.add(lightThemeClass)
				document.documentElement.classList.remove(darkThemeClass)
			}
		}, 50)
	}, [isDappVisible])

	if (isDappVisible) {
		return <Component />
	}

	return <LandingPage />
}

export const IndexHomePage: React.FC = () => (
	<WebsiteDappContextProvider>
		<IndexPage />
	</WebsiteDappContextProvider>
)
