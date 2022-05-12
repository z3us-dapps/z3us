import React from 'react'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { Container, Row, Col } from 'react-grid-system'
import { Box, Text, Flex, StyledLink } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import { Header } from 'components/header'
import { PageContainer } from 'components/page-container'
import { config } from 'config'
import { BrowserIconLinks } from './browser-icon-links'

export const LandingPage: React.FC = () => (
	<>
		<NextSeo
			title="An open source UX driven web3 wallet built for DeFi & NFTs "
			openGraph={{
				type: 'website',
				url: config.Z3US_URL,
				title: config.OPEN_GRAPH_TITLE,
				description: config.OPEN_GRAPH_DESCRIPTION,
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

		<Header isLandingPage />
		<PageContainer>
			<Container fluid>
				<Row>
					<Col>
						<Flex
							css={{
								position: 'relative',
								flexDirection: 'column-reverse',
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
									backgroundSize: 'auto 100%',
									opacity: '0.4',
									minHeight: '100%',
								},
								'@md': {
									flexDirection: 'row',
									'&:before': {
										opacity: '0.7',
										backgroundRepeat: 'no-repeat',
										backgroundPosition: 'top right',
										backgroundSize: 'auto 100%',
									},
								},
							}}
						>
							<Box
								css={{
									width: '100%',
									flexBasis: '100%',
									position: 'relative',
									pt: '20px',
									pb: '50px',
									px: '20px',
									'@xs': { px: '5%' },
									'@md': { width: '50%', flexBasis: '50%', pt: '150px', pb: '150px', pl: '40px' },
									'@lg': { pl: '100px' },
								}}
							>
								<Box>
									<Text
										bold
										size="14"
										css={{
											fontFamily: '$HaasGrotDisplayRound',
											'@xs': { fontSize: '40px', lineHeight: '48px' },
											'@md': { fontSize: '60px', lineHeight: '64px' },
										}}
									>
										Control your future. DeFi at your fingertips.
									</Text>
									<Text
										size="7"
										css={{
											pt: '20px',
											fontFamily: '$HaasGrotTextRound',
											fontSize: '20px',
											lineHeight: '30px',
										}}
									>
										Manage accounts, send and receive tokens, stake tokens to receive rewards and connect to DApps from
										the Z3US browser wallet.
									</Text>
									<Flex css={{ mt: '$6', justifyContent: 'center', '@md': { justifyContent: 'flex-start' } }}>
										<Button
											target="_blank"
											href="https://t.me/z3us_dapps/4"
											as="a"
											size="6"
											color="secondary"
											rounded
											css={{
												width: '180px',
												color: '$black',
												backgroundColor: '#FFFFFF',
												fontFamily: '$HaasGrotTextRound',
												fontSize: '18px',
												lineHeight: '24px',
												'&:hover': {
													backgroundColor: '#eee',
												},
											}}
										>
											Install BETA
										</Button>
									</Flex>
									<Flex
										justify="center"
										align="center"
										direction="column"
										css={{ mt: '$5', width: '100%', '@xs': { maxWidth: '100%' }, '@md': { maxWidth: '180px' } }}
									>
										<Text css={{ pb: '15px', fontFamily: '$HaasGrotTextRound', fontSize: '13px', lineHeight: '14px' }}>
											Available in:
										</Text>
										<BrowserIconLinks />
									</Flex>
								</Box>
							</Box>

							<Flex
								align="center"
								justify="center"
								css={{
									width: '100%',
									flexBasis: '100%',
									position: 'relative',
									pt: '20px',
									pb: '0px',
									px: '20px',
									img: {
										maxWidth: '100%',
									},
									'@md': { width: '50%', flexBasis: '50%', position: 'relative', pt: '34px', pb: '44px' },
								}}
							>
								<img src="images/landing-product-bg.png" alt="product" style={{ width: '398px' }} />
							</Flex>
						</Flex>
					</Col>
				</Row>
				<Row>
					<Col>
						<Flex align="center" css={{ width: '100%', pt: '30px' }}>
							<Box css={{ px: '24px' }}>
								<Text
									as="p"
									color="help"
									css={{
										fontFamily: '$HaasGrotTextRound',
										fontSize: '13px',
										lineHeight: '14px',
									}}
								>
									&copy; {new Date().getFullYear()} Z3US
								</Text>
							</Box>
						</Flex>
					</Col>
					<Col>
						<Box css={{ width: '100%' }}>
							<Flex justify="end" gap="3" css={{ flex: '1', px: '24px', color: '$txtHelp', pt: '30px' }}>
								<Link href="/privacy" passHref>
									<StyledLink underlineOnHover>
										<Text
											as="p"
											css={{
												fontFamily: '$HaasGrotTextRound',
												fontSize: '13px',
												lineHeight: '14px',
											}}
										>
											Privacy
										</Text>
									</StyledLink>
								</Link>

								<Link href="/terms" passHref>
									<StyledLink underlineOnHover>
										<Text
											as="p"
											css={{
												fontFamily: '$HaasGrotTextRound',
												fontSize: '13px',
												lineHeight: '14px',
											}}
										>
											Terms
										</Text>
									</StyledLink>
								</Link>
							</Flex>
						</Box>
					</Col>
				</Row>
			</Container>
		</PageContainer>
	</>
)
