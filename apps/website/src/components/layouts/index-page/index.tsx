import { ContentContainer } from '@/components/content-container'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import LogoTest from '@/components/logo-test'
import { NextButton } from '@/components/next-button'
// import NextLink from 'next/link'
import { NextLink } from '@/components/next-link'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { Text } from 'ui/src/components/typography'

import { HeroTextSvg } from './components/hero-text-svg'
import * as styles from './styles.css'

const AppPage = dynamic(() => import('../app-page'), { ssr: false })

export const IndexPage: React.FC = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const test = 1

	return (
		<Box className={styles.landingPageWrapper}>
			<Box style={{ position: 'fixed', top: '0', left: 0, right: '0', opacity: 0.0, pointerEvents: 'none' }}>
				<AppPage />
			</Box>
			<Header />

			<Box className={styles.landingPageBodyWrapper}>
				<Box className={styles.landingPageDarkWrapper}>
					<ContentContainer>
						<Box className={styles.landingHeroTextWrapper}>
							<HeroTextSvg />
						</Box>
						<Box className={styles.landingCalloutFlexWrapper}>
							<Box className={styles.landingCalloutTextWrapper}>
								<Box>
									<Text size="xlarge" color="strong" weight="medium">
										Z3US is your home on Radix. <br />
									</Text>
									<Text size="xlarge" color="strong" weight="medium">
										Manage accounts, send and receive tokens, stake tokens to receive rewards and connect to DApps from
										Z3US, the best browser wallet.
									</Text>
								</Box>
								<Box>
									<NextButton
										rounded
										sizeVariant="xlarge"
										styleVariant="primary"
										// iconOnly
										to="https://t.me/z3us_dapps"
										target="_blank"
										leftIcon={<Box className={styles.landingCalloutButtonIcon}>a</Box>}
									>
										Download for chrome
									</NextButton>
								</Box>
							</Box>
						</Box>
						<Box>
							<Image
								priority
								src="/landing-page-2023/hero-product.png"
								width={1160}
								height={740}
								alt="Vanilla Extract logo"
								className={styles.landingHeroCalloutImg}
							/>
						</Box>
					</ContentContainer>
				</Box>
				<Box className={styles.landingPagePurpleWrapper}>
					<ContentContainer>
						<Box>
							<LogoTest />
							<Box padding="large">
								<p>hello</p>
							</Box>
							{Array.from({ length: 10 }, (_, i) => (
								<Box display="flex" flexDirection="column" key={i}>
									<Text size="large">Landing page content here</Text>
								</Box>
							))}
							<LogoTest />
						</Box>
					</ContentContainer>
				</Box>
				<Box className={styles.landingPageDarkWrapper}>
					<ContentContainer>
						<Box>
							<Image priority src="/vercel.svg" width={100} height={120} alt="Vanilla Extract logo" />
							<Box padding="large">
								<p>hello</p>
							</Box>
							{Array.from({ length: 10 }, (_, i) => (
								<Box display="flex" flexDirection="column" key={i}>
									<Text size="large">Landing page content here</Text>
								</Box>
							))}
							<LogoTest />
						</Box>
					</ContentContainer>
				</Box>
			</Box>
			<Footer />
		</Box>
	)
}
