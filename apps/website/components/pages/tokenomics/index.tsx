import React from 'react'
import { NextSeo } from 'next-seo'
import { Box, Text, Flex, StyledLink } from 'ui/src/components/atoms'
import { Header } from 'components/header'
import { Footer } from 'components/footer'
import { PageContainer } from 'components/page-container'
import { getHeadTailString } from 'ui/src/utils/get-head-tail-string'
import { mediaSizes } from 'ui/src/theme'
import { useMediaQuery } from 'hooks/use-media-query'
import { LandingHoverCard } from 'components/landing-hover-card'
import { config } from 'config'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

const ALLOCATION_WIDTH = '200px'
const Z3US_ADDRESS = 'z3us_rr1q0gxzdty8egrkegk9lnteth09sgzqgxaw5ytqzq24ceq3eqagc'
const TOKEN_EXPLORER_URL = `${config.EXPLORER_URL}/tokens/${Z3US_ADDRESS}`
const TOKENOMICS_TEAM = 'tokenomics_team'
const TOKENOMICS_AIRDROPS = 'tokenomics_airdrops'
const TOKENOMICS_LIQUIDITY = 'tokenomics_liquidity'

const tokenomicsData = {
	[TOKENOMICS_TEAM]: {
		label: 'Founders / Team',
		textColor: 'rgb(242, 0, 255)',
		borderColor: 'rgb(242, 0, 255)',
		backgroundColor: 'rgba(242, 0, 255, 0.3)',
		allocation: 15,
	},
	[TOKENOMICS_LIQUIDITY]: {
		label: 'Liquidity pool',
		textColor: 'rgb(135, 235, 56)',
		borderColor: 'rgb(135, 235, 56)',
		backgroundColor: 'rgba(135, 235, 56, 0.3)',
		allocation: 20,
	},
	[TOKENOMICS_AIRDROPS]: {
		label: 'Airdrops',
		textColor: 'rgb(255, 241, 0)',
		borderColor: 'rgb(255, 241, 0)',
		backgroundColor: 'rgba(255, 241, 0, 0.3)',
		allocation: 65,
	},
}

const chartOptions = {
	plugins: {
		legend: {
			display: false,
		},
	},
}

export const data = {
	labels: Object.values(tokenomicsData).map(({ label }) => label),
	datasets: [
		{
			data: Object.values(tokenomicsData).map(({ allocation }) => allocation),
			borderColor: Object.values(tokenomicsData).map(({ borderColor }) => borderColor),
			backgroundColor: Object.values(tokenomicsData).map(({ backgroundColor }) => backgroundColor),
			borderWidth: 1,
			tooltip: {
				callbacks: {
					label: ({ label, formattedValue, chart }) => {
						let sum = 0
						const dataArr = chart.data.datasets[0].data
						// eslint-disable-next-line no-return-assign
						dataArr.map(_data => (sum += Number(_data)))
						const percentage = `${((formattedValue * 100) / sum).toFixed(0)} %`
						return ` ${label}: ${percentage}`
					},
				},
			},
		},
	],
}

ChartJS.register(ArcElement, Tooltip, Legend)

