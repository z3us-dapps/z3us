import React from 'react'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { Container, Grid } from '@nextui-org/react'
import { Box, Text, Flex, StyledLink, Image } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import { Header } from 'components/header'
import { Z3usBrandLanding } from 'components/z3us-brand-landing'
import { Z3usLogoText } from 'ui/src/components/z3us-logo-text'
import { config } from 'config'
import { useMediaQuery } from '@/hooks/use-media-query'

export const LandingPage: React.FC = () => {
	const isLg = useMediaQuery(1280)
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

			<Box>
				<Box
					css={{
						minHeight: '100vh',
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
							opacity: '0.03',
							minHeight: '100%',
							'mask-image': 'radial-gradient(circle at 50% 50%, transparent 40%, black)',
						},
					}}
				>
					<Container css={{ position: 'relative' }}>
						<Flex direction="column" css={{ minHeight: '100vh' }}>
							<Header isLandingPage />
							<Flex css={{ flex: '1' }}>
								<Grid.Container
									gap={2}
									justify="center"
									css={{
										position: 'relative',
									}}
								>
									<Grid xs={12} md={12}>
										<Flex
											align="center"
											css={{
												position: 'relative',
												background: 'linear-gradient(180deg, #7345fc, #4f21e6 100%)',
												borderRadius: '32px',
												width: '100%',
												gap: '12px',
												color: '$white',
												overflow: 'hidden',

												'&:before': {
													content: '',
													position: 'absolute',
													pe: 'none',
													top: '0',
													left: '0',
													right: '0',
													bottom: '0',
													backgroundImage: 'url(/images/landing-lightening-bg.png)',
													backgroundRepeat: 'no-repeat',
													backgroundPosition: 'top right',
													opacity: '0.6',
													minHeight: '100%',
													//'mask-image': 'radial-gradient(circle at 50% 50%, transparent 40%, black)',
												},
											}}
										>
											<Box css={{ width: '50%', flexBasis: '50%', position: 'relative' }}>
												<Box css={{ pt: '150px', pb: '150px', pl: '105px' }}>
													<Text bold size="14">
														Control your future. Finance at your fingertips.
													</Text>
													<Text size="7" css={{ pt: '20px', lineHeight: '30px' }}>
														Manage accounts, send and receive tokens, stake tokens to receive rewards and connect to
														DApps from the Z3US browser wallet.
													</Text>
													<Flex css={{ mt: '$6' }}>
														<Button
															target="_blank"
															href="https://t.me/z3us_dapps/4"
															as="a"
															size="6"
															color="secondary"
															rounded
															css={{
																width: '200px',
																backgroundColor: '#FFFFFF',
																'&:hover': {
																	backgroundColor: '#eee',
																},
															}}
														>
															Get BETA access
														</Button>
													</Flex>
												</Box>
											</Box>
											<Flex
												align="center"
												justify="center"
												css={{ width: '50%', flexBasis: '50%', position: 'relative' }}
											>
												<img src="images/landing-product-bg.png" alt="product" style={{ width: '398px' }} />
											</Flex>
										</Flex>
									</Grid>
								</Grid.Container>
							</Flex>
							{/*<Flex>
								<Grid.Container
									gap={2}
									justify="center"
									css={{
										position: 'relative',
										color: '$white',
									}}
								>
									<Grid xs={12} md={6} justify={isLg ? 'center' : 'flex-start'}>
										<Flex
											align="center"
											css={{ py: '100px', backgroundColor: '#ffcd6c', borderRadius: '32px', width: '100%' }}
										>
											<Box>
												<Text bold size="9">
													Control your future. Finance at your fingertips.
												</Text>
												<Text size="6" css={{ pt: '20px' }}>
													Manage accounts, send and receive tokens, stake tokens to receive rewards and connect to DApps
													from the Z3US browser wallet.
												</Text>
											</Box>
										</Flex>
									</Grid>
									<Grid xs={12} md={6}>
										<Box css={{ backgroundColor: '#75ccb2', borderRadius: '32px', width: '100%' }}>sdf asdfasdf</Box>
									</Grid>
								</Grid.Container>
							</Flex>

							<Flex>
								<Grid.Container
									gap={2}
									justify="center"
									css={{
										position: 'relative',
									}}
								>
									<Grid xs={12} md={12}>
										<Flex
											align="center"
											justify="center"
											css={{
												background: '#e4ddf7',
												borderRadius: '32px',
												width: '100%',
												gap: '12px',
												textAlign: 'center',
											}}
										>
											<Box css={{ pt: '150px', pb: '150px', px: '105px' }}>
												<Text bold size="14">
													Control your future. Finance at your fingertips.
												</Text>
												<Text size="7" css={{ pt: '20px', lineHeight: '30px' }}>
													Manage accounts, send and receive tokens, stake tokens to receive rewards and connect to DApps
													from the Z3US browser wallet.
												</Text>
											</Box>
										</Flex>
									</Grid>
								</Grid.Container>
							</Flex>*/}

							{/*FOOTER*/}
							<Flex>
								<Grid.Container
									gap={2}
									justify="center"
									css={{
										position: 'relative',
										mt: '47px',
									}}
								>
									<Grid xs={6}>
										<Flex align="center" css={{ width: '100%' }}>
											<Box css={{ p: '24px' }}>
												<Text size="4" color="help">
													&copy; {new Date().getFullYear()} Z3US
												</Text>
											</Box>
										</Flex>
									</Grid>
									<Grid xs={6}>
										<Box css={{ width: '100%' }}>
											<Flex justify="end" gap="3" css={{ flex: '1', p: '24px' }}>
												<Link href="/privacy" passHref>
													<StyledLink underlineOnHover>
														<Text size="5" color="help">
															Privacy
														</Text>
													</StyledLink>
												</Link>
												<Link href="/terms" passHref>
													<StyledLink underlineOnHover>
														<Text size="5" color="help">
															Terms
														</Text>
													</StyledLink>
												</Link>
											</Flex>
										</Box>
									</Grid>
								</Grid.Container>
							</Flex>
						</Flex>
					</Container>
				</Box>
			</Box>
		</>
	)
}
