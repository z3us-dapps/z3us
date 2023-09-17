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
import { Check2Icon } from 'ui/src/components/icons'
import { Text } from 'ui/src/components/typography'

import { HeroTextSvg } from './components/hero-text-svg'
import * as styles from './styles.css'

const AppPage = dynamic(() => import('../app-page'), { ssr: false })

export const IndexPage: React.FC = () => {
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
						<Box className={styles.landingHeroExperienceImageWrapper}>
							<Image
								priority
								src="/landing-page-2023/experience-hero-left.png"
								width={760}
								height={726}
								alt="Vanilla Extract logo"
								className={clsx(styles.landingHeroCalloutImg, styles.landingHeroCalloutRoundedImg)}
							/>
							<Image
								priority
								src="/landing-page-2023/experience-hero-right.png"
								width={360}
								height={926}
								alt="Vanilla Extract logo"
								className={clsx(styles.landingHeroCalloutImg, styles.landingHeroCalloutRoundedImg)}
							/>
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
								ALl-in-one
							</Text>
							<Text size="xxxxlarge" color="strong" weight="stronger">
								Send. Receive. Stake.
							</Text>
							<Text size="large" color="strong">
								Flawless essentials and powerful features. With the added functionality of group transactions, sending
								assets becomes even more convenient.
							</Text>
						</Box>
						<Box className={styles.landingHeroSendReceiveStakeWrapper}>
							<Image
								priority
								src="/landing-page-2023/send-receive-stake-01.png"
								width={360}
								height={600}
								alt="Vanilla Extract logo"
								className={clsx(styles.landingHeroCalloutImg, styles.landingHeroCalloutRoundedImg)}
							/>
							<Image
								priority
								src="/landing-page-2023/send-receive-stake-02.png"
								width={360}
								height={529}
								alt="Vanilla Extract logo"
								className={clsx(styles.landingHeroCalloutImg, styles.landingHeroCalloutRoundedImg)}
							/>
							<Image
								priority
								src="/landing-page-2023/send-receive-stake-03.png"
								width={360}
								height={600}
								alt="Vanilla Extract logo"
								className={clsx(styles.landingHeroCalloutImg, styles.landingHeroCalloutRoundedImg)}
							/>
						</Box>
					</ContentContainer>
				</Box>
				<Box className={clsx(styles.landingPageInvadersWrapper, styles.landingPageInvadersFlipped)}>
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
				<Box className={styles.landingPageDarkWrapper}>
					<ContentContainer>
						{/* START: MAKE IT YOUR OWN */}
						<Box className={clsx(styles.landingFeaturePointBlockWrapper, styles.landingFeaturePointBlockBorder)}>
							<Box className={styles.landingFeaturePointBlock}>
								<Text component="h4" capitalize size="large" weight="stronger" className={styles.landingTextPurple}>
									Personalization
								</Text>
								<Text size="xxxxlarge" color="strong" weight="stronger">
									Make it your own
								</Text>
								<Text size="large">
									With Z3US&apos;s customization, every transaction becomes an expression of your identity. It&apos;s
									more than just a wallet – it&apos;s a canvas for your digital financial interactions.
								</Text>
								<Box component="ul">
									<Box component="li" color="colorNeutral">
										<Check2Icon />
										<Text>With Z3US&apos;s</Text>
									</Box>
									<Box component="li" color="colorNeutral">
										<Check2Icon />
										<Text>With Z3US&apos;s</Text>
									</Box>
									<Box component="li" color="colorNeutral">
										<Check2Icon />
										<Text>With Z3US&apos;s</Text>
									</Box>
								</Box>
							</Box>
							<Box className={styles.landingFeaturePointImgBlock}>
								<Box className={styles.landingMakeItYourOwnAccountsColumn}>
									<Image
										priority
										src="/landing-page-2023/make-it-your-own-card-01.png"
										width={316}
										height={190}
										alt="Vanilla Extract logo"
										className={clsx(styles.landingHeroCalloutImg, styles.landingHeroCalloutRoundedImg)}
									/>
									<Image
										priority
										src="/landing-page-2023/make-it-your-own-card-01.png"
										width={316}
										height={190}
										alt="Vanilla Extract logo"
										className={clsx(styles.landingHeroCalloutImg, styles.landingHeroCalloutRoundedImg)}
									/>
									<Image
										priority
										src="/landing-page-2023/make-it-your-own-card-01.png"
										width={316}
										height={190}
										alt="Vanilla Extract logo"
										className={clsx(styles.landingHeroCalloutImg, styles.landingHeroCalloutRoundedImg)}
									/>
								</Box>
								<Image
									priority
									src="/landing-page-2023/make-it-your-own-01.png"
									width={360}
									height={600}
									alt="Vanilla Extract logo"
									className={clsx(
										styles.landingHeroCalloutImg,
										styles.landingHeroCalloutRoundedImg,
										styles.landingMakeItYourOwnImgLarge,
									)}
								/>
							</Box>
						</Box>
						{/* END: MAKE IT YOUR OWN */}

						{/* START: MAKE IT YOUR OWN */}
						<Box className={clsx(styles.landingFeaturePointBlockWrapper, styles.landingFeaturePointBlockBorder)}>
							<Box className={styles.landingFeaturePointImgBlock}>
								<Image
									priority
									src="/landing-page-2023/make-it-your-own-01.png"
									width={360}
									height={600}
									alt="Vanilla Extract logo"
									className={clsx(styles.landingHeroCalloutImg, styles.landingHeroCalloutRoundedImg)}
								/>
							</Box>
							<Box className={styles.landingFeaturePointBlock}>
								<Text
									component="h4"
									capitalize
									size="large"
									weight="stronger"
									color="strong"
									className={styles.landingTextPurple}
								>
									Address book
								</Text>
								<Text size="xxxxlarge" color="strong" weight="stronger">
									Make it easy
								</Text>
								<Text size="large" color="strong">
									With Z3US's customization, every transaction becomes an expression of your identity. It's more than
									just a wallet – it's a canvas for your digital financial interactions.
								</Text>
								<Box component="ul">
									<Box component="li" color="colorNeutral">
										<Check2Icon />
										<Text>With Z3US&apos;s</Text>
									</Box>
									<Box component="li" color="colorNeutral">
										<Check2Icon />
										<Text>With Z3US&apos;s</Text>
									</Box>
									<Box component="li" color="colorNeutral">
										<Check2Icon />
										<Text>With Z3US&apos;s</Text>
									</Box>
								</Box>
							</Box>
						</Box>

						{/* END: MAKE IT YOUR OWN */}
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
