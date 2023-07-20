import { fontMono, fontSans } from '@/lib/fonts'
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'
import type { State as ThemeState } from 'packages/ui/src/context/theme'
import { ThemeContext } from 'packages/ui/src/context/theme'
import type { Theme } from 'packages/ui/src/types/types'
import React, { type PropsWithChildren, useEffect, useMemo } from 'react'

import { darkThemeClass, lightThemeClass } from 'ui/src/components/system/theme.css'

export const InnerThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const { setTheme, theme, resolvedTheme } = useTheme()

	useEffect(() => {
		document.documentElement.classList.add('dark')
		if (resolvedTheme === 'dark') {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
	}, [resolvedTheme])

	const ctx = useMemo(
		(): ThemeState => ({
			theme: theme as Theme,
			resolvedTheme: resolvedTheme as Omit<Theme, Theme.SYSTEM>,
			setTheme,
		}),
		[theme],
	)

	return <ThemeContext.Provider value={ctx}>{children}</ThemeContext.Provider>
}

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => (
	<NextThemesProvider
		attribute="class"
		defaultTheme="system"
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
