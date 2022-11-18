import React from 'react'
import { useLocation } from 'wouter'
import { LeftArrowIcon } from 'ui/src/components/icons'
import Button from 'ui/src/components/button'
import { MotionBox } from 'ui/src/components/atoms/motion-box'
import { AnimatePresence } from 'framer-motion'
import { WalletMenu } from '@src/components/wallet-menu'
import { RegsiterCredentials } from '@src/containers/credentials/components/register-credentials'
import { Flex } from 'ui/src/components/atoms'
import { useColorMode } from '@src/hooks/use-color-mode'

export const Credentials: React.FC = () => {
	const [, setLocation] = useLocation()
	const isDarkMode = useColorMode()

	const handleBackClick = () => {
		setLocation('#/wallet/account')
	}

	return (
		<Flex
			direction="column"
			css={{
				position: 'relative',
				width: '100%',
				height: '100%',
				bg: '$bgPanel',
				top: '0',
				left: '0',
				backgroundColor: '$bgPanel',
				'&:before': {
					content: '',
					position: 'absolute',
					pe: 'auto',
					top: '0',
					left: '0',
					right: '0',
					bottom: '0',
					opacity: isDarkMode ? '0.1' : '0.2',
					backgroundImage: 'url("/images/unlock-bg.jpg")',
					backgroundSize: '100%',
				},
			}}
		>
			<Flex justify="between" css={{ height: '48px', position: 'relative', pt: '6px', pl: '6px', pr: '6px' }}>
				<Button color="ghost" onClick={handleBackClick} iconOnly size="3" aria-label="back" css={{ mt: '2px' }}>
					<LeftArrowIcon />
				</Button>
				<WalletMenu />
			</Flex>
			<Flex css={{ flex: '1' }}>
				<AnimatePresence exitBeforeEnter>
					<MotionBox
						animate={{ opacity: 1, y: 0 }}
						initial={{ opacity: 0, y: 20 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.15 }}
						css={{ display: 'flex', flexDirection: 'column', width: '100%' }}
					>
						<RegsiterCredentials />
					</MotionBox>
				</AnimatePresence>
			</Flex>
		</Flex>
	)
}

export default Credentials
