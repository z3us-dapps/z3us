import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

import { Box } from 'ui/src/components/box'
import { CheckIcon, ExternalLinkIcon } from 'ui/src/components/icons'
import { darkThemeClass, lightThemeClass } from 'ui/src/components/system/theme.css'

import * as styles from './temp-nav-styles.css'

const TempNav = () => {
	const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false)
	const [isMounted, setIsMounted] = useState<boolean>(false)

	useEffect(() => {
		document.documentElement.style.setProperty('--font-sans', '"Inter"')
		document.documentElement.style.setProperty('--font-mono', '"Inter"')

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
		<Box>
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
				<button
					onClick={() => {
						// toast.error('Event has not been created', { duration: Infinity })
						// toast.promise(() => new Promise((resolve) => setTimeout(resolve, 2000)), {
						//   loading: 'Loading',
						//   success: 'Success',
						//   error: 'Error',
						// });
						toast('Event has been created', {
							description: 'Monday, January 3rd at 6:00pm',
							icon: <ExternalLinkIcon />,
							// className: 'toast-success',
							descriptionClassName: 'my-toast-description',
							// duration: Infinity,
						})
						// toast('Event has been created', {
						// 	duration: Infinity,
						// 	className: 'my-toast',
						// 	descriptionClassName: 'my-toast-description',
						// })
					}}
					type="button"
				>
					<ExternalLinkIcon />
				</button>
				<button onClick={() => setIsDarkTheme(!isDarkTheme)} type="button">
					<CheckIcon />
				</button>
			</Box>
		</Box>
	)
}

export default TempNav
