import React, { useEffect } from 'react'
import { useEventListener } from 'usehooks-ts'
import { useNoneSharedStore } from '@src/hooks/use-store'
import { Box, Flex, MotionBox } from 'ui/src/components/atoms'
import { useLocation } from 'wouter'
import { UpArrowWideIcon } from 'ui/src/components/icons'
import Button from 'ui/src/components/button'
import { SLIDE_PANEL_HEIGHT, SLIDE_PANEL_EXPAND_HEIGHT } from '@src/config'

interface IProps {
	children: React.ReactNode
	headerComponent: React.ReactNode
	slidePanelHeight?: number
}

const defaultProps = {
	slidePanelHeight: SLIDE_PANEL_HEIGHT,
}

export const SlideUpPanel: React.FC<IProps> = ({ children, headerComponent, slidePanelHeight }) => {
	const [location] = useLocation()
	const { expanded, setExpanded } = useNoneSharedStore(state => ({
		expanded: state.accountPanelExpanded,
		setExpanded: state.setAccountPanelExpandedAction,
	}))

	useEventListener('keydown', e => {
		if (e.code === 'ArrowUp') {
			setExpanded(true)
		}
		if (e.code === 'ArrowDown') {
			setExpanded(false)
		}
	})

	useEffect(() => {
		setExpanded(false)
	}, [location])

	return (
		<Box
			css={{
				position: 'absolute',
				bottom: '0',
				paddingBottom: '55px',
				left: '0',
				right: '0',
				zIndex: '1',
				borderRadius: '20px 20px 0 0',
				background: '$bgPanel',
				boxShadow: '$shadowPanel',
			}}
		>
			<Flex css={{ width: '100%', position: 'relative', zIndex: '2' }} justify="center">
				<Button
					size="6"
					color="ghost"
					iconOnly
					onClick={() => {
						setExpanded(!expanded)
					}}
					css={{
						svg: {
							transform: expanded ? 'rotateX(180deg)' : 'rotateX(0deg)',
							transition: 'all 300ms ease-out',
						},
					}}
				>
					<UpArrowWideIcon />
				</Button>
			</Flex>
			<MotionBox
				variants={{
					contracted: {
						height: `${slidePanelHeight}px`,
						transition: {
							type: 'spring',
							stiffness: 200,
							damping: 20,
						},
					},
					expanded: () => ({
						height: `${SLIDE_PANEL_EXPAND_HEIGHT}px`,
						transition: {
							delay: 0,
							type: 'spring',
							stiffness: 200,
							damping: 26,
						},
					}),
				}}
				initial={false}
				animate={expanded ? 'expanded' : 'contracted'}
			>
				{headerComponent}
				<Box css={{ height: 'calc(100% - 30px)', position: 'relative' }}>{children}</Box>
			</MotionBox>
		</Box>
	)
}
SlideUpPanel.defaultProps = defaultProps
