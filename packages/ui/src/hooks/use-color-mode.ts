// @ts-nocheck
// TODO: fix ts
import { useEffect, useState } from 'react'

// TODO: fix
// import { darkTheme } from 'ui/src/theme'
import { useSharedStore } from 'ui/src/hooks/use-store'

const DARK_MODE_MEDIA_QUERY = '(prefers-color-scheme: dark)'

const getInitialColor = (theme: string, mediaList: any): boolean => {
	const isCurrentDark = mediaList && mediaList.matches
	const isThemeDark = theme === 'dark'
	return theme === 'system' ? isCurrentDark : isThemeDark
}

export const useColorMode = () => {
	const { theme } = useSharedStore(state => ({
		theme: state.theme,
	}))

	const mediaList = window.matchMedia && window.matchMedia(DARK_MODE_MEDIA_QUERY)
	const [autoThemeIsDark, setAutoThemeIsDark] = useState<boolean>(mediaList && mediaList.matches)
	const [isDark, setIsDarkMode] = useState<boolean>(getInitialColor(theme, mediaList))

	useEffect(
		() => {
			let realizedColorMode = theme
			if (theme === 'system') {
				realizedColorMode = autoThemeIsDark ? 'dark' : 'light'
			}

			// const element = window.document.body
			if (realizedColorMode === 'dark') {
				// element.classList.add(darkTheme)
				setIsDarkMode(true)
			} else {
				// element.classList.remove(darkTheme)
				setIsDarkMode(false)
			}

			const onSystemDarkModeChange = evt => {
				setAutoThemeIsDark(evt.matches)
			}

			if (mediaList) {
				mediaList.addListener(onSystemDarkModeChange)
				return () => {
					mediaList.removeListener(onSystemDarkModeChange)
				}
			}
			return () => {}
		},
		[theme], // Only re-call effect when value changes
	)

	return isDark
}
