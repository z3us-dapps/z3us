import React, { type PropsWithChildren, useEffect, useMemo, useState } from 'react'

import { darkThemeClass, lightThemeClass } from 'ui/src/components/system/theme.css'
import type { State as ThemeState } from 'ui/src/context/theme'
import { ThemeContext } from 'ui/src/context/theme'
import { Theme } from 'ui/src/types'

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

	useEffect(() => {
		const element = window.document.body
		document.documentElement.style.setProperty('--font-sans', '"Inter"')
		document.documentElement.style.setProperty('--font-mono', '"Fira Mono"')

		let resolvedTheme: Theme
		switch (theme) {
			case Theme.DARK:
			case Theme.LIGHT:
				resolvedTheme = theme
				break
			default:
				resolvedTheme = autoThemeIsDark ? Theme.DARK : Theme.LIGHT
				break
		}

		switch (resolvedTheme) {
			case Theme.DARK:
				element.classList.add(darkThemeClass)
				element.classList.add('dark')
				element.classList.remove('light')
				element.classList.remove(lightThemeClass)
				break
			default:
				element.classList.remove(darkThemeClass)
				element.classList.remove('dark')
				element.classList.add('light')
				element.classList.add(lightThemeClass)
				break
		}
	}, [theme, autoThemeIsDark])

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
