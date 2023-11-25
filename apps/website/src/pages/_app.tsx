import { ThemeProvider } from '@/context/theme-provider'
import '@/styles/global-style.css'
import React from 'react'

const App = ({ Component, pageProps }) => (
	<ThemeProvider>
		<Component {...pageProps} />
	</ThemeProvider>
)

export default App
