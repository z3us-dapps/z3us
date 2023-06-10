import cx from 'classnames'
import { Picture } from 'components/picture'
import type { Variants} from 'framer-motion';
import { m as motion } from 'framer-motion'
import React from 'react'

import { CheckIcon } from 'ui/src/components/icons'

interface IRoadMapCard {
	title: string
	date: string
	image?: string
	complete?: boolean
}

const defaultProps = {
	image: undefined,
	complete: false,
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

export const RoadMapCard = ({ title, date, image, complete }: IRoadMapCard): JSX.Element => (
	<motion.div
		className={cx('roadmap-card-container', { 'roadmap-card-container--image': !!image })}
		initial="offscreen"
		whileInView="onscreen"
		viewport={{ once: true, amount: 0.8 }}
	>
		<motion.div className="relative roadmap-card bg-white text-black rounded-2xl" variants={cardVariants}>
			{complete && (
				<motion.span
					className="lg:hidden roadmap-card-circle-mobile flex justify-center items-center"
					initial={{ scale: '0' }}
					variants={{
						offscreen: {
							scale: 0,
						},
						onscreen: {
							scale: 1,
							transition: {
								type: 'spring',
								stiffness: 200,
								damping: 20,
								delay: 0.8,
							},
						},
					}}
					style={{ backgroundColor: '#ffffff', borderColor: complete ? '#7447EA' : '#d7d7d7', color: '#7447EA' }}
				>
					<CheckIcon />
				</motion.span>
			)}
			<div className={`pt-6 px-6 ${!image ? 'pb-6' : ''}`}>
				<h5 className="text-base font-bold">{title}</h5>
				<p className="text-xs text-gray-400 pt-1">{date}</p>
			</div>
			{image && <Picture fallbackImage={image} alt="roadmap background image" width={350} height={350} />}
			<div className="roadmap-card-line">
				<motion.div className="roadmap-card-line-inner bg-white" variants={lineVariants} />
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

RoadMapCard.defaultProps = defaultProps
