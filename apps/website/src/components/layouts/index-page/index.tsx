import { ContentContainer } from '@/components/content-container'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import LogoTest from '@/components/logo-test'
import { NextButton } from '@/components/next-button'
// import NextLink from 'next/link'
import { NextLink } from '@/components/next-link'
import clsx from 'clsx'
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
						<Box className={styles.landingPageLargeImgFloatBottom}>
							<Image
								priority
								src="/landing-page-2023/zeus-golden-apple.png"
								width={1440}
								height={1119}
								alt="Chrome logo"
							/>
						</Box>
						<Box className={styles.landingPageLargeImgFloatLeft}>
							<Image
								priority
								src="/landing-page-2023/hero-angel-left.png"
								width={786}
								height={1222}
								alt="Chrome logo"
							/>
						</Box>
						<Box className={styles.landingPageLargeImgFloatRight}>
							<Image
								priority
								src="/landing-page-2023/hero-angel-right.png"
								width={710}
								height={474}
								alt="Chrome logo"
							/>
						</Box>
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
										leftIcon={
											<Box className={styles.landingCalloutButtonIcon}>
												<Image
													priority
													src="/landing-page-2023/google-chrome-logo.png"
													width={20}
													height={20}
													alt="Chrome logo"
												/>
											</Box>
										}
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

				<Box className={styles.landingPageInvadersWrapper}>
					<Box className={styles.landingPageInvadersInnerWrapper}>
						<Image
							priority
							src="/landing-page-2023/purple-invaders-horizontal-bg.png"
							width={1440}
							height={244}
							alt="Vanilla Extract logo"
						/>
					</Box>
				</Box>
				<Box className={styles.landingPagePurpleWrapper}>
					<ContentContainer>
						<Box className={styles.landingLeftHeroTextWrapper}>
							<Text
								component="h4"
								capitalize
								size="large"
								weight="stronger"
								color="strong"
								className={styles.landingTextOpacity50}
							>
								Seamless
							</Text>
							<Text size="xxxxlarge" color="strong" weight="stronger">
								Experience your radix wallet in a whole new way.
							</Text>
							<Text size="large" color="strong">
								Access your existing Radix wallets seamlessly alongside newly created Z3US wallets, simplifying asset
								consolidation and management. Say goodbye to platform hopping – Z3US keeps your crypto world unified.
							</Text>
						</Box>
						<Box>
							<p>image</p>
						</Box>
						<Box className={styles.landingLeftHeroTextWrapper}>
							<Text
								component="h4"
								capitalize
								size="large"
								weight="stronger"
								color="strong"
								className={styles.landingTextOpacity50}
							>
								Seamless
							</Text>
							<Text size="xxxxlarge" color="strong" weight="stronger">
								Experience your radix wallet in a whole new way.
							</Text>
							<Text size="large" color="strong">
								Access your existing Radix wallets seamlessly alongside newly created Z3US wallets, simplifying asset
								consolidation and management. Say goodbye to platform hopping – Z3US keeps your crypto world unified.
							</Text>
						</Box>
					</ContentContainer>
				</Box>
				<Box className={styles.landingPageDarkWrapper}>
					<ContentContainer>
						<Box>
							<Box padding="large">
								<Text size="large">Landing page content here</Text>
							</Box>
						</Box>
					</ContentContainer>
				</Box>
				<Box className={styles.landingPageInvadersWrapper}>
					<Box className={styles.landingPageInvadersInnerWrapper}>
						<Image
							priority
							src="/landing-page-2023/purple-invaders-horizontal-bg.png"
							width={1440}
							height={244}
							alt="Vanilla Extract logo"
						/>
					</Box>
				</Box>
			</Box>
			<Box className={clsx(styles.landingPagePurpleWrapper, styles.landingPageFooterWrapper)}>
				<Footer textColor="strong" />
			</Box>
		</Box>
	)
}
