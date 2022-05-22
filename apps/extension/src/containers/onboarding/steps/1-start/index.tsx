import React, { useEffect } from 'react'
import Button from 'ui/src/components/button'
import Pill from 'ui/src/components/pill'
import { MotionBox } from 'ui/src/components/atoms/motion-box'
import { useImmer } from 'use-immer'
import { PageWrapper } from '@src/components/layout'
import { Text, Box, Flex, StyledLink } from 'ui/src/components/atoms'
import { useStore } from '@src/store'
import { onBoardingSteps } from '@src/store/onboarding'
import { Z3usText } from 'ui/src/components/z3us-text'
import { CheckItem } from './check-item'

const setupItems = {
	send: { title: 'Send and receive tokens.', comingSoon: false },
	earn: { title: 'Earn XRD by staking.', comingSoon: false },
	sign: { title: 'Sign DApp transactions.', comingSoon: false },
	view: { title: 'View and manage your NFTs.', comingSoon: true },
	trade: { title: 'Swap tokens using wallet DEX.', comingSoon: true },
}

const ulVariants = {
	open: {
		transition: { staggerChildren: 0.07, delayChildren: 0 },
	},
	closed: {
		transition: { staggerChildren: 0.05, staggerDirection: -1 },
	},
}

export const Start = (): JSX.Element => {
	const { setOnboardingStep, setIsRestoreWorkflow } = useStore(state => ({
		setOnboardingStep: state.setOnboardingStepAction,
		setIsRestoreWorkflow: state.setIsRestoreWorkflowAction,
	}))

	const [state, setState] = useImmer({
		mounted: false,
	})

	const handleCreateNewWallet = () => {
		setIsRestoreWorkflow(false)
		setOnboardingStep(onBoardingSteps.GENERATE_PHRASE)
	}

	const handleRestoreFromPhrase = () => {
		setIsRestoreWorkflow(true)
		setOnboardingStep(onBoardingSteps.INSERT_PHRASE)
	}

	useEffect(() => {
		setState(draft => {
			draft.mounted = true
		})
	}, [])

	return (
		<PageWrapper css={{ flex: '1', position: 'relative', display: 'flex', flexDirection: 'column' }}>
			<Flex css={{ pt: '$4' }}>
				<Box css={{ position: 'relative' }}>
					<Pill color="gradientGreen" css={{ position: 'absolute', top: '-22px', left: '-1px' }}>
						BETA
					</Pill>
					<Z3usText css={{ width: '130px', height: '40px' }} />
				</Box>
			</Flex>
			<Box css={{ pt: '$6' }}>
				<Text medium size="9" centra>
					Setup your wallet to enter the world of DeFi on{' '}
					<StyledLink as="a" href="https://www.radixdlt.com" target="_blank" bubble>
						Radix DLT
					</StyledLink>
					.
				</Text>
			</Box>
			<MotionBox css={{ mt: '$1', pt: '$4', flex: '1' }} initial={false} animate={state.mounted ? 'open' : 'closed'}>
				<MotionBox variants={ulVariants} as="ul" css={{ mt: '0', li: { mt: '$3' } }}>
					{Object.entries(setupItems).map(([key, { title, comingSoon }]) => (
						<CheckItem key={key} name={title} comingSoon={comingSoon} />
					))}
				</MotionBox>
			</MotionBox>
			<Flex>
				<Button color="primary" size="6" onClick={handleCreateNewWallet} fullWidth>
					Create new wallet
				</Button>
			</Flex>
			<Flex css={{ mt: '$2' }}>
				<Button color="tertiary" size="6" onClick={handleRestoreFromPhrase} fullWidth>
					Restore from seed
				</Button>
			</Flex>
		</PageWrapper>
	)
}
