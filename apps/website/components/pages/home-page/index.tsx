/* eslint-disable @next/next/no-img-element, @typescript-eslint/no-unused-vars */
import React from 'react'
import { m, useScroll, useTransform } from 'framer-motion'
import { LazyMotion } from 'components/lazy-motion'
import { NextSeo } from 'next-seo'
import { PageContainer } from 'components/page-container'
import { Header } from 'components/header'
import { Footer } from 'components/footer'
import { FlashCtaButton } from 'components/flash-cta-button'
import { config } from 'config'

export const HomePage: React.FC = () => {
	const { scrollYProgress } = useScroll()
	const y1 = useTransform(scrollYProgress, [0, 1], [-300, 300])
	const y2 = useTransform(scrollYProgress, [0, 1], [-400, 400])

	return (
		<>
			<NextSeo
				title="An open source UX driven web3 wallet built for DeFi & NFTs"
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
			<LazyMotion>
				<div className="homepage text-white dark:text-black fill-white">
					<Header notTabletSticky className="relative text-white" />
					<div className="overflow-hidden">
						<PageContainer>
							<div>
								<h1 className="font-HaasGrotTextRound font-bold homepage__h1">
									<span>Control</span>
									<span className="heeb">your future.</span>
								</h1>
								<div className="homepage__image-wrapper">
									<div className="homepage__product">
										<m.div className="homepage__angel-top" style={{ y: y1, x: 0 }}>
											<img
												src="/images/home-page/home-page-angel-top-right.webp"
												alt="angel top"
												width={885}
												height={767}
												loading="lazy"
											/>
										</m.div>
										<m.div className="homepage__angel-bottom" style={{ y: y2, x: 0 }}>
											<img
												src="/images/home-page/home-page-angel-bottom-left.webp"
												alt="angel bottom"
												width={529}
												height={804}
												loading="lazy"
											/>
										</m.div>
										<img
											className="relative homepage__shot_light"
											src="/images/home-page/home-product-dark-compress-x2.webp"
											alt="Z3US wallet product"
											width={360}
											height={628}
										/>
									</div>
								</div>
								<div className="homepage__product-description">
									<h2 className="font-HaasGrotTextRound font-bold homepage__h2">
										<span>DeFi</span> at your fingertips.
									</h2>
									<h4 className="text-xl text-white leading-relaxed sm:text-2xl sm:leading-relaxed">
										Manage accounts, send and receive tokens, stake tokens to receive rewards and connect to DApps from
										the Z3US browser wallet.
									</h4>
									<div className="mt-6">
										<FlashCtaButton size="lg" variant="primary">
											Get BETA access
										</FlashCtaButton>
									</div>
								</div>
								<div className="home-page__cells pb-8 mt-12 sm:mt-20 md:mt-24">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div className="home-page__cell flex-col md:flex bg-white dark:bg-black text-gray-800 dark:text-gray-100">
											<div className="flex-1 px-6 pt-6 sm:px-10 sm:pt-11 sm:pb-2 md:px-6 md:pt-10 lg:px-11 lg:pt-11">
												<h4 className="text-3xl sm:text-4xl font-bold relative z-10">UX driven</h4>
											</div>
											<div className="flex justify-center">
												<img
													className="relative home-page__cell-product-light"
													src="/images/home-page/home-ux-driven-product-light-x2.webp"
													alt="Z3US wallet product"
													width={600}
													height={648}
													loading="lazy"
												/>
												<img
													className="relative home-page__cell-product-dark"
													src="/images/home-page/home-ux-driven-product-dark-x2.webp"
													alt="Z3US wallet product"
													width={600}
													height={648}
													loading="lazy"
												/>
											</div>
										</div>
										<div className="home-page__cell bg-white dark:bg-black text-gray-800 dark:text-gray-100">
											<div className="flex flex-col justify-end h-full">
												<div className="py-10 px-6 sm:px-10 sm:py-10 md:px-6 md:py-10 lg:px-11 lg:py-11">
													<img
														src="/images/home-page/radix-logo.svg"
														alt="Radix logo"
														width={94}
														height={24}
														className="home-page__radix-logo"
													/>
													<img
														src="/images/home-page/radix-logo-dark-mode.svg"
														alt="Radix logo"
														width={94}
														height={24}
														className="home-page__radix-logo-dark"
													/>
													<h4 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-7 tracking-tighter">
														A community centric open source browser wallet for the Radix DLT network.
													</h4>
													<div className="lg:pb-5">
														<a href={config.RADIX_URL} className="mt-4 sm:mt-9 inline-flex text-sm hover:underline">
															Learn more &#8594;
														</a>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="grid grid-cols-1 gap-6 mt-6">
										<div className="home-page__cell bg-white dark:bg-black text-gray-800 dark:text-gray-100">
											<div className="py-10 px-6 sm:py-12 sm:px-10 lg:py-20 xl:px-40 flex flex-col justify-center align-center md:text-center">
												<h4 className="text-4xl sm:text-5xl lg:text-6xl font-bold md:px-20 tracking-tighter">
													Ledger support and state of the art security.
												</h4>
												<p className="text-base leading-6 pt-3 md:pt-5 md:px-20 md:px-30 lg:px-40">
													Whether you’re looking to keep your crypto safe for the future or manage it on a daily basis,
													Z3US is the right web3 wallet for you.
												</p>
												<div className="pt-6">
													<FlashCtaButton size="lg" variant="primary" showEffect={false}>
														Get BETA access
													</FlashCtaButton>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</PageContainer>
					</div>
					<Footer className="text-white fill-white pt-2 pb-4 sm:pb-8 sm:pt-8" />
				</div>
			</LazyMotion>
		</>
	)
}
