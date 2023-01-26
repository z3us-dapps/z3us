import React from 'react'
import { m as motion, useScroll, useTransform } from 'framer-motion'
import { LazyMotion } from 'components/lazy-motion'
import { useElementSize, useWindowSize } from 'usehooks-ts'
import { NextSeo } from 'next-seo'
import { config } from 'config'
import { PageContainer } from 'components/page-container'
import { Header } from 'components/header'
import { Picture } from 'components/picture'
import { Footer } from 'components/footer'
import { RoadMapCard } from './road-map-card'
import { roadmapData } from './roadmap-data'

export const RoadmapPage = () => {
	const [containerRef, { height: containerHeight }] = useElementSize()
	const { width } = useWindowSize()
	const largeWindow = width > 800
	const { scrollYProgress } = useScroll()
	const y1 = useTransform(scrollYProgress, [0, 1], [-100, 100])

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
				<motion.div style={{ y: y1 }}>
					<div className="roadmap-bg" style={{ maxHeight: `${containerHeight - (largeWindow ? 100 : 0)}px` }}>
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
				<div ref={containerRef} className="relative text-white dark:text-black fill-white dark:fill-black">
					<Header notTabletSticky className="z-10 relative text-white fill-white transition-colors" />
					<div className="overflow-hidden pb-32">
						<PageContainer>
							<div className="roadmap-hero text-white md:pb-4 md:pt-10 md:w-5/6 xl:pb-10 xl:pt-16 xl:w-4/6">
								<h1 className="font-Inter font-bold roadmap-page__h1 pt-6 xl:pt-2">Roadmap</h1>
								<h4 className="text-2xl leading-10 pt-4 xl:pt-5">
									Our vision for Z3US project is to create a best-in-class WEB3 wallet with an emphasis on user
									experience and transparent code. Help shape this vision by{' '}
									<a
										href={config.HELLO_NEXT_FEEDBACK_URL}
										className="hover:underline decoration-from-font underline-offset-4 text-violet-700"
										target="_blank"
										rel="noreferrer"
									>
										suggesting features
									</a>
									.
								</h4>
							</div>
							<div className="roadmap-cards">
								<div className="roadmap-line bg-white" />
								<h4 className="absolute top-0 px-4 py-2 text-purple-700 bg-white text-base font-bold rounded-full">
									Founded 2021
								</h4>
								{Object.entries(roadmapData).map(([key, { title, date, image, complete }]) => (
									<RoadMapCard key={key} title={title} date={date} image={image} complete={complete} />
								))}
							</div>
						</PageContainer>
					</div>
					<Footer className="fill-white text-white pt-2 pb-4 sm:pb-8 sm:pt-8" />
				</div>
			</LazyMotion>
		</>
	)
}
