import React from 'react'
import { useImmer } from 'use-immer'
import { Box, Flex, StyledLink } from 'ui/src/components/atoms'
import { useEventListener } from 'usehooks-ts'
import { LightningBoltIcon } from '@radix-ui/react-icons'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItemIndicator,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
} from 'ui/src/components/drop-down-menu'
import { PageContainer } from 'components/page-container'
import { Container, Row, Col } from 'react-grid-system'
import Button from 'ui/src/components/button'
import { TelegramIcon, TwitterIcon, GithubIcon } from 'ui/src/components/icons'
import { ToolTip } from 'ui/src/components/tool-tip'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Z3usText } from 'ui/src/components/z3us-text'
import { config } from 'config'

interface IProps {
	isLandingPage?: boolean
}

const defaultProps = {
	isLandingPage: false,
}

export const Header: React.FC<IProps> = ({ isLandingPage }) => {
	const [state, setState] = useImmer({
		isScrolled: false,
		isThemeMenuOpen: false,
	})
	const { theme, setTheme } = useTheme()

	useEventListener('scroll', () => {
		if (window.scrollY > 0) {
			setState(draft => {
				draft.isScrolled = true
			})
		} else if (window.scrollY === 0) {
			setState(draft => {
				draft.isScrolled = false
			})
		}
	})

	return (
		<Box
			css={{
				position: !isLandingPage ? 'sticky' : 'relative',
				top: '0',
				zIndex: '1',
				transition: '$default',
				minHeight: '72px',
				'&:after': {
					content: '',
					background: !isLandingPage && state.isScrolled ? '$bgPanelHeaderTransparent' : 'transparent',
					borderBottom: !isLandingPage && state.isScrolled ? '1px solid $borderPanel2' : '1px solid transparent',
					backdropFilter: !isLandingPage && state.isScrolled ? 'blur(15px)' : 'blur(0px)',
					transition: '$default',
					position: 'absolute',
					width: '100%',
					height: '100%',
					top: '0',
					pe: 'none',
				},
			}}
		>
			<PageContainer css={{ position: 'relative', zIndex: '2' }}>
				<Container fluid>
					<Row>
						<Col>
							<Flex
								align="center"
								css={{
									pb: '6px',
									'@md': {
										px: '24px',
									},
								}}
							>
								<Box css={{ pt: '27px' }}>
									<Link href="/" passHref>
										<StyledLink css={{ display: 'inline-flex' }}>
											<Z3usText
												css={{
													width: '110px',
													height: 'auto',
													color: '#7448fe',
													transition: '$default',
													'&:hover': {
														color: '#ff9400',
													},
												}}
											/>
										</StyledLink>
									</Link>
								</Box>
							</Flex>
						</Col>
						<Col>
							<Box css={{ width: '100%' }}>
								<Flex
									css={{
										width: '100%',
										pt: '20px',
										'@md': {
											px: '24px',
										},
									}}
								>
									<Flex
										gap="2"
										align="center"
										justify="end"
										css={{
											flex: '1',
											svg: {
												width: '20px',
												'-webkit-backface-visibility': 'hidden',
												'-webkit-transform': 'translateZ(0) scale(1.0, 1.0)',
												transform: 'translateZ(0)',
											},
										}}
									>
										<ToolTip message="GitHub" bgColor="$bgPanel2">
											<Button target="_blank" href={config.GITHUB_URL} as="a" size="3" color="ghost" iconOnly>
												<GithubIcon />
											</Button>
										</ToolTip>
										<ToolTip message="Twitter" bgColor="$bgPanel2">
											<Button target="_blank" href={config.TWITTER_URL} as="a" size="3" color="ghost" iconOnly>
												<TwitterIcon />
											</Button>
										</ToolTip>
										<ToolTip message="Telegram" bgColor="$bgPanel2">
											<Button target="_blank" href={config.TELEGRAM_URL} as="a" size="3" color="ghost" iconOnly>
												<TelegramIcon />
											</Button>
										</ToolTip>
										<DropdownMenu
											onOpenChange={open => {
												setState(draft => {
													draft.isThemeMenuOpen = open
												})
											}}
										>
											<DropdownMenuTrigger asChild>
												<Box>
													<ToolTip message="Theme" bgColor="$bgPanel2">
														<Button size="3" color="ghost" iconOnly>
															<Box
																css={{
																	color: state.isThemeMenuOpen ? '#5d1eaf' : 'defaultColor',
																	fill: state.isThemeMenuOpen ? '#5d1eaf' : 'defaultColor',
																}}
															>
																<LightningBoltIcon />
															</Box>
														</Button>
													</ToolTip>
												</Box>
											</DropdownMenuTrigger>
											<DropdownMenuContent
												avoidCollisions={false}
												align="end"
												side="bottom"
												sideOffset={6}
												alignOffset={-5}
												css={{ minWidth: '120px' }}
											>
												<DropdownMenu>
													<DropdownMenuRadioGroup
														value={theme}
														onValueChange={_theme => {
															setTheme(_theme)
														}}
													>
														<DropdownMenuRadioItem value="light">
															<DropdownMenuItemIndicator />
															Light
														</DropdownMenuRadioItem>
														<DropdownMenuRadioItem value="dark">
															<DropdownMenuItemIndicator />
															Dark
														</DropdownMenuRadioItem>
														<DropdownMenuRadioItem value="system">
															<DropdownMenuItemIndicator />
															System
														</DropdownMenuRadioItem>
													</DropdownMenuRadioGroup>
												</DropdownMenu>
											</DropdownMenuContent>
										</DropdownMenu>
									</Flex>
								</Flex>
							</Box>
						</Col>
					</Row>
				</Container>
			</PageContainer>
		</Box>
	)
}

Header.defaultProps = defaultProps
