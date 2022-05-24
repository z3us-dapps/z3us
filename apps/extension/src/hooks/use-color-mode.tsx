import { darkTheme } from 'ui/src/theme'
import { useEffect, useState } from 'react'
import { useSharedStore } from '@src/store'

const DARK_MODE_MEDIA_QUERY = '(prefers-color-scheme: dark)'

export const useColorMode = () => {
	const { theme } = useSharedStore(state => ({
		theme: state.theme,
	}))

	const mediaList = window.matchMedia && window.matchMedia(DARK_MODE_MEDIA_QUERY)
	const [autoThemeIsDark, setAutoThemeIsDark] = useState(mediaList && mediaList.matches)
	const [isDark, setIsDarkMode] = useState(mediaList && mediaList.matches)

	useEffect(
		() => {
			let realizedColorMode = theme
			if (theme === 'system') {
				realizedColorMode = autoThemeIsDark ? 'dark' : 'light'
			}

			const element = window.document.body
			if (realizedColorMode === 'dark') {
				element.classList.add(darkTheme)
				setIsDarkMode(true)
			} else {
				element.classList.remove(darkTheme)
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
