/* eslint-disable @next/next/no-img-element, @typescript-eslint/no-unused-vars */
import { FlashCtaButton } from 'components/flash-cta-button'
import { Footer } from 'components/footer'
import { Header } from 'components/header'
import { LazyMotion } from 'components/lazy-motion'
import { PageContainer } from 'components/page-container'
import { config } from 'config'
import { m, useScroll, useTransform } from 'framer-motion'
import { NextSeo } from 'next-seo'
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
								<h1 className="font-Inter font-bold homepage__h1 hidden">
									<span>Control</span>
									<span>your future.</span>
								</h1>
								<div className="flex w-full pt-16">
									<div className="w-6/12">
										<img src="https://placekitten.com/408/287" alt="img" />
									</div>
									<div className="w-6/12">
										{' '}
										Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
										<br />
										<br />
										totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
										dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
										sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
										est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius
										modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima
										veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea
										commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil
										molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
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
