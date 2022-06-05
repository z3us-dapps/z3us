import React, { useEffect } from 'react'
import usePortal from 'react-useportal'
import { useImmer } from 'use-immer'
import Button from 'ui/src/components/button'
import { DropdownMenuHamburgerIcon } from 'ui/src/components/drop-down-menu'
import { AnimatePresence } from 'framer-motion'
import { Text, Box, MotionBox, StyledLink } from 'ui/src/components/atoms'
import { config } from 'config'

const links = [
	{ name: 'Home', to: '/', id: 'home' },
	{
		name: 'Docs',
		to: '/docs',
		id: 'docs',
		subMenu: [
			{ name: 'API Reference', to: '/docs/api-reference', id: 'api-reference' },
			{ name: 'API V1', to: '/docs/api-v1', id: 'api-v1' },
		],
	},
	{ name: 'Github', to: config.GITHUB_URL, id: 'github' },
	{ name: 'Twitter', to: config.TWITTER_URL, id: 'twitter' },
	{ name: 'Telegram', to: config.TELEGRAM_URL, id: 'telegram' },
	{ name: 'Discord', to: config.DISCORD_URL, id: 'discord' },
]

const itemVariants = {
	closed: {
		opacity: 0,
	},
	open: { opacity: 1 },
}

const sideVariants = {
	closed: {
		transition: {
			staggerChildren: 0.1,
			staggerDirection: -1,
		},
	},
	open: {
		transition: {
			staggerChildren: 0.1,
			staggerDirection: 1,
		},
	},
}

interface IProps {
	isScrolled: boolean
}

export const MobileMenu = ({ isScrolled }: IProps): JSX.Element => {
	const { Portal } = usePortal()

	const [state, setState] = useImmer({
		isMounted: false,
		isMenuOpen: false,
	})

	const handleToggleMenu = () => {
		setState(draft => {
			draft.isMenuOpen = !state.isMenuOpen
		})
	}

	useEffect(() => {
		setState(draft => {
			draft.isMounted = true
		})
	}, [])

	return state.isMounted ? (
		<Portal>
			<>
				<AnimatePresence>
					{state.isMenuOpen && (
						<MotionBox
							as="aside"
							initial={{ width: 0 }}
							animate={{
								width: 300,
								transform: 'translateX(0px)',
								transition: { duration: 0.3 },
							}}
							exit={{
								width: 0,
								transform: 'translateX(40px)',
								transition: { delay: 0.3, duration: 0.3 },
							}}
							css={{
								width: '100px',
								maxWidth: '100vw',
								height: '100vh',
								position: 'fixed',
								backgroundColor: '$bgPanelHeaderTransparent',
								backdropFilter: 'blur(15px)',
								boxShadow: 'rgb(0 0 0 / 20%) -10px -1px 20px 6px',
								zIndex: '1',
								top: '0',
								right: '0',
							}}
						>
							<MotionBox
								as="ul"
								initial="closed"
								animate="open"
								exit="closed"
								variants={sideVariants}
								css={{ p: '$4', mt: '$12' }}
							>
								{links.map(({ name, to, id, subMenu }) => (
									<MotionBox as="li" variants={itemVariants} key={id}>
										<StyledLink
											href={to}
											css={{
												display: 'block',
												backgroundColor: '$bgPanel2',
												mb: '$2',
												p: '$4',
												br: '$3',
												'&:focus': {
													opacity: '0.8',
												},
											}}
										>
											<Text size="5" bold>
												{name}
											</Text>
										</StyledLink>
										{subMenu ? (
											<Box as="ul" css={{ pl: '30px' }}>
												{subMenu.map(({ name: _name, to: _to, id: _id }) => (
													<Box key={_id} as="li">
														<StyledLink
															href={_to}
															css={{
																display: 'block',
																backgroundColor: '$bgPanel2',
																mb: '$2',
																p: '$4',
																br: '$3',
																'&:focus': {
																	opacity: '0.8',
																},
															}}
														>
															<Text size="5" bold>
																{_name}
															</Text>
														</StyledLink>
													</Box>
												))}
											</Box>
										) : null}
									</MotionBox>
								))}
							</MotionBox>
						</MotionBox>
					)}
				</AnimatePresence>
				<Box
					css={{
						position: 'fixed',
						top: isScrolled ? '5px' : '15px',
						transition: '$default',
						right: '$3',
						zIndex: '3',
						'@sm': { display: 'none' },
					}}
				>
					<MotionBox animate={state.isMenuOpen ? 'open' : 'closed'}>
						<Button iconOnly aria-label="menu" color="ghost" size="5" css={{ mr: '2px' }} onClick={handleToggleMenu}>
							<DropdownMenuHamburgerIcon
								css={{
									mt: '4px',
									stroke: '$iconDefault',
								}}
							/>
						</Button>
					</MotionBox>
				</Box>
			</>
		</Portal>
	) : null
}
