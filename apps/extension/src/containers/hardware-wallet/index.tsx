import { AnimatePresence } from 'framer-motion'
import React from 'react'

import { Flex } from 'ui/src/components/atoms'
import { MotionBox } from 'ui/src/components/atoms/motion-box'
import { Z3usText } from 'ui/src/components/z3us-text'

import { ImportAccounts } from '@src/containers/hardware-wallet/steps/1-import-accounts'
import { CompleteSync } from '@src/containers/hardware-wallet/steps/2-complete-sync'
import { useColorMode } from '@src/hooks/use-color-mode'
import { useSharedStore } from '@src/hooks/use-store'
import { connectHardwareWalletSteps } from '@src/store/onboarding'

export const HardwareWallet: React.FC = () => {
	const isDarkMode = useColorMode()
	const { step } = useSharedStore(state => ({
		step: state.connectHardwareWalletStep,
	}))

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
				minHeight: '100vh',
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
			<Flex align="start" css={{ pt: '$8', pb: '$2', width: '100%', maxWidth: '530px', mx: 'auto' }}>
				<Flex css={{ flex: '1', pt: '7px' }}>
					<Z3usText />
				</Flex>
			</Flex>
			<Flex css={{ flex: '1', width: '100%', maxWidth: '580px', mx: 'auto' }}>
				<AnimatePresence mode="wait">
					<MotionBox
						key={step}
						animate={{ opacity: 1, y: 0 }}
						initial={{ opacity: 0, y: 20 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.15 }}
						css={{ display: 'flex', flexDirection: 'column', width: '100%' }}
					>
						{(() => {
							switch (step) {
								case connectHardwareWalletSteps.IMPORT_ACCOUNTS:
									return <ImportAccounts />
								case connectHardwareWalletSteps.COMPLETE:
									return <CompleteSync />
								default:
									return null
							}
						})()}
					</MotionBox>
				</AnimatePresence>
			</Flex>
		</Flex>
	)
}

export default HardwareWallet
