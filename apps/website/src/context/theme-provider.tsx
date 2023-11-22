import { fontMono, fontSans } from '@/lib/fonts'
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'
import React, { type PropsWithChildren, useEffect, useMemo } from 'react'

import { darkThemeClass, lightThemeClass } from 'ui/src/components/system/theme.css'
import type { State as ThemeState } from 'ui/src/context/theme'
import { ThemeContext } from 'ui/src/context/theme'
import type { Theme } from 'ui/src/types'

export const InnerThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const { setTheme, theme, resolvedTheme } = useTheme()

	useEffect(() => {
		if (resolvedTheme === 'dark') {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
	}, [resolvedTheme])

	const ctx = useMemo(
		(): ThemeState => ({
			// TODO: resolve when we have light theme
			theme: 'dark' as Theme,
			resolvedTheme: 'dark' as Omit<Theme, Theme.SYSTEM>,
			// theme: theme as Theme,
			// resolvedTheme: resolvedTheme as Omit<Theme, Theme.SYSTEM>,
			setTheme,
		}),
		[theme],
	)

	return <ThemeContext.Provider value={ctx}>{children}</ThemeContext.Provider>
}

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => (
	<NextThemesProvider
		attribute="class"
		defaultTheme="dark"
		enableSystem
		value={{
			light: lightThemeClass,
			dark: darkThemeClass,
		}}
	>
		<style>{`
		:root {
			--font-sans: ${fontSans.style.fontFamily};
			--font-mono: ${fontMono.style.fontFamily};
		}
	`}</style>
		<InnerThemeProvider>{children}</InnerThemeProvider>
	</NextThemesProvider>
)
