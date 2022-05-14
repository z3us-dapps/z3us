import React from 'react'
import { keyframes } from 'ui/src/theme'
import { Box, Flex } from 'ui/src/components/atoms'

const ANIMATION_DURATION = '1500ms'

const skeletonAnimation = keyframes({
	from: { transform: 'translateX(-150px) skewX(-15deg)' },
	to: { transform: 'translateX(600px) skewX(-15deg)' },
})

const skeletonOpacityAnimation = keyframes({
	'0%': { opacity: '1.0' },
	'50%': { opacity: '0.7' },
	'100%': { opacity: '1.0' },
})

export const TokenLoadingRow: React.FC = () => (
	<Box
		css={{
			'&::before': {
				content: '""',
				position: 'absolute',
				top: '0',
				left: '0',
				background: '$bgSkeleton1',
				width: '60px',
				height: '100%',
				transform: 'translateX(-150px) skewX(-15deg)',
				filter: 'blur(30px)',
				animationDuration: `${ANIMATION_DURATION}`,
				animationName: `${skeletonAnimation}`,
				animationIterationCount: 'infinite',
				animationTimingFunction: 'ease-in-out',
			},
			'&::after': {
				content: '""',
				position: 'absolute',
				top: '0',
				left: '30px',
				background: '$bgSkeleton2',
				width: '60px',
				height: '100%',
				transform: 'translateX(-150px) skewX(-15deg)',
				filter: 'blur(20px)',
				animationDuration: `${ANIMATION_DURATION}`,
				animationName: `${skeletonAnimation}`,
				animationIterationCount: 'infinite',
				animationTimingFunction: 'ease-in-out',
			},
			background: '$bgPanel2',
			position: 'relative',
			br: '$3',
			height: '48px',
			width: '100%',
			overflow: 'hidden',
			transition: '$default',
			animationDuration: '1000ms',
			animationName: `${skeletonOpacityAnimation}`,
			animationIterationCount: 'infinite',
			animationTimingFunction: 'ease-in-out',
		}}
	/>
)

export const TokenLoadingRows: React.FC = () => (
	<Flex direction="column" align="center" justify="start" css={{ height: '140px' }}>
		<Flex
			css={{
				height: '68px',
				width: '100%',
				background: '$bgPanel',
				px: '$4',
			}}
		>
			<Flex align="center" justify="center" css={{ width: '100%' }}>
				<TokenLoadingRow />
			</Flex>
		</Flex>
		<Flex
			css={{
				height: '68px',
				width: '100%',
				borderTop: '1px solid $borderPanel',
				background: '$bgPanel',
				px: '$4',
			}}
		>
			<Flex align="center" justify="center" css={{ width: '100%' }}>
				<TokenLoadingRow />
			</Flex>
		</Flex>
	</Flex>
)
