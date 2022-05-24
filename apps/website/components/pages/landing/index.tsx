import React from 'react'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import { Box, Text, Flex, StyledLink } from 'ui/src/components/atoms'
import { mediaSizes } from 'ui/src/theme'
import { Header } from 'components/header'
import { ThemePickerMenu } from 'components/theme-picker-menu'
import { PageContainer } from 'components/page-container'
import { FlashCtaButton } from 'components/flash-cta-button'
import { config } from 'config'
import { useMediaQuery } from 'hooks/use-media-query'
import { BrowserIconLinks } from './browser-icon-links'
import ProductImage from '../../../public/images/landing-product-bg.png'
import ProductUxImage from '../../../public/images/landing-product-ux-bg.png'
import RadixLogoImage from '../../../public/images/radix-logo.svg'

export const LandingPage: React.FC = () => {
	const isMd = useMediaQuery(mediaSizes.md)
	return (
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

			<Header />
			<PageContainer>
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
							pt: '10px',
							pb: '50px',
							px: '20px',
							'@xs': { px: '5%' },
							'@sm': { px: '15%', ta: 'center' },
							'@md': { ta: 'left', width: '50%', flexBasis: '50%', pt: '150px', pb: '150px', pl: '40px', pr: '0px ' },
							'@lg': { pl: '100px' },
						}}
					>
						<Box>
							<Text
								bold
								css={{
									fontSize: '40px',
									lineHeight: '44px',
									fontFamily: '$HaasGrotDisplayRound',
									'@xs': { fontSize: '40px', lineHeight: '48px' },
									'@md': { fontSize: '60px', lineHeight: '64px', whiteSpace: 'nowrap' },
								}}
							>
								Control your future.
							</Text>
							<Text
								bold
								css={{
									fontSize: '40px',
									lineHeight: '44px',
									fontFamily: '$HaasGrotDisplayRound',
									'@xs': { fontSize: '40px', lineHeight: '48px' },
									'@md': { fontSize: '60px', lineHeight: '64px' },
								}}
							>
								<Box
									as="span"
									css={{
										backgroundClip: 'text',
										backgroundImage: 'linear-gradient(#e0a2ff 0%, #dbf2f2 50%, #ffffff 100%)',
										'-webkit-text-fill-color': 'transparent',
									}}
								>
									DeFi
								</Box>{' '}
								at your fingertips.
							</Text>
							<Text
								size="7"
								css={{
									pt: '20px',
									fontFamily: '$HaasGrotTextRound',
									fontSize: '18px',
									lineHeight: '22px',
									'@md': { fontSize: '20px', lineHeight: '30px' },
								}}
							>
								Manage accounts, send and receive tokens, stake tokens to receive rewards and connect to DApps from the
								Z3US browser wallet.
							</Text>
							<Flex css={{ mt: '$6', justifyContent: 'center', '@md': { justifyContent: 'flex-start' } }}>
								<FlashCtaButton />
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
							img: {
								maxWidth: '100%',
							},
							'@md': { width: '50%', flexBasis: '50%', position: 'relative', pt: '34px', pb: '44px' },
						}}
					>
						<Image src={ProductImage} alt="Z3US Wallet" width={398} height={671} />
					</Flex>
				</Flex>
				<Flex
					css={{
						display: 'block',
						'@md': { display: 'flex', gap: '24px' },
						mt: '24px',
					}}
				>
					<Box
						css={{
							width: '100%',
							flexBasis: '100%',
							backgroundColor: '#ffcb6b',
							borderRadius: '32px',
							'@md': { width: '50%', flexBasis: '50%' },
						}}
					>
						<Box css={{ px: '20px', pt: '50px', pb: '20px', '@md': { px: '50px' } }}>
							<Text displayRound size="12" css={{ color: '#5d3f09' }}>
								UX driven.
							</Text>
						</Box>
						<Flex
							justify="center"
							css={{
								overflow: 'hidden',
								height: 'auto',
								'@md': {
									height: '572px',
								},
							}}
						>
							<Image
								layout={isMd ? 'fixed' : 'intrinsic'}
								src={ProductUxImage}
								alt="Z3US Wallet"
								width={398}
								height={671}
							/>
						</Flex>
					</Box>
					<Flex
						direction="column"
						justify="end"
						css={{
							width: '100%',
							flexBasis: '100%',
							backgroundColor: '#75cdb1',
							borderRadius: '32px',
							mt: '24px',
							px: '20px',
							py: '50px',
							'@md': { width: '50%', flexBasis: '50%', p: '50px', mt: '0' },
						}}
					>
						<Box
							css={{ '@sm': { ta: 'center', maxWidth: '80%', mx: 'auto' }, '@md': { ta: 'left', maxWidth: '100%' } }}
						>
							<Image layout="fixed" src={RadixLogoImage} alt="Z3US Wallet" width={94} height={24} />
							<Text
								displayRound
								size="12"
								css={{ color: '#14372c', mt: '$5', '@md': { fontSize: '48px', lineHeight: '54px' } }}
							>
								An open source community centered wallet for the Radix DLT network.
							</Text>
							<Text size="4" css={{ color: '#14372c', mt: '$3' }}>
								<StyledLink underlineOnHover href={config.RADIX_URL}>
									Learn more &#8594;
								</StyledLink>
							</Text>
						</Box>
					</Flex>
				</Flex>
				<Flex css={{ mt: '24px', pb: '40px' }}>
					<Box
						css={{
							width: '100%',
							flexBasis: '100%',
							backgroundColor: '#e4dcf7',
							borderRadius: '32px',
							py: '50px',
							px: '20px',
							ta: 'center',
							'@md': {
								py: '70px',
							},
						}}
					>
						<Box
							css={{
								mx: 'auto',
								ta: 'left',
								maxWidth: '100%',
								'@sm': { ta: 'center', maxWidth: '80%' },
								'@md': { maxWidth: '70%' },
							}}
						>
							<Text displayRound css={{ color: '#3d3550', fontSize: '44px', lineHeight: '48px' }}>
								First class security with{' '}
								<StyledLink bubble href="https://www.ledger.com/">
									Ledger
								</StyledLink>{' '}
								support and transparent code.
							</Text>
							<Text color="help" size="4" css={{ mt: '20px', color: '#766e89' }}>
								Download and use Z3US wallet for{' '}
								<StyledLink underline href={config.RADIX_URL}>
									Radix DLT
								</StyledLink>{' '}
								in your favourite browser today!
							</Text>

							<Flex
								justify="center"
								align="center"
								direction="column"
								css={{
									mt: '$6',
									width: '100%',
									'@xs': { maxWidth: '100%' },
								}}
							>
								<Text size="4" css={{ pb: '15px', color: '#766e89' }}>
									Available in:
								</Text>
								<BrowserIconLinks />
							</Flex>
						</Box>
					</Box>
				</Flex>
				<Flex align="start">
					<Flex align="center" css={{ width: '100%', pt: '30px' }}>
						<Box css={{ px: '0px', '@md': { px: '24px' } }}>
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
					<Box css={{ width: '100%' }}>
						<Flex
							align="center"
							justify="end"
							css={{
								flex: '1',
								color: '$txtHelp',
								pt: '21px',
								pb: '20px',
								'@md': { px: '24px' },
							}}
						>
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
								<StyledLink underlineOnHover css={{ ml: '12px', mr: '4px' }}>
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
							<ThemePickerMenu />
						</Flex>
					</Box>
				</Flex>
			</PageContainer>
		</>
	)
}
