import React, { type PropsWithChildren, useEffect, useMemo, useState } from 'react'
import browser from 'webextension-polyfill'

import { darkThemeClass, lightThemeClass } from 'ui/src/theme/theme.css'
import type { State as ThemeState } from 'ui/src/context/theme'
import { ThemeContext } from 'ui/src/context/theme'
import { Theme } from 'ui/src/types'

import { getTheme, saveTheme } from '@src/styles/theme'

const DARK_MODE_MEDIA_QUERY = '(prefers-color-scheme: dark)'

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [theme, setTheme] = useState<Theme>()

	const mediaList = window.matchMedia && window.matchMedia(DARK_MODE_MEDIA_QUERY)
	const [autoThemeIsDark, setAutoThemeIsDark] = useState<boolean>(mediaList && mediaList.matches)

	useEffect(() => {
		getTheme().then(setTheme)
	}, [])

	useEffect(
		() => {
			if (!theme) return () => {}

			saveTheme(theme)

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

	const handleThemeChange = (t: Theme) => {
		if (browser.browserAction) {
			browser.browserAction.setPopup({ popup: `src/pages/app/${t}.html` })
		} else if (browser.action) {
			browser.action.setPopup({ popup: `src/pages/app/${t}.html` })
		}
		setTheme(t)
	}

	const ctx = useMemo(
		(): ThemeState => ({
			theme: theme as Theme,
			resolvedTheme: autoThemeIsDark ? Theme.DARK : Theme.LIGHT,
			setTheme: handleThemeChange,
		}),
		[theme, autoThemeIsDark],
	)

	return (
		<ThemeContext.Provider value={ctx}>
			<style suppressHydrationWarning>
				{`
					:root {
						--font-sans: '"Inter"';
						--font-mono: '"Fira Mono"';
					}
				`}
			</style>
			{children}
		</ThemeContext.Provider>
	)
}
