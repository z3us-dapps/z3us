import React from 'react'
import { useImmer } from 'use-immer'
import { Box, Flex, StyledLink } from 'ui/src/components/atoms'
import { useEventListener } from 'usehooks-ts'
import { LightningBoltIcon } from '@radix-ui/react-icons'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from 'ui/src/components/drop-down-menu'
//import { Container } from '@nextui-org/react'
import Button from 'ui/src/components/button'
import { TelegramIcon, TwitterIcon } from 'ui/src/components/icons'
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

export const Header: React.FC<IProps> = ({ isLandingPage }: IProps) => {
	const [state, setState] = useImmer({
		isScrolled: false,
		isThemeMenuOpen: false,
	})

	const { theme, setTheme } = useTheme()
	const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

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
				position: 'sticky',
				top: '0',
				zIndex: '1',
				transition: '$default',
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
			<Box>
				<Flex>
					<Box>
						<Link href="/" passHref>
							<StyledLink css={{ mt: '31px', display: 'inline-flex' }}>
								<Z3usText
									css={{
										transition: '$default',
										'&:hover': {
											color: '#ff9400',
										},
									}}
								/>
							</StyledLink>
						</Link>
					</Box>
					<Flex
						gap="3"
						align="center"
						justify="end"
						css={{
							flex: '1',
							py: '$6',
							svg: {
								width: '20px',
								'-webkit-backface-visibility': 'hidden',
								'-webkit-transform': 'translateZ(0) scale(1.0, 1.0)',
								transform: 'translateZ(0)',
								...(isLandingPage
									? {
											color: '$white',
											fill: '$white',
									  }
									: {}),
							},
						}}
					>
						{/*{isLandingPage ? (
							<Link href="/docs" passHref>
								<StyledLink underlineOnHover css={{ mr: '$2' }}>
									<Text fira size="6" css={{ pt: '1px' }}>
										Docs
									</Text>
								</StyledLink>
							</Link>
						) : null}*/}
						{/*<Button target="_blank" href={config.GITHUB_URL} as="a" size="3" color="ghost" iconOnly>
							<GithubIcon />
						</Button>*/}
						<ToolTip message="Twitter">
							<Button target="_blank" href={config.TWITTER_URL} as="a" size="3" color="ghost" iconOnly>
								<TwitterIcon />
							</Button>
						</ToolTip>
						<ToolTip message="Telegram">
							<Button target="_blank" href={config.TELEGRAM_URL} as="a" size="3" color="ghost" iconOnly>
								<TelegramIcon />
							</Button>
						</ToolTip>
						{!isLandingPage ? (
							<DropdownMenu
								onOpenChange={open => {
									setState(draft => {
										draft.isThemeMenuOpen = open
									})
								}}
							>
								<DropdownMenuTrigger asChild>
									<Button size="3" color="ghost" iconOnly onClick={toggleTheme}>
										<Box
											css={{
												color: state.isThemeMenuOpen ? '#5d1eaf' : 'defaultColor',
											}}
										>
											<LightningBoltIcon />
										</Box>
									</Button>
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
										<DropdownMenuItem
											onSelect={() => {
												setTheme('light')
											}}
										>
											<span>Light</span>
										</DropdownMenuItem>
										<DropdownMenuItem
											onSelect={() => {
												setTheme('dark')
											}}
										>
											<span>Dark</span>
										</DropdownMenuItem>
										<DropdownMenuItem
											onSelect={() => {
												setTheme('system')
											}}
										>
											<span>System</span>
										</DropdownMenuItem>
									</DropdownMenu>
								</DropdownMenuContent>
							</DropdownMenu>
						) : null}
					</Flex>
				</Flex>
			</Box>
		</Box>
	)
}

Header.defaultProps = defaultProps
