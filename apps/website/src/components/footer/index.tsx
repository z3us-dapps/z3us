import { ContentContainer } from '@/components/content-container'
import { NextButton } from '@/components/next-button'
import { NextLink } from '@/components/next-link'
import { Z3usLogoLink } from '@/components/z3us-logo-link'
import { useTheme } from 'next-themes'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { GithubIcon } from 'ui/src/components/icons/github-icon'
import { MoonIcon } from 'ui/src/components/icons/moon-icon'
import { SunIcon } from 'ui/src/components/icons/sun-icon'
import { TelegramIcon } from 'ui/src/components/icons/telegram-icon'
import { TwitterIcon } from 'ui/src/components/icons/twitter-icon'
import { SelectSimple, SelectTrigger, SelectValue } from 'ui/src/components/select'
import { ToolTip } from 'ui/src/components/tool-tip'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'

import * as styles from './footer.css'

export const Footer = () => {
	const { setTheme, theme, resolvedTheme } = useTheme()

	const isDarkTheme = resolvedTheme === 'dark'

	const handleChangeTheme = (_theme: string) => {
		setTheme(_theme)
	}

	return (
		<ContentContainer>
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
						<Box display="flex" gap="xsmall">
							<ToolTip message={<Translation capitalizeFirstLetter text="global.telegram" />}>
								<NextButton
									sizeVariant="small"
									styleVariant="ghost"
									iconOnly
									to="https://t.me/z3us_dapps"
									target="_blank"
								>
									<TelegramIcon />
								</NextButton>
							</ToolTip>
							<ToolTip message={<Translation capitalizeFirstLetter text="global.twitter" />}>
								<NextButton
									sizeVariant="small"
									styleVariant="ghost"
									iconOnly
									to="https://twitter.com/z3us_dapps"
									target="_blank"
								>
									<TwitterIcon />
								</NextButton>
							</ToolTip>
							<ToolTip message={<Translation capitalizeFirstLetter text="global.github" />}>
								<NextButton
									sizeVariant="small"
									styleVariant="ghost"
									iconOnly
									to="https://github.com/z3us-dapps"
									target="_blank"
								>
									<GithubIcon />
								</NextButton>
							</ToolTip>
						</Box>
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
		</ContentContainer>
	)
}
