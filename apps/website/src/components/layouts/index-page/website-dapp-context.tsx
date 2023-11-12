import type { Context, PropsWithChildren } from 'react'
import { createContext, useMemo, useState } from 'react'

export type WebsiteDappState = {
	isDappVisible: boolean
	isDappReadyToPreload: boolean
	setDappVisible: (isVisible: boolean) => void
}

export const WebsiteDappContext: Context<WebsiteDappState> = createContext<WebsiteDappState>({
	isDappVisible: false,
	isDappReadyToPreload: false,
	setDappVisible: () => {},
})

export const WebsiteDappContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [isVisible, setIsVisible] = useState<boolean>(false)
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [isPreloadReady, setIsPreloadReady] = useState<boolean>(true)

	const handleThemeChange = (_isVisible: boolean) => {
		setIsVisible(_isVisible)
	}

	const ctx = useMemo(
		(): WebsiteDappState => ({
			isDappVisible: isVisible,
			isDappReadyToPreload: isPreloadReady,
			setDappVisible: handleThemeChange,
		}),
		[isVisible],
	)

	return <WebsiteDappContext.Provider value={ctx}>{children}</WebsiteDappContext.Provider>
}
