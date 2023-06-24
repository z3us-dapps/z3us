import { fontMono, fontSans } from '@/lib/fonts'
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import React, { useEffect } from 'react'

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => (
	<NextThemesProvider {...props}>
		<style>{`
			:root {
				--font-sans: ${fontSans.style.fontFamily};
				--font-mono: ${fontMono.style.fontFamily};
			}
		`}</style>
		{children}
	</NextThemesProvider>
)

export const ThemeProviderDarkClass = ({ children }: { children: any }) => {
	const { resolvedTheme } = useTheme()

	useEffect(() => {
		if (resolvedTheme === 'dark') {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
	}, [resolvedTheme])

	return children
}
