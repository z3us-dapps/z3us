/* eslint-disable */
import React from 'react'
import { m as motion, Variants } from 'framer-motion'
import { Picture } from 'components/picture'

interface IRoadMapCard {
	className?: string
}

const cardVariants: Variants = {
	offscreen: {
		y: 200,
		opacity: 0,
	},
	onscreen: {
		y: 50,
		opacity: 1,
		transition: {
			ease: 'easeInOut',
			duration: 0.8,
		},
	},
}

const lineVariants: Variants = {
	offscreen: {
		scaleX: 0,
	},
	onscreen: {
		scaleX: 1,
		transition: {
			ease: 'linear',
			duration: 0.5,
			delay: 0.6,
		},
	},
}

export const RoadMapCard = (props: IRoadMapCard): JSX.Element => (
	<motion.div
		className="roadmap-card-container"
		initial="offscreen"
		whileInView="onscreen"
		viewport={{ once: true, amount: 0.8 }}
	>
		<motion.div className="relative roadmap-card bg-white text-black p-6 rounded-2xl" variants={cardVariants}>
			<h5 className="text-base font-bold">
				Our vision for the Z3US project is to build the best community wallet with an emphasis on neutrality. Help shape
				this vision by
			</h5>
			<p className="text-xs text-gray-400">15th Feb</p>
			<Picture
				fallbackImage="/images/roadmap-page/roadmap-bg.webp"
				alt="roadmap background image"
				width={100}
				height={100}
			/>
			<div className="roadmap-card-line">
				<motion.div className="roadmap-card-line-inner bg-white" variants={lineVariants}></motion.div>
				<div className="roadmap-card-circle" style={{ backgroundColor: '#ffffff', borderColor: '#d7d7d7' }} />
			</div>
		</motion.div>
	</motion.div>
)
