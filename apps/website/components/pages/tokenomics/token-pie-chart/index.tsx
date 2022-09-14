/* eslint-disable @next/next/no-img-element */
import React from 'react'

export const TokenPieChart: React.FC = () => (
	<div className="token-pie-chart">
		<div className="token-pie-chart__inner">
			<img
				src="/images/tokenomics-page/tokenomics-pie-chart-x2.webp"
				alt="angel top"
				width={334}
				height={334}
				loading="lazy"
			/>
			<div className="token-pie-chart__team">
				<p>15%</p>
				<span className="text-base">Team</span>
			</div>
			<div className="token-pie-chart__airdrops">
				<p>60%</p>
				<span className="text-base">Airdrops</span>
			</div>
			<div className="token-pie-chart__liquidity">
				<p>20%</p>
				<span className="text-base">Liquidity pool</span>
			</div>
		</div>
		<div className="token-pie-chart__greek-image hidden md:block">
			<img
				src="/images/tokenomics-page/tokenomcis-greek-image-x2.webp"
				alt="angel top"
				width={701}
				height={622}
				loading="lazy"
			/>
		</div>
	</div>
)
