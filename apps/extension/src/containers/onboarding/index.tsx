import React from 'react'
import { useLocation } from 'wouter'
import { onBoardingSteps } from '@src/store/onboarding'
import { LeftArrowIcon } from 'ui/src/components/icons'
import Button from 'ui/src/components/button'
import { MotionBox } from 'ui/src/components/atoms/motion-box'
import { AnimatePresence } from 'framer-motion'
import { useStore } from '@src/store'
import { Start } from '@src/containers/onboarding/steps/1-start'
import { WalletMenu } from '@src/components/wallet-menu'
import { GeneratePhrase } from '@src/containers/onboarding/steps/2a-generate-phrase'
import { CreatePassword } from '@src/containers/onboarding/steps/4-create-password'
import { CreateWallet } from '@src/containers/onboarding/steps/5-create-wallet'
import { InsertPhrase } from '@src/containers/onboarding/steps/2b-insert-phrase'
import { ImportAccounts } from '@src/containers/onboarding/steps/3-import-accounts'
import { Flex } from 'ui/src/components/atoms'
import { useColorMode } from '@src/hooks/use-color-mode'

export const OnboardingWorkFlow: React.FC = () => {
	const [, setLocation] = useLocation()
	const isDarkMode = useColorMode()
	const { onBoardingStep, setOnboardingStep, setIsRestoreWorkflow, isRestoreWorkflow } = useStore(state => ({
		onBoardingStep: state.onBoardingStep,
		setOnboardingStep: state.setOnboardingStepAction,
		setIsRestoreWorkflow: state.setIsRestoreWorkflowAction,
		isRestoreWorkflow: state.isRestoreWorkflow,
		//hasKeystore: state.hasKeystore,
	}))

	const handleBackClick = () => {
		switch (onBoardingStep) {
			case onBoardingSteps.START:
				setLocation('#/wallet/account')
				break
			case onBoardingSteps.GENERATE_PHRASE:
				setIsRestoreWorkflow(false)
				setOnboardingStep(onBoardingSteps.START)
				break
			case onBoardingSteps.INSERT_PHRASE:
				setOnboardingStep(onBoardingSteps.START)
				break
			case onBoardingSteps.IMPORT_ACCOUNTS:
				if (isRestoreWorkflow) {
					setOnboardingStep(onBoardingSteps.INSERT_PHRASE)
				} else {
					setOnboardingStep(onBoardingSteps.GENERATE_PHRASE)
				}
				break
			case onBoardingSteps.CREATE_PASSWORD:
				setOnboardingStep(onBoardingSteps.IMPORT_ACCOUNTS)
				break
			case onBoardingSteps.CREATE_WALLET:
				setOnboardingStep(onBoardingSteps.CREATE_PASSWORD)
				break
			default:
				break
		}
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
				<Button
					color="ghost"
					onClick={handleBackClick}
					iconOnly
					size="3"
					aria-label="back"
					css={{
						mt: '2px',
						transition: '$default',
						//pe: hasKeystore && !onBoardingSteps.START ? 'auto' : 'none',
						//opacity: hasKeystore && !onBoardingSteps.START ? '1' : '0',
					}}
				>
					<LeftArrowIcon />
				</Button>
				<WalletMenu />
			</Flex>
			<Flex css={{ flex: '1' }}>
				<AnimatePresence exitBeforeEnter>
					<MotionBox
						key={onBoardingStep}
						animate={{ opacity: 1, y: 0 }}
						initial={{ opacity: 0, y: 20 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.15 }}
						css={{ display: 'flex', flexDirection: 'column', width: '100%' }}
					>
						{(() => {
							switch (onBoardingStep) {
								case onBoardingSteps.START:
									return <Start />
								case onBoardingSteps.GENERATE_PHRASE:
									return <GeneratePhrase />
								case onBoardingSteps.INSERT_PHRASE:
									return <InsertPhrase />
								case onBoardingSteps.IMPORT_ACCOUNTS:
									return <ImportAccounts />
								case onBoardingSteps.CREATE_PASSWORD:
									return <CreatePassword />
								case onBoardingSteps.CREATE_WALLET:
									return <CreateWallet />
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
