/* eslint-disable */
import React from 'react'
import { m as motion, Variants } from 'framer-motion'
import cx from 'classnames'
import { CheckIcon } from 'ui/src/components/icons'
import { Picture } from 'components/picture'

interface IRoadMapCard {
	title: string
	subTitle?: string
	date: string
	image?: string
	complete?: boolean
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

const circleVariants: Variants = {
	offscreen: {
		scale: 0,
	},
	onscreen: {
		scale: 1,
		transition: {
			type: 'spring',
			stiffness: 200,
			damping: 20,
			delay: 1.1,
		},
	},
}

export const RoadMapCard = ({ title, subTitle, date, image, complete }: IRoadMapCard): JSX.Element => (
	<motion.div
		className={cx('roadmap-card-container', { 'roadmap-card-container--image': !!image })}
		initial="offscreen"
		whileInView="onscreen"
		viewport={{ once: true, amount: 0.8 }}
	>
		<motion.div className="relative roadmap-card bg-white text-black p-6 rounded-2xl" variants={cardVariants}>
			<h5 className="text-base font-bold">{title}</h5>
			<p className="text-xs text-gray-400 pt-1">{date}</p>
			{/* {subTitle && <p className="text-xs pt-2">{subTitle}</p>} */}
			{image && (
				<Picture
					fallbackImage="/images/roadmap-page/roadmap-bg.webp"
					alt="roadmap background image"
					width={288}
					height={160}
				/>
			)}
			<div className="roadmap-card-line">
				<motion.div className="roadmap-card-line-inner bg-white" variants={lineVariants}></motion.div>
				<motion.span
					className="roadmap-card-circle flex justify-center items-center"
					initial={{ scale: '0' }}
					variants={circleVariants}
					style={{ backgroundColor: '#ffffff', borderColor: complete ? '#7447EA' : '#d7d7d7', color: '#7447EA' }}
				>
					{complete && <CheckIcon />}
				</motion.span>
			</div>
		</motion.div>
	</motion.div>
)
