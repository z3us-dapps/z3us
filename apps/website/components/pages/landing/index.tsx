/* eslint-disable */
import React from 'react'
import { LightningBoltIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import { useImmer } from 'use-immer'
import { Container, Grid } from '@nextui-org/react'
import { Box, Text, Flex, StyledLink } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import { Header } from '../../header'
import { Z3usBrandLanding } from '../../z3us-brand-landing'
import { Z3usLogoText } from 'ui/src/components/z3us-logo-text'
import shadowImage from '../../../public/images/landing-shadow.png'

export const LandingPage: React.FC = () => {
	const [state, setState] = useImmer({
		to: '',
		amount: '',
		message: 'this is z3us test',
		encrypted: '',
	})

	return (
		<>
			<NextSeo
				openGraph={{
					type: 'website',
					url: 'https://www.example.com/page',
					title: 'Open Graph Title',
					description: 'Open Graph Description',
					images: [
						{
							url: 'https://www.example.com/og-image.jpg',
							width: 800,
							height: 600,
							alt: 'Og Image Alt',
						},
						{
							url: 'https://www.example.com/og-image-2.jpg',
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
					}}
				>
					<Container gap={0}>
						<Flex direction="column" css={{ minHeight: '100vh' }}>
							<Header isLandingPage />
							<Flex align="center" css={{ flex: '1' }}>
								<Grid.Container gap={0} justify="center" css={{ border: '0px solid red' }}>
									<Grid xs={4}>
										<Flex align="center" css={{ position: 'relative' }}>
											<Z3usBrandLanding />
											<Box
												css={{ width: '507px', height: '197px', position: 'absolute', bottom: '-90px', left: '-90px' }}
											>
												<Image alt="shadow" src={shadowImage} layout="fixed" width={507} height={197} />
											</Box>
										</Flex>
									</Grid>
									<Grid xs={6}>
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
													<Box as="span" css={{ position: 'relative', color_: '#27ff00', textTransform: 'capitalize' }}>
														web3
													</Box>
												</Box>{' '}
												wallet
											</Text>
											<Text size="9" regular css={{ py: '$3' }}>
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
													href="https://www.radixdlt.com/"
													as="a"
													size="6"
													color="secondary"
													css={{ width: '200px', '&&': { backgroundColor: '#ff9400' } }}
													clickable={false}
												>
													Coming soon{' '}
													<Box css={{ width: '20px' }}>
														<LightningBoltIcon />
													</Box>
												</Button>
											</Flex>
										</Box>
									</Grid>
								</Grid.Container>
							</Flex>
							<Box css={{ py: '$5' }}>
								<Flex>
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
									<Flex justify="end" gap="3" css={{ flex: '1' }}>
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
									</Flex>
								</Flex>
							</Box>
						</Flex>
					</Container>
				</Box>
			</Box>
		</>
	)
}