export const TokenomicsPage: React.FC = () => {
	const isMd = useMediaQuery(mediaSizes.md)
	return (
		<>
			<NextSeo
				title="Tokenomics"
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
			<Flex direction="column" css={{ minHeight: '100vh' }}>
				<Header />
				<Box
					css={{
						// TODO fix
						//position: 'relative',
						position: isMd ? 'relative' : 'relative',
						flex: '1',
					}}
				>
					<PageContainer>
						<LandingHoverCard
							hoverColor="rgb(126 133 238)"
							css={{
								position: 'relative',
								flexDirection: 'column',
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
									pb: '0px',
									px: '10%',
									pt: '10%',
									'@sm': { px: '15%', pt: '10%', pb: '5%' },
									'@md': {
										ta: 'left',
										width: '50%',
										flexBasis: '50%',
										pt: '100px',
										pb: '80px',
										pl: '40px',
										pr: '0px ',
									},
									'@lg': { pl: '100px', pt: '150px', pb: '150px' },
								}}
							>
								<Box>
									<Text
										bold
										css={{
											fontSize: '40px',
											lineHeight: '44px',
											'@xs': { fontSize: '40px', lineHeight: '48px' },
											'@md': { fontSize: '60px', lineHeight: '64px', whiteSpace: 'nowrap' },
										}}
									>
										Tokenomics
									</Text>
									<Text
										size="7"
										css={{
											pt: '20px',
											fontSize: '16px',
											lineHeight: '20px',
											'@md': { fontSize: '18px', lineHeight: '28px' },
										}}
									>
										<StyledLink underline href={TOKEN_EXPLORER_URL} target="_blank">
											$Z3US
										</StyledLink>{' '}
										is a native token on the radix DLT network. It is designed to be a deflationary utility token, where
										tokens will be burned and removed from the supply as the wallet usage increases.
										<br />
										<br />
										The purpose of the $Z3US utility token is to create ongoing incentives for ecosystem participants,
										thereby encouraging a community around the Z3US ecosystem to improve and maintain the wallet and
										related products.
									</Text>
								</Box>
							</Box>
							<Flex
								align="center"
								justify="center"
								css={{
									width: '100%',
									flexBasis: '100%',
									position: 'relative',
									pb: '0px',
									px: '10%',
									pt: '5%',
									img: {
										maxWidth: '100%',
									},
									'@sm': { px: '15%', pt: '0' },
									'@md': {
										width: '50%',
										flexBasis: '50%',
										position: 'relative',
										py: '10%',
										pb: '44px',
										pr: '40px',
										pl: '40px',
									},
									'@lg': { pr: '100px' },
								}}
							>
								<Flex
									justify="center"
									css={{
										pb: '10%',
										pl: '0px',
										mt: '0px',
										width: '100%',
										height: '100%',
										'@sm': { px: '0', mt: '0', pt: '0' },
									}}
								>
									<Flex
										align="center"
										direction="column"
										css={{
											background: 'rgba(17,39,94, 0.7)',
											width: '100%',
											height: '100%',
											br: '20px',
											p: '30px',
											gap: '30px',
											boxShadow: '$accountPanelShadow',
											'@sm': { flexDirection: 'row' },
										}}
									>
										<Box
											css={{
												width: '100%',
												'@sm': { width: '50%' },
												'@md': { width: '200px' },
												'@lg': { width: '250px' },
											}}
										>
											<Doughnut data={data} options={chartOptions} />
										</Box>
										<Flex direction="column" css={{ flex: '1', width: '100%' }}>
											{Object.entries(tokenomicsData).map(([key, { textColor, label, allocation }], idx) => (
												<Box
													key={key}
													css={{
														...(idx !== 0
															? {
																	borderTop: `1px solid rgba(82, 85, 185, 0.9)`,
																	pt: '20px',
																	mt: '20px',
															  }
															: {}),
													}}
												>
													<Text bold size="8" css={{ opacity: '0.9', color: textColor }}>
														{allocation}%
													</Text>
													<Text size="4" css={{ opacity: '0.9', mt: '3px' }}>
														{label}
													</Text>
												</Box>
											))}
										</Flex>
									</Flex>
								</Flex>
							</Flex>
						</LandingHoverCard>
						<Flex
							css={{
								display: 'flex',
								flexDirection: 'column',
								pt: '48px',
								gap: '24px',
								ta: 'center',
								maxWidth: '700px',
								justifyContent: 'center',
								alignItems: 'center',
								mx: 'auto',
								'@md': { flexDirection: 'row', pt: '24px', maxWidth: '100%' },
							}}
						>
							<Box css={{ width: '100%', flexBasis: '100%', '@md': { width: '33.33%', flexBasis: '33.33%' } }}>
								<LandingHoverCard
									hoverColor="rgba(255, 255, 255)"
									css={{
										width: '100%',
										display: 'block',
										flexBasis: '100%',
										backgroundColor: '#e4dcf7',
										borderRadius: '32px',
										transition: '$default',
									}}
								>
									<Flex
										justify="center"
										direction="column"
										css={{ height: '100%', px: '20px', pt: '60px', pb: '60px', '@md': { px: '50px' } }}
									>
										<Text medium size="6" css={{ color: '#3d3550' }}>
											Token symbol
										</Text>
										<Text bold size="10" css={{ color: '#3d3550', mt: '$4' }}>
											$Z3US
										</Text>
									</Flex>
								</LandingHoverCard>
							</Box>
							<Box css={{ width: '100%', flexBasis: '100%', '@md': { width: '33.33%', flexBasis: '33.33%' } }}>
								<LandingHoverCard
									hoverColor="rgba(255, 255, 255)"
									css={{
										width: '100%',
										display: 'block',
										flexBasis: '100%',
										backgroundColor: '#e4dcf7',
										borderRadius: '32px',
										transition: '$default',
									}}
								>
									<Flex
										justify="center"
										direction="column"
										css={{ height: '100%', px: '20px', pt: '60px', pb: '60px', '@md': { px: '50px' } }}
									>
										<Text medium size="6" css={{ color: '#3d3550' }}>
											Token supply
										</Text>
										<Text bold size="10" css={{ color: '#3d3550', mt: '$4' }}>
											200,000,000
										</Text>
									</Flex>
								</LandingHoverCard>
							</Box>
							<Box css={{ width: '100%', flexBasis: '100%', '@md': { width: '33.33%', flexBasis: '33.33%' } }}>
								<StyledLink href={TOKEN_EXPLORER_URL} target="_blank">
									<LandingHoverCard
										hoverColor="rgba(255, 255, 255)"
										css={{
											cursor: 'pointer',
											width: '100%',
											display: 'block',
											flexBasis: '100%',
											backgroundColor: '#e4dcf7',
											borderRadius: '32px',
											transition: '$default',
											'&:hover': {
												opacity: '0.8',
											},
										}}
									>
										<Flex
											justify="center"
											direction="column"
											css={{ height: '100%', px: '20px', pt: '60px', pb: '60px', '@md': { px: '50px' } }}
										>
											<Text medium size="6" css={{ color: '#3d3550' }}>
												Token address
											</Text>
											<Text bold size="10" css={{ color: '#3d3550', mt: '$4' }}>
												{getHeadTailString(Z3US_ADDRESS, 5)}
											</Text>
										</Flex>
									</LandingHoverCard>
								</StyledLink>
							</Box>
						</Flex>
						<Box
							css={{
								mt: '40px',
							}}
						>
							<Box>
								<Text size="7" bold css={{ pb: '20px' }}>
									Token metrics
								</Text>
								<Flex direction="column" css={{ gap: '10px' }}>
									<Flex>
										<Box as="span" css={{ width: ALLOCATION_WIDTH }}>
											<Text size="4">Total supply</Text>
										</Box>
										<Box as="span">
											<Text size="4">
												200,000,000 <b>$Z3US</b>
											</Text>
										</Box>
									</Flex>
									<Flex>
										<Box as="span" css={{ width: ALLOCATION_WIDTH }}>
											<Text size="4">Initial supply</Text>
										</Box>
										<Box as="span">
											<Text size="4">
												200,000,000 <b>$Z3US</b>
											</Text>
										</Box>
									</Flex>
								</Flex>
							</Box>
							<Box css={{ mt: '40px' }}>
								<Text size="7" bold css={{ pb: '20px' }}>
									Token allocation
								</Text>
								<Flex direction="column" css={{ gap: '10px' }}>
									{Object.entries(tokenomicsData).map(([key, { label, allocation }]) => (
										<Flex key={key}>
											<Box as="span" css={{ width: ALLOCATION_WIDTH }}>
												<Text size="4">{label}</Text>
											</Box>
											<Box as="span">
												<Text size="4">{allocation}%</Text>
											</Box>
										</Flex>
									))}
								</Flex>
								<Text color="help" css={{ pt: '10px' }}>
									Note: these percentages are approximate and subject to change depending on the size and growth of the
									team initiatives.
								</Text>
							</Box>
							<Box css={{ mt: '40px' }}>
								<Text size="7" bold css={{ pb: '20px' }}>
									Token utility
								</Text>
								<Box>
									<Text size="4">
										The first and primary utility of the $Z3US token will be to reduce swap fees in the wallet.
										<br />A 50% fee discount applies to ecosystem participants who hold $Z3US tokens in their wallet,
										and opt-in to burning $Z3US tokens on the swap transaction.
									</Text>
								</Box>
								<Text color="help" css={{ pt: '10px' }}>
									Note: Z3US reserves the right to modify these fees, at any time, in its sole discretion.
								</Text>
							</Box>
							<Box css={{ mt: '40px', pb: '80px' }}>
								<Text size="7" bold css={{ pb: '20px' }}>
									Token model
								</Text>
								<Text size="4">
									The token modal will be deflationary over time. Z3US will charge a fee when participants use the{' '}
									<b>swap</b> feature in the wallet. <br />
									<br />
									If the user has $Z3US tokens in the wallet and selects the option to burn $Z3US tokens when using the{' '}
									<b>swap</b> feature, the fee charge is a flat 0.1% transaction. Of that fee, 50% be <b>burnt</b>. The
									remaining 50% of the fee will go to the <b>development</b> wallet.
									<br />
									<br />
									If the user selects <i>not</i> to burn $Z3US tokens on the swap, the fee charge a flat 0.2%
									transaction. All of that 0.2% fee will go to the <b>development</b> wallet, to help fund development.
								</Text>
								<Text color="help" css={{ pt: '10px' }}>
									Note: Rates that appear in the Z3US wallet are calculated with fees applied. Z3US reserves the right
									to modify these fees at any time, in its sole discretion.
								</Text>
							</Box>
						</Box>
					</PageContainer>
				</Box>
				<Footer />
			</Flex>
		</>
	)
}
