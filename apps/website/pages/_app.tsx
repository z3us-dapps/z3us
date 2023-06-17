import { ThemeProvider } from '@/components/theme-provider'
import '@/styles/global-style.css'
import React, { useEffect, useState } from 'react'

import { darkThemeClass } from 'ui/src/components-v2/system/theme.css'

// eslint-disable-next-line react/function-component-definition
function App({ Component, pageProps }) {
	const [isServer, setIsServer] = useState<boolean>(true)
	useEffect(() => {
		setIsServer(false)
	}, [])
	if (isServer) return null

	return (
		<div suppressHydrationWarning>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				value={{
					light: 'light',
					dark: darkThemeClass,
				}}
			>
				{typeof window === 'undefined' ? null : <Component {...pageProps} />}
			</ThemeProvider>
		</div>
	)
}
export default App
