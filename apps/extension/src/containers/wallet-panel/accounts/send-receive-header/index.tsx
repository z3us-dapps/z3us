import React from 'react'
import { useLocation } from 'wouter'
import Button from 'ui/src/components/button'
import { MotionBox, Box } from 'ui/src/components/atoms'
import { LeftArrowIcon } from 'ui/src/components/icons'
import { WalletMenu } from '@src/components/wallet-menu'

interface IProps {
	backLocation?: string
	onExit?: () => void
}

const defaultProps = {
	backLocation: undefined,
	onExit: () => {},
}

export const SendReceiveHeader: React.FC<IProps> = ({ backLocation, onExit }: IProps) => {
	const [, setLocation] = useLocation()

	const handleBackClick = () => {
		onExit()
		if (backLocation) {
			setLocation(backLocation)
		}
	}

	return (
		<MotionBox
			variants={{
				locked: {
					transform: `translateY(-50px)`,
					transition: {
						type: 'spring',
						stiffness: 200,
						damping: 20,
					},
				},
				unlocked: () => ({
					transform: 'translateY(0px)',
					transition: {
						delay: 0,
						type: 'spring',
						stiffness: 200,
						damping: 26,
					},
				}),
			}}
			css={{
				display: 'flex',
				position: 'relative',
				top: 0,
				left: 0,
				right: 0,
				height: '48px',
				pt: '6px',
				pl: '6px',
				pr: '6px',
			}}
		>
			<Button color="ghost" iconOnly size="3" aria-label="go back" onClick={handleBackClick} css={{ mt: '2px' }}>
				<LeftArrowIcon />
			</Button>
			<Box css={{ flex: '1' }} />
			<WalletMenu />
		</MotionBox>
	)
}

SendReceiveHeader.defaultProps = defaultProps
