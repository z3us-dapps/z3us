import React from 'react'
import { keyframes } from 'ui/src/theme'
import { Image, Box } from 'ui/src/components/atoms'

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
	lightBgColor?: string
	darkBgColor?: string
}

const defaultProps = {
	width: 332,
	height: 332,
	animationTime: ANIMATION_TIME,
	infinite: false,
	showAnimation: false,
	lightBgColor: '#5a1dab',
	darkBgColor: '#5a1dab',
}

export const Z3usBrandLanding: React.FC<IProps> = ({
	width,
	height,
	animationTime,
	infinite,
	showAnimation,
	lightBgColor,
	darkBgColor,
}: IProps) => (
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
						backgroundImage: false
							? 'linear-gradient(135deg, #5a1dab 0%,  #5a1dab 25%, #00fff6 50%, #5a1dab 100%)'
							: 'linear-gradient(135deg, #5a1dab 0%,  #5a1dab 25%, #00fff6 50%, #5a1dab 100%)',
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
						background: false ? darkBgColor : lightBgColor,
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
				<Image
					src="/images/zeus-circle-brand-gold.svg"
					css={{ position: 'absolute', top: '0', left: '0', pe: 'none' }}
				/>
			</Box>
		</Box>
	</Box>
)

Z3usBrandLanding.defaultProps = defaultProps
