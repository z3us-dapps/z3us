/* eslint-disable */
import React from 'react'
import { useScroll, useTransform } from 'framer-motion'
import { LazyMotion } from 'components/lazy-motion'
import { NextSeo } from 'next-seo'
import { config } from 'config'
import { PageContainer } from 'components/page-container'
import { Header } from 'components/header'
import { Footer } from 'components/footer'
import { TokenPieChart } from './token-pie-chart'
import { PieChartIcon, AddressIcon, SymbolIcon } from './icons'

const Z3US_token = 'z3us_rr1q0gxzdty8egrkegk9lnteth09sgzqgxaw5ytqzq24ceq3eqagc'

export const RoadMapPage: React.FC = () => {
	const { scrollYProgress } = useScroll()
	const y1 = useTransform(scrollYProgress, [0, 1], [-300, 300])
	const y2 = useTransform(scrollYProgress, [0, 1], [-400, 400])

	return (
		<>
			<NextSeo
				title="Tokenomics"
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
				<div className="tokenomics-wrapper text-white dark:text-black fill-white dark:fill-black overflow-hidden">
					<Header className="z-10 relative text-white" />
					<PageContainer>
						<div className="tokenomics-hero text-white">sdfsdf</div>
					</PageContainer>
					<Footer className="text-white pt-2 pb-4 sm:pb-8 sm:pt-8" />
				</div>
			</LazyMotion>
		</>
	)
}
