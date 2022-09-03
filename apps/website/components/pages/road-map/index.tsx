import { LazyMotion, m, useScroll, useTransform } from 'framer-motion'
import { Button } from 'components/button'
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

			<LazyMotion features={async () => (await import('../../framer-features')).default} strict>
				<div className="tokenomics-wrapper text-white dark:text-black fill-white dark:fill-black overflow-hidden">
					<Header className="z-10 relative text-white" />
					<PageContainer>
						<div className="tokenomics-hero text-white">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="tokenomics-hero__cell flex-col md:flex">
									<h1 className="font-HaasGrotTextRound font-bold tokenomics__h1 pt-10 pb-7">
										<span>Toke-</span>
										<span>nomics</span>
									</h1>
									<h4 className="text-xl leading-relaxed lg:text-2xl lg:leading-relaxed tokenomics__hero-text lg:mt-3">
										<a className="underline" href={`${config.EXPLORER_URL}/tokens/${Z3US_token}`}>
											$Z3US
										</a>{' '}
										is a native token on the Radix DLT network. It is designed to be a deflationary utility token, with
										tokens being burnt and withdrawn from wallets as consumption grows. The $Z3US utility token's goal
										is to provide continuing incentives to ecosystem participants, therefore encouraging the Z3US
										ecosystem community to enhance and maintain the wallet and related products.
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
											<p className="text-xl font-medium mt-2">{`${Z3US_token?.substring(0, 5)}...${Z3US_token?.slice(
												-5,
											)}`}</p>
											<p className="text-base pt-3">Address</p>
										</div>
									</div>
								</div>
								<div className="tokenomics-hero__cell flex justify-center">
									<TokenPieChart />
								</div>
							</div>
						</div>

						<div className="tokenomics-white-cells grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 pb-10">
							<div className="tokenomics-white-cells__cell flex-col md:flex bg-white dark:bg-black text-gray-800 dark:text-gray-100 py-6 px-6">
								<h5 className="text-3xl font-bold">Metrics</h5>
								<h6 className="text-lg font-bold">Token supply</h6>
								<h6 className="text-lg font-bold">Token allocation</h6>
							</div>
							<div className="tokenomics-white-cells__cell flex-col md:flex bg-white dark:bg-black text-gray-800 dark:text-gray-100 py-6 px-6">
								<h5 className="text-3xl font-bold">Details</h5>

								<h6 className="text-lg font-bold">Utility</h6>
								<p>
									The first and primary utility of the $Z3US token will be to reduce the swap fees in the wallet. A 50%
									fee discount applies to ecosystem participants who hold $Z3US tokens in their wallet, and opt-in to
									burning $Z3US tokens on the swap transaction.
								</p>
								<p>Note: Z3US reserves the right to modify these fees, at any time, in it’s sole discretion.</p>
								<h6 className="text-lg font-bold">Modal</h6>

								<p>
									The token model will be deflationary over time. Z2US will charge a fee when participants use the swap
									feature in the wallet. If the user has $Z3US tokens in the wallet and selects the option to burn $Z3US
									tokens when using the swap feature, the fee charge is a flat 0.425% transaction. Of that fee, 0.3%
									will be burnt. The remaining 0.125% will go to the development / marketing wallet, to help fund
									development. If the user selects not to burn $Z3US tokens on the swap, the fee charge a flat 0.80%
									transaction. Of that fee, 0.85%. The 0.85% will go to the development / marketing wallet, to help fund
									development.
								</p>
								<p>
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
}
