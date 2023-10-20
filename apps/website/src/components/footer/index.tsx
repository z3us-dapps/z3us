import { ContentContainer } from '@/components/content-container'
import { NextButton } from '@/components/next-button'
import { NextLink } from '@/components/next-link'
import { Z3usLogoLink } from '@/components/z3us-logo-link'
import clsx from 'clsx'
// import { useTheme } from 'ui/src/hooks/use-theme'
// import { type Theme } from 'ui/src/types'
import React from 'react'

import { Box } from 'ui/src/components/box'
// import { Button } from 'ui/src/components/button'
import { GithubIcon } from 'ui/src/components/icons/github-icon'
// import { MoonIcon } from 'ui/src/components/icons/moon-icon'
// import { SunIcon } from 'ui/src/components/icons/sun-icon'
import { TelegramIcon } from 'ui/src/components/icons/telegram-icon'
import { TwitterIcon } from 'ui/src/components/icons/twitter-icon'
// import { SelectSimple, SelectTrigger, SelectValue } from 'ui/src/components/select'
import { ToolTip } from 'ui/src/components/tool-tip'
import Text, { type TextProps } from 'ui/src/components/typography/text'

import * as styles from './styles.css'

interface IProps {
	showTopBorder?: boolean
	textColor?: TextProps['color']
}

export const Footer: React.FC<IProps> = props => {
	const { showTopBorder = false, textColor = 'neutral' } = props
	// const { setTheme, theme, resolvedTheme } = useTheme()

	// const isDarkTheme = resolvedTheme === 'dark'

	// const handleChangeTheme = (_theme: Theme) => {
	// 	setTheme(_theme)
	// }

	const pageLinks = (
		<>
			<NextLink size="small" href="/privacy" underline="hover" color={textColor}>
				Privacy
			</NextLink>
			<Box>&middot;</Box>
			<NextLink size="small" href="/terms" underline="hover" color={textColor}>
				Terms
			</NextLink>
			<Box>&middot;</Box>
			<NextLink size="small" href="/terms" underline="hover" color={textColor}>
				Support
			</NextLink>
			<Box>&middot;</Box>
			<NextLink size="small" href="/terms" underline="hover" color={textColor}>
				FAQ
			</NextLink>
		</>
	)

	return (
		<ContentContainer>
			<Box className={clsx(styles.footerWrapper, showTopBorder && styles.footerBorderWrapper)}>
				<Box className={styles.footerInnerWrapper}>
					<Box className={styles.footerLeftWrapper}>
						<Z3usLogoLink />
						<Text size="small" color={textColor}>
							&copy; {new Date().getFullYear()} Z3US
						</Text>
						<Box className={styles.mobileLinks}>{pageLinks}</Box>
					</Box>
					<Box className={styles.footerRightWrapper}>
						<Box className={styles.tabletLinks}>{pageLinks}</Box>
						<Box display="flex" gap="xsmall">
							<ToolTip message="telegram">
								<NextButton
									rounded
									sizeVariant="small"
									styleVariant="primary"
									iconOnly
									to="https://t.me/z3us_dapps"
									target="_blank"
								>
									<TelegramIcon />
								</NextButton>
							</ToolTip>
							<ToolTip message="twitter">
								<NextButton
									rounded
									sizeVariant="small"
									styleVariant="primary"
									iconOnly
									to="https://twitter.com/z3us_dapps"
									target="_blank"
								>
									<TwitterIcon />
								</NextButton>
							</ToolTip>
							<ToolTip message="github">
								<NextButton
									rounded
									sizeVariant="small"
									styleVariant="primary"
									iconOnly
									to="https://github.com/z3us-dapps/z3us"
									target="_blank"
								>
									<GithubIcon />
								</NextButton>
							</ToolTip>
						</Box>
						<Box>
							{/* <SelectSimple
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
							/> */}
						</Box>
					</Box>
				</Box>
			</Box>
		</ContentContainer>
	)
}
