import type { State as ThemeState } from 'packages/ui/src/context/theme'
import { ThemeContext } from 'packages/ui/src/context/theme'
import { Theme } from 'packages/ui/src/types/types'
import React, { type PropsWithChildren, useEffect, useMemo, useState } from 'react'

const DARK_MODE_MEDIA_QUERY = '(prefers-color-scheme: dark)'

const defaultThemeValue = localStorage?.getItem('z3us:theme')

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [theme, setTheme] = useState<Theme>((defaultThemeValue ? JSON.parse(defaultThemeValue) : Theme.SYSTEM) as Theme)

	const mediaList = window.matchMedia && window.matchMedia(DARK_MODE_MEDIA_QUERY)
	const [autoThemeIsDark, setAutoThemeIsDark] = useState<boolean>(mediaList && mediaList.matches)

	useEffect(
		() => {
			localStorage?.setItem('z3us:theme', JSON.stringify(theme))

			const onSystemDarkModeChange = (event: MediaQueryListEvent) => {
				setAutoThemeIsDark(event.matches)
			}

			if (mediaList) {
				mediaList.addEventListener('change', onSystemDarkModeChange)
				return () => {
					mediaList.removeEventListener('change', onSystemDarkModeChange)
				}
			}
			return () => {}
		},
		[theme], // Only re-call effect when value changes
	)

	const ctx = useMemo(
		(): ThemeState => ({
			theme: theme as Theme,
			resolvedTheme: autoThemeIsDark ? Theme.DARK : Theme.LIGHT,
			setTheme,
		}),
		[theme, autoThemeIsDark],
	)

	return <ThemeContext.Provider value={ctx}>{children}</ThemeContext.Provider>
}
