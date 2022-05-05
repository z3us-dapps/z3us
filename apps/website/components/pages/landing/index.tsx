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

			<Box
				css={{
					//background: '$black',
					//color: '$white',
					minHeight: '100vh',
				}}
			>
				<Box
					css={{
						//background: 'radial-gradient(circle, rgba(115,24,205,1) 0%, rgba(115,24,205,0.7) 100%)',
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
							opacity: '0.03',
							minHeight: '100%',
							'mask-image': 'radial-gradient(circle at 50% 50%, transparent 40%, black)',
						},
					}}
				>
					<Container gap={0} css={{ position: 'relative' }}>
						<Flex direction="column" css={{ minHeight: '100vh' }}>
							<Header isLandingPage />
							<Flex
								css={{
									flex: '1',
									position: 'relative',
									'&:before': {
										content: '',
										position: 'absolute',
										pe: 'none',
										top: '0',
										left: '-40px',
										right: '-40px',
										bottom: '0',
										background: 'linear-gradient(180deg, rgba(65,58,154,1) 0%, rgba(132,52,143,1) 100%)',
										br: '20px',
									},
								}}
							>
								<Grid.Container
									gap={0}
									justify="center"
									css={{
										position: 'relative',
										color: '$white',
									}}
								>
									<Grid xs={12} md={1}></Grid>
									<Grid xs={12} md={5} justify={isLg ? 'center' : 'flex-start'}>
										<Flex align="center">
											<Box>
												<Text bold size="9">
													Control
												</Text>
											</Box>
										</Flex>
									</Grid>
									<Grid xs={12} md={6}>
										<Box>sdf asdfasdf</Box>
									</Grid>
								</Grid.Container>
							</Flex>
							{/*FOOTER*/}
							<Box css={{ py: '$8' }}>
								<Grid.Container gap={0} justify="center">
									<Grid xs={12} md={6} justify={isLg ? 'center' : 'flex-start'}>
										<Flex align="center" css={{ position: 'relative' }}>
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
									</Grid>
									<Grid xs={12} md={6}>
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
									</Grid>
								</Grid.Container>
							</Box>
						</Flex>
					</Container>
				</Box>
			</Box>
		</>
	)
}
