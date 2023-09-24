/* eslint-disable @next/next/no-img-element, @typescript-eslint/no-unused-vars */
import { FlashCtaButton } from 'components/flash-cta-button'
import { Footer } from 'components/footer'
import { Header } from 'components/header'
import { XIcon } from 'components/header/icons'
import { LazyMotion } from 'components/lazy-motion'
import { PageContainer } from 'components/page-container'
import { config } from 'config'
import { m, useScroll, useTransform } from 'framer-motion'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import React from 'react'

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
				<div className="homepage">
					<Header notTabletSticky className="relative" />
					<div className="overflow-hidden">
						<PageContainer>
							<div className="coming-soon-wrapper">
								<div className="bg-image-left">
									<Image src="/images/landing-page-2023/bg-left.png" alt="bg one" width={822} height={1222} />
								</div>
								<div className="bg-image-right">
									<Image src="/images/landing-page-2023/bg-right.png" alt="bg one" width={902} height={814} />
								</div>
								<div className="flex w-full pt-16">
									<div className="w-full">
										<Image
											src="/images/landing-page-2023/something-big-coming.png"
											alt="something big is coming"
											width={878}
											height={174}
										/>
									</div>
								</div>
								<div className="flex w-full pt-8 lg:pt-16 relative">
									<div className="lg:w-6/12">&nbsp;</div>
									<div className="lg:w-6/12">
										<h4 className="homepage__header">
											Behind the scenes we&apos;ve been building something extraordinary, and we can&apos;t wait to
											share it with you!
										</h4>
										<a
											href={config.TWITTER_URL}
											target="_blank"
											className="inline-flex items-center gap-3 cursor-pointer focus:outline-none text-white fill-purple-700 bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-med px-6 py-3 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
											rel="noreferrer"
										>
											<XIcon />
											<span>Get notified via X</span>
										</a>
									</div>
								</div>
								<div className="flex w-full pt-16">
									<div className="w-full homepage__product">
										<Image
											src="/images/landing-page-2023/desktop-product.jpg"
											alt="something big is coming"
											width={1160}
											height={788}
										/>
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
