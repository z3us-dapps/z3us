import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Box } from 'ui/src/components-v2/box'
import { darkThemeClass, lightThemeClass } from 'ui/src/components-v2/system/theme.css'
import { CheckIcon } from 'ui/src/components/icons'

import * as styles from './styles.css'

const TempNav: React.FC = () => {
	const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false)
	const [isMounted, setIsMounted] = useState<boolean>(false)

	useEffect(() => {
		const element = window.document.body
		const match = window.matchMedia('(prefers-color-scheme: dark)')
		const isDarkMode = match.matches

		if (isDarkTheme) {
			element.classList.add(darkThemeClass as any)
			element.classList.add('dark')
			element.classList.remove('light')
			element.classList.remove(lightThemeClass)
		} else {
			element.classList.remove(darkThemeClass as any)
			element.classList.remove('dark')
			element.classList.add('light')
			element.classList.add(lightThemeClass)
		}

		if (!isMounted) {
			if (isDarkMode) {
				element.classList.add(darkThemeClass as any)
				element.classList.add('dark')
				element.classList.remove('light')
				element.classList.remove(lightThemeClass)
				setIsDarkTheme(true)
			}
			setIsMounted(true)
		}
	}, [isDarkTheme])

	return (
		<Box
			display="flex"
			position="fixed"
			className={styles.tempNav}
			padding="small"
			gap="medium"
			style={{ opacity: '0.2' }}
		>
			<Link to="/">Home</Link>
			<Link to="/pairing">Pairing</Link>
			<Link to="/connect">Connect</Link>
			<button onClick={() => setIsDarkTheme(!isDarkTheme)} type="button">
				<CheckIcon />
			</button>
		</Box>
	)
}

export default TempNav
