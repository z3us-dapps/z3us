import { ThemeProvider } from '@/context/theme-provider'
import '@/styles/global-style.css'
import React from 'react'

const App = ({ Component, pageProps }) => (
	<div suppressHydrationWarning>
		<ThemeProvider>
			<Component {...pageProps} />
		</ThemeProvider>
	</div>
)

export default App
