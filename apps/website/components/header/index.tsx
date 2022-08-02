import React from 'react'
import { useImmer } from 'use-immer'
import Pill from 'ui/src/components/pill'
import { Text, Box, Flex, StyledLink } from 'ui/src/components/atoms'
import { useEventListener } from 'usehooks-ts'
import { PageContainer } from 'components/page-container'
import Button from 'ui/src/components/button'
import { TelegramIcon, TwitterIcon, GithubIcon } from 'ui/src/components/icons'
import { ToolTip } from 'ui/src/components/tool-tip'
import Link from 'next/link'
import { Z3usText } from 'ui/src/components/z3us-text'
import { config } from 'config'
import { MobileMenu } from './mobile-menu'

interface ImmerProps {
	isScrolled: boolean
}

interface IProps {
	isLandingPage?: boolean
}

const defaultProps = {
	isLandingPage: false,
}

export const Header: React.FC<IProps> = ({ isLandingPage }) => {
	const [state, setState] = useImmer<ImmerProps>({
		isScrolled: false,
	})

	useEventListener('scroll', () => {
		if (window.scrollY > 0) {
			setState(draft => {
				draft.isScrolled = true
			})
		} else if (window.scrollY <= 0) {
			setState(draft => {
				draft.isScrolled = false
			})
		}
	})

	return (
		<>
			<Box
				css={{
					position: !isLandingPage ? 'sticky' : 'relative',
					top: '0',
					zIndex: '3',
					transition: '$default',
					pt: !isLandingPage && state.isScrolled ? '10px' : '20px',
					pb: !isLandingPage && state.isScrolled ? '17px' : '20px',
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
					<Flex>
						<Flex
							align="start"
							css={{
								width: '100%',
								position: 'relative',
								'@md': {
									px: '24px',
								},
							}}
						>
							<Link href="/" passHref>
								<StyledLink css={{ display: 'inline-flex', mt: '8px' }}>
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
							<Box>
								<Pill data-test-e2e="pill" color="gradientGreen" css={{ ml: '15px', mt: '6px' }}>
									BETA
								</Pill>
							</Box>
						</Flex>
						<Flex
							justify="end"
							css={{
								width: '100%',
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
									display: 'none',
									flex: '1',
									svg: {
										width: '20px',
										'-webkit-backface-visibility': 'hidden',
										'-webkit-transform': 'translateZ(0) scale(1.0, 1.0)',
										transform: 'translateZ(0)',
									},
									'@sm': { display: 'flex' },
								}}
							>
								<Link href="/docs" passHref>
									<StyledLink underlineOnHover css={{ mr: '$2' }}>
										<Text bold size="4" css={{ pt: '1px' }}>
											Docs
										</Text>
									</StyledLink>
								</Link>
								<StyledLink href={config.GITHUB_FEEDBACK_URL} underlineOnHover css={{ mr: '$2' }}>
									<Text bold size="4" css={{ pt: '1px' }}>
										Feedback
									</Text>
								</StyledLink>
								{/*<Link href="/tokenomics" passHref>
									<StyledLink underlineOnHover css={{ mr: '$2' }}>
										<Text bold size="4" css={{ pt: '1px' }}>
											Tokenomics
										</Text>
									</StyledLink>
								</Link>*/}
								{/*<Link href="/airdrop" passHref>
									<StyledLink underlineOnHover css={{ mr: '$2' }}>
										<Text bold size="4" css={{ pt: '1px' }}>
											Airdrop
										</Text>
									</StyledLink>
								</Link>*/}
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
							</Flex>
						</Flex>
					</Flex>
				</PageContainer>
			</Box>
			<MobileMenu isScrolled={state.isScrolled} />
		</>
	)
}

Header.defaultProps = defaultProps
