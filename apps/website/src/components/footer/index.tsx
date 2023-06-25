import { NextLink } from '@/components/next-link'
import { Z3usLogoLink } from '@/components/z3us-logo-link'
import { useTheme } from 'next-themes'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { MoonIcon } from 'ui/src/components/icons/moon-icon'
import { SunIcon } from 'ui/src/components/icons/sun-icon'
import { SelectSimple, SelectTrigger, SelectValue } from 'ui/src/components/select'
import { Text } from 'ui/src/components/typography'

import * as styles from './footer.css'

export const Footer = () => {
	const { setTheme, theme, resolvedTheme } = useTheme()

	const isDarkTheme = resolvedTheme === 'dark'

	const handleChangeTheme = (_theme: string) => {
		setTheme(_theme)
	}

	return (
		<Box className={styles.footerWrapper}>
			<Box className={styles.footerInnerWrapper}>
				<Box className={styles.footerLeftWrapper}>
					<Z3usLogoLink />
					<Text size="small">&copy; {new Date().getFullYear()} Z3US</Text>
				</Box>
				<Box className={styles.footerRightWrapper}>
					<NextLink size="small" href="/privacy" underline="hover">
						Privacy
					</NextLink>
					<NextLink size="small" href="/terms" underline="hover">
						Terms
					</NextLink>
					<Box>
						<SelectSimple
							trigger={
								<SelectTrigger asChild>
									<Box>
										<Button
											sizeVariant="small"
											styleVariant="tertiary"
											rightIcon={isDarkTheme ? <MoonIcon /> : <SunIcon />}
										>
											<span style={{ overflow: 'hidden' }}>
												<SelectValue>Theme</SelectValue>
											</span>
										</Button>
									</Box>
								</SelectTrigger>
							}
							value={theme}
							onValueChange={handleChangeTheme}
							data={[
								{ id: 'light', title: 'Light' },
								{ id: 'dark', title: 'Dark' },
								{ id: 'system', title: 'System' },
							]}
							sizeVariant="small"
							styleVariant="tertiary"
						/>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}
