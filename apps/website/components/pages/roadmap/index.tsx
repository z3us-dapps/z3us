/* eslint-disable */
import React from 'react'
import { m as motion, useScroll, useTransform, Variants } from 'framer-motion'
import { LazyMotion } from 'components/lazy-motion'
import { NextSeo } from 'next-seo'
import { config } from 'config'
import { PageContainer } from 'components/page-container'
import { Header } from 'components/header'
import { Picture } from 'components/picture'
import { Footer } from 'components/footer'
import { RoadMapCard } from './road-map-card'
import { roadmapData } from './roadmap-data'

export const RoadmapPage: React.FC = () => {
	const { scrollYProgress } = useScroll()
	const y1 = useTransform(scrollYProgress, [0, 1], [-300, 300])

	return (
		<>
			<NextSeo
				title="Roadmap"
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
				<motion.div style={{ y: y1, x: 0 }}>
					<div className="roadmap-bg">
						<Picture
							fallbackImage="/images/roadmap-page/roadmap-bg.webp"
							alt="roadmap background image"
							width={1440}
							height={974}
						/>
						<Picture
							fallbackImage="/images/roadmap-page/roadmap-bg.webp"
							alt="roadmap background image"
							width={1440}
							height={974}
						/>
					</div>
				</motion.div>
				<div className="relative text-white dark:text-black fill-white dark:fill-black overflow-hidden">
					<Header className="z-10 relative text-white" />
					<PageContainer>
						<div className="roadmap-hero text-white xl:pb-10 xl:pt-16 xl:w-4/6">
							<h1 className="font-HaasGrotTextRound font-bold roadmap-page__h1 xl:pt-2">Roadmap</h1>
							<h4 className="text-2xl leading-10 xl:pt-5">
								Our vision for the Z3US project is to build the best community wallet with an emphasis on neutrality.
								Help shape this vision by{' '}
								<a className="hover:underline text-violet-700" href="/">
									suggesting features
								</a>{' '}
								on our roadmap.
							</h4>
						</div>
						<div className="roadmap-cards">
							<div className="roadmap-line bg-white" />
							<h4 className="absolute top-0 px-4 py-2 text-violet-700 bg-white text-base font-bold rounded-full">
								Founded 2021
							</h4>
							{Object.entries(roadmapData).map(([key, item]) => (
								<RoadMapCard key={key} />
							))}
						</div>
					</PageContainer>
					<Footer className="text-white pt-2 pb-4 sm:pb-8 sm:pt-8" />
				</div>
			</LazyMotion>
		</>
	)
}
