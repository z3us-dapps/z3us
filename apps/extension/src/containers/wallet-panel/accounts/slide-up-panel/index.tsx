import React, { useEffect } from 'react'
import { useStore } from '@src/store'
import { ScrollArea } from '@src/components/scroll-area'
import { Box, Flex, MotionBox, Text } from 'ui/src/components/atoms'
import { useLocation } from 'wouter'
import { UpArrowWideIcon } from 'ui/src/components/icons'
import Button from 'ui/src/components/button'

interface IProps {
	children: React.ReactNode
	name: string
}

export const SlideUpPanel: React.FC<IProps> = ({ children, name }: IProps) => {
	const [location] = useLocation()
	const { expanded, setExpanded } = useStore(state => ({
		expanded: state.accountPanelExpanded,
		setExpanded: state.setAccountPanelExpandedAction,
	}))

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
						height: '170px',
						transition: {
							type: 'spring',
							stiffness: 200,
							damping: 20,
						},
					},
					expanded: () => ({
						height: '459px',
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
				<Box
					css={{
						px: '$4',
						height: '30px',
						borderBottom: '1px solid $borderPanel',
						mt: '-10px',
					}}
				>
					<Text css={{ fontSize: '20px', lineHeight: '20px', fontWeight: '700' }}>{name}</Text>
				</Box>
				<Box css={{ height: 'calc(100% - 30px)', position: 'relative' }}>
					<ScrollArea>{children}</ScrollArea>
				</Box>
			</MotionBox>
		</Box>
	)
}
