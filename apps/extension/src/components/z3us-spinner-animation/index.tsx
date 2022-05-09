import React from 'react'
import { keyframes } from 'ui/src/theme'
import { Box } from 'ui/src/components/atoms'
import { Z3usSvg } from './z3us'

const ANIMATION_TIME = '4000ms'

const rotateOutAnimation = keyframes({
	from: { transform: 'rotate(0deg)' },
	to: { transform: 'rotate(360deg)' },
})

interface IProps {
	width?: number
	height?: number
	animationTime?: string
	infinite?: boolean
	showAnimation?: boolean
}

const defaultProps = {
	width: 200,
	height: 200,
	animationTime: ANIMATION_TIME,
	infinite: false,
	showAnimation: true,
}

const highLightColor = '#00fff6'

export const Z3usSpinnerAnimation: React.FC<IProps> = ({ width, height, animationTime, infinite, showAnimation }) => (
	<Box css={{ width: `${width}px`, height: `${height}px`, position: 'relative' }}>
		<Box
			css={{
				width: `${width}px`,
				height: `${height}px`,
				position: 'absolute',
				top: '0',
				left: '0',
			}}
		>
			<Box
				css={{
					pe: 'none',
					position: 'absolute',
					width: `${width}px`,
					height: `${height}px`,
					top: '0',
					left: '0',
					br: '50%',
					'&:before': {
						content: '',
						position: 'absolute',
						width: `${width + 4}px`,
						height: `${height + 4}px`,
						top: '-2px',
						left: '-2px',
						br: '50%',
						backgroundImage: `linear-gradient(135deg, $bgPanel 0%,  $bgPanel 25%, ${highLightColor} 50%, $bgPanel 100%)`,
						animationDuration: '2000ms',
						animationName: `${rotateOutAnimation}`,
						animationIterationCount: 'infinite',
					},
					'&:after': {
						content: '',
						position: 'absolute',
						width: `${width - 2}px`,
						height: `${height - 2}px`,
						top: '1px',
						left: '1px',
						br: '50%',
						backgroundColor: '$bgPanel',
					},
				}}
			/>
			<Box
				css={{
					width: `${width}px`,
					height: `${height}px`,
					position: 'absolute',
					top: '0',
					left: '0',
					...(showAnimation
						? { animation: `${rotateOutAnimation} ${animationTime} linear ${infinite ? 'infinite' : ''}` }
						: {}),
				}}
			>
				<Z3usSvg />
			</Box>
		</Box>
	</Box>
)

Z3usSpinnerAnimation.defaultProps = defaultProps
