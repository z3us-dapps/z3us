import { RdtProvider } from '@/components/RdtProvider'
import { ThemeProvider } from '@/components/theme-provider'
import '@/styles/global-style.css'
import { RadixDappToolkit } from '@radixdlt/radix-dapp-toolkit'
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
			<RdtProvider
				value={RadixDappToolkit(
					{
						dAppName: 'zgod',
						dAppDefinitionAddress: 'account_tdx_c_1pxdceeqqfh9m4mt45cc0tqntyc5n87y4ze02p002yweq2y94zg',
					},
					requestData => {
						requestData({
							accounts: { quantifier: 'atLeast', quantity: 1 },
						})
					},
					{
						networkId: 12,
					},
				)}
			>
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
			</RdtProvider>
		</div>
	)
}
export default App
