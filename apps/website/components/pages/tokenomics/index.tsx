/* eslint-disable @next/next/no-img-element, @typescript-eslint/no-unused-vars */
import React from 'react'
import { LazyMotion, useScroll, useTransform } from 'framer-motion'
import { NextSeo } from 'next-seo'
import { config } from 'config'
import { PageContainer } from 'components/page-container'
import { Header } from 'components/header'
import { Footer } from 'components/footer'
import { TokenPieChart } from './token-pie-chart'
import { PieChartIcon, AddressIcon, SymbolIcon } from './icons'

const z3usToken = 'z3us_rr1q0gxzdty8egrkegk9lnteth09sgzqgxaw5ytqzq24ceq3eqagc'

const supplyMetrics = {
	allocated: { bgColor: '#7447EA', title: 'Allocated', metric: '20,000,000', percentage: '10%' },
	supply: { bgColor: '#A98DF4', title: 'Supply', metric: '180,000,000', percentage: '90%' },
}

const allocationMetrics = {
	team: { bgColor: '#C3A4A5', title: 'Team', metric: '30,000,000', percentage: '15%' },
	liquidity: { bgColor: '#C0D7EF', title: 'Liquidity pools', metric: '40,000,000', percentage: '20%' },
	airdrops: { bgColor: '#BF9E76', title: 'Airdrops', metric: '120,000,000', percentage: '60%' },
}

