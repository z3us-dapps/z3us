/*eslint-disable */
import React from 'react'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import { Box, Text, Flex, StyledLink } from 'ui/src/components/atoms'
import { Header } from 'components/header'
import { Footer } from 'components/footer'
import { ThemePickerMenu } from 'components/theme-picker-menu'
import { PageContainer } from 'components/page-container'
import { FlashCtaButton } from 'components/flash-cta-button'
import { mediaSizes } from 'ui/src/theme'
import { useMediaQuery } from 'hooks/use-media-query'
import { LandingHoverCard } from 'components/landing-hover-card'
import { config } from 'config'
import RadixLogoImage from 'public/images/radix-logo.svg'
import ProductImage from '../../../public/images/landing-product-bg.png'
import ProductUxImage from '../../../public/images/landing-product-ux-bg.png'

export const TokenomicsPage: React.FC = () => {
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
			<Flex direction="column" css={{ minHeight: '100vh' }}>
				<Header />
				<Box
					css={{
						position: 'relative',
						flex: '1',
					}}
				>
					<PageContainer>
						<Box css={{ pb: '120px', '@sm': { display: 'flex' } }}>
							<Box
								css={{
									flex: '1 1 auto',
									maxWidth: '100%',
									'@sm': { width: '30%', flexBasis: '30%' },
									'@md': { width: '50%', flexBasis: '50%' },
								}}
							>
								<Box
									css={{
										width: '100%',
										pb: '100px',
										px: '0',
										'@sm': {
											px: '15%',
										},
									}}
								>
									We are here
								</Box>
							</Box>
						</Box>
					</PageContainer>
				</Box>
				<Footer />
			</Flex>
		</>
	)
}
