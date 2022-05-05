/* eslint-disable */
import React from 'react'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { Box, Text, Flex, StyledLink, Image } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import { Header } from 'components/header'
import { Z3usBrandLanding } from 'components/z3us-brand-landing'
import { Z3usLogoText } from 'ui/src/components/z3us-logo-text'
import { config } from 'config'

export const LandingPage: React.FC = () => {
	return (
		<>
			<NextSeo
				title="An open source UX driven web3 wallet built for DeFi & NFTs "
				openGraph={{
					type: 'website',
					url: config.Z3US_URL,
					title: 'z3us web3 wallet',
					description: 'A community centric open source browser wallet for the Radix DLT network.',
					images: [
						{
							url: `${config.Z3US_URL}/og-image-1.png`,
							width: 800,
							height: 600,
							alt: 'Og Image Alt',
						},
						{
							url: `${config.Z3US_URL}/og-image-2.png`,
							width: 800,
							height: 600,
							alt: 'Og Image Alt 2',
						},
					],
				}}
			/>

			<Box
				css={{
					background: '$black',
					color: '$white',
					minHeight: '100vh',
				}}
			>
				<Box
					css={{
						background: 'radial-gradient(circle, rgba(115,24,205,1) 0%, rgba(115,24,205,0.7) 100%)',
						minHeight: '100vh',
						px: '20px',
						position: 'relative',
						'&:before': {
							content: '',
							position: 'absolute',
							pe: 'none',
							top: '0',
							left: '0',
							right: '0',
							bottom: '0',
							backgroundImage: 'url(/images/greek-repeat.jpeg)',
							backgroundRepeat: 'repeat',
							opacity: '0.05',
							minHeight: '100%',
							'mask-image': 'radial-gradient(circle at 50% 50%, transparent 40%, black)',
						},
					}}
				>
					<Box>
						<Flex direction="column" css={{ minHeight: '100vh' }}>
							<Header isLandingPage />
							<Flex align="center" css={{ flex: '1' }}>
								<Box>
									<Box>
										<Flex justify="center" align="center" css={{ position: 'relative' }}>
											<Z3usBrandLanding />
											<Box
												css={{
													width: '507px',
													height: '197px',
													position: 'absolute',
													bottom: '-90px',
													left: '-90px',
													pointerEvents: ' none',
												}}
											>
												<Image as="img" alt="shadow" src="/images/landing-shadow.png" width={507} height={197} />
											</Box>
										</Flex>
									</Box>
									<Box>
										<Box css={{ py: '50px' }}>
											<Text as="h1" size="14" bold css={{ pb: '$2' }}>
												<Box
													as="span"
													css={{
														position: 'relative',
														'&:before': {
															content: '',
															background: 'rgba(255,255,255,0.1)',
															position: 'absolute',
															transition: '$default',
															br: '$2',
															inset: '0px -5px -5px -5px',
														},
													}}
												>
													{/*defi, nft, token, crypto, staking, animate text with anime.js */}
													<Box as="span" css={{ position: 'relative', textTransform: 'capitalize' }}>
														Coming soon!
													</Box>
												</Box>
											</Text>
											<Text size="9" regular css={{ py: '$5' }}>
												A community centric open source browser wallet for the{' '}
												<StyledLink bubble href="https://www.radixdlt.com/">
													Radix DLT
												</StyledLink>{' '}
												network.
											</Text>
											<Text fira size="7" regular css={{ py: '$3' }}>
												Manage accounts, send and receive tokens, stake tokens to receive rewards and connect to DApps
												from the z3us browser wallet.
											</Text>
											<Flex css={{ mt: '$6' }}>
												<Button
													target="_blank"
													href="https://t.me/z3us_dapps/4"
													as="a"
													size="6"
													color="secondary"
													css={{
														width: '200px',
														'&&': {
															color: '$white',
															backgroundColor: '#ff9400',
															hover: {
																backgroundColor: '#ffa72e',
															},
														},
													}}
												>
													Get BETA access!
												</Button>
											</Flex>
										</Box>
									</Box>
								</Box>
							</Flex>
							<Box css={{ py: '$5' }}>
								<Flex justify="end">
									<Flex>
										<Link href="/" passHref>
											<StyledLink>
												<Z3usLogoText
													css={{
														width: '100px',
														transition: '$default',
														color: '#8b50a0',
														'&:hover': {
															color: '#fff',
														},
													}}
												/>
											</StyledLink>
										</Link>
									</Flex>
									{/*<Flex justify="end" gap="3" css={{ flex: '1' }}>
									<Link href="/privacy" passHref>
										<StyledLink underlineOnHover>
											<Text>Privacy</Text>
										</StyledLink>
									</Link>
									<Link href="/terms" passHref>
										<StyledLink underlineOnHover>
											<Text>Terms</Text>
										</StyledLink>
									</Link>
								</Flex>*/}
								</Flex>
							</Box>
						</Flex>
					</Box>
				</Box>
			</Box>
		</>
	)
}