export const TokenomicsPage: React.FC = () => (
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
			<LazyMotion features={async () => (await import('../../framer-features')).default} strict>
				<div className="tokenomics-wrapper text-white dark:text-black fill-white dark:fill-black overflow-hidden">
					<Header className="z-10 relative text-white" />
					<div className="tokenomics-hero-wrapper">
						<PageContainer>
							<div className="tokenomics-hero text-white">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="tokenomics-hero__cell flex-col md:flex">
										<h1 className="font-HaasGrotTextRound font-bold tokenomics__h1 pt-10 pb-7">
											<span>Toke-</span>
											<span>nomics</span>
										</h1>
										<h4 className="text-xl leading-relaxed lg:text-2xl lg:leading-relaxed tokenomics__hero-text lg:mt-3">
											<a className="underline" href={`${config.EXPLORER_URL}/tokens/${z3usToken}`}>
												$Z3US
											</a>{' '}
											is a native token on the Radix DLT network. It is designed to be a deflationary utility token,
											with tokens being burnt and withdrawn from wallets as consumption grows. The $Z3US utility
											token&apos;s goal is to provide continuing incentives to ecosystem participants, therefore
											encouraging the Z3US ecosystem community to enhance and maintain the wallet and related products.
										</h4>
										<div className="flex justify-between mt-12 pb-12 text-center">
											<div className="flex flex-col justify-center items-center">
												<PieChartIcon />
												<p className="text-xl font-medium mt-2">200,000,000</p>
												<p className="text-base pt-3">Supply</p>
											</div>
											<div className="flex flex-col justify-center items-center">
												<SymbolIcon />
												<p className="text-xl font-medium mt-2">$Z3US</p>
												<p className="text-base pt-3">Symol</p>
											</div>
											<div className="flex flex-col justify-center items-center">
												<AddressIcon />
												<p className="text-xl font-medium mt-2">{`${z3usToken?.substring(0, 5)}...${z3usToken?.slice(
													-5,
												)}`}</p>
												<p className="text-base pt-3">Address</p>
											</div>
										</div>
									</div>
									<div className="tokenomics-hero__cell flex flex-col items-center">
										<TokenPieChart />
									</div>
								</div>
							</div>
						</PageContainer>
					</div>
					<PageContainer>
						<div className="tokenomics-white-cells grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 pb-10">
							<div className="tokenomics-white-cells__cell flex-col md:flex bg-white dark:bg-black text-gray-800 dark:text-gray-100 py-8 px-8">
								<h5 className="text-3xl font-bold">Metrics</h5>
								<h6 className="text-lg font-bold pt-6 pb-6">Token supply</h6>
								<div className="flex-col flex items-center justify-center w-full lg:flex-row">
									<div className="tokenomics-chart-img-wrapper">
										<img
											src="/images/tokenomics-page/token-supply-x2.png"
											alt="token supply"
											width={200}
											height={200}
											loading="lazy"
										/>
									</div>
									<ul className="tokenomics-metrics w-full text-sm pt-8 lg:pt-0 lg:ml-4 flex flex-col gap-4">
										{Object.entries(supplyMetrics).map(([key, { title, bgColor, metric, percentage }]) => (
											<li key={key} className="flex">
												<span className="flex items-center">
													<span
														className="border border-white rounded-full block"
														style={{
															backgroundColor: bgColor,
															boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.28)',
															width: '10px',
															height: '10px',
														}}
													/>
													<span className="pl-2">{title}</span>
												</span>
												<span className="border-b border-dashed border-slate-300 mx-2 mb-1" style={{ flex: '1' }} />
												<span>
													{metric} <b>({percentage})</b>
												</span>
											</li>
										))}
									</ul>
								</div>
								<h6 className="text-lg font-bold pt-12 pb-6">Token allocation</h6>
								<div className="flex-col flex items-center justify-center w-full lg:flex-row">
									<div className="tokenomics-chart-img-wrapper">
										<img
											src="/images/tokenomics-page/token-allocation-x2.png"
											alt="token supply"
											width={200}
											height={200}
											loading="lazy"
										/>
									</div>
									<ul className="tokenomics-metrics w-full text-sm pt-8 lg:pt-0 lg:ml-4 flex flex-col gap-4">
										{Object.entries(allocationMetrics).map(([key, { title, bgColor, metric, percentage }]) => (
											<li key={key} className="flex">
												<span className="flex items-center">
													<span
														className="border border-white rounded-full block"
														style={{
															backgroundColor: bgColor,
															boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.28)',
															width: '10px',
															height: '10px',
														}}
													/>
													<span className="pl-2">{title}</span>
												</span>
												<span className="border-b border-dashed border-slate-300 mx-2 mb-1" style={{ flex: '1' }} />
												<span>
													{metric} <b>({percentage})</b>
												</span>
											</li>
										))}
									</ul>
								</div>
							</div>
							<div className="tokenomics-white-cells__cell flex-col md:flex bg-white dark:bg-black text-gray-800 dark:text-gray-100 py-8 px-8">
								<h5 className="text-3xl font-bold">Details</h5>

								<h6 className="text-lg font-bold mt-5">Utility</h6>
								<p className="pt-2 leading-6">
									The first and primary utility of the $Z3US token will be to reduce the swap fees in the wallet. <br />
									<br />A 50% fee discount applies to ecosystem participants who hold $Z3US tokens in their wallet, and
									opt-in to burning $Z3US tokens on the swap transaction.
								</p>
								<p className="text-slate-400 pt-2 text-xs">
									Note: Z3US reserves the right to modify these fees, at any time, in it’s sole discretion.
								</p>
								<h6 className="text-lg font-bold mt-5">Modal</h6>
								<p className="pt-2 leading-6">
									The token model will be deflationary over time. Z2US will charge a fee when participants use the swap
									feature in the wallet. If the user has $Z3US tokens in the wallet and selects the option to burn $Z3US
									tokens when using the swap feature, the fee charge is a flat 0.425% transaction. Of that fee, 0.3%
									will be burnt. The remaining 0.125% will go to the development / marketing wallet, to help fund
									development. If the user selects not to burn $Z3US tokens on the swap, the fee charge a flat 0.80%
									transaction. Of that fee, 0.85%. The 0.85% will go to the development / marketing wallet, to help fund
									development.
								</p>
								<p className="text-slate-400 pt-2 text-xs">
									Note: Rates that appear in the Z3US wallet are calculated with fees applied. Z3US reserves the right
									to modify these fees at any time, in it’s sole discretion.
								</p>
							</div>
						</div>
					</PageContainer>
					<Footer className="text-white pt-2 pb-4 sm:pb-8 sm:pt-8" />
				</div>
			</LazyMotion>
		</>
	)
