import React, { useEffect } from 'react'
import { useImmer } from 'use-immer'
import { useLocation } from 'wouter'

import { Box, Flex, StyledLink, Text } from 'ui/src/components/atoms'
import { MotionBox } from 'ui/src/components/atoms/motion-box'
import Button from 'ui/src/components/button'
import { HardwareWalletIcon } from 'ui/src/components/icons'
import Pill from 'ui/src/components/pill'
import { Z3usText } from 'ui/src/components/z3us-text'

import { PageWrapper } from '@src/components/layout'
import { popupHtmlMap } from '@src/config'
import { useSharedStore } from '@src/hooks/use-store'
import { onBoardingSteps } from '@src/store/onboarding'

import { CheckItem } from './check-item'

interface ImmerT {
	mounted: boolean
}

const setupItems = {
	send: { title: 'Send and receive tokens.', comingSoon: false },
	earn: { title: 'Earn XRD by staking.', comingSoon: false },
	trade: { title: 'Swap and trade tokens.', comingSoon: false },
	view: { title: 'View and manage NFTs.', comingSoon: true },
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
	const [, setLocation] = useLocation()
	const { theme, setOnboardingStep, setWorkflowEntryStep } = useSharedStore(state => ({
		theme: state.theme,
		setOnboardingStep: state.setOnboardingStepAction,
		setWorkflowEntryStep: state.setWorkflowEntryStepAction,
	}))
	const [state, setState] = useImmer<ImmerT>({
		mounted: false,
	})

	const handleCreateNewWallet = async () => {
		setWorkflowEntryStep(onBoardingSteps.GENERATE_PHRASE)
		setOnboardingStep(onBoardingSteps.GENERATE_PHRASE)
	}

	const handleRestoreFromPhrase = async () => {
		setWorkflowEntryStep(onBoardingSteps.INSERT_PHRASE)
		setOnboardingStep(onBoardingSteps.INSERT_PHRASE)
	}

	const handleImportKey = async () => {
		setWorkflowEntryStep(onBoardingSteps.INSERT_KEY)
		setOnboardingStep(onBoardingSteps.INSERT_KEY)
	}

	const connectHardwareWallet = async () => {
		window.open(`${window.location.origin}/${popupHtmlMap[theme]}#/hardware-wallet`)
		setLocation('#/hardware-wallet')
	}

	useEffect(() => {
		setState(draft => {
			draft.mounted = true
		})
	}, [])

	return (
		<PageWrapper css={{ flex: '1', position: 'relative', display: 'flex', flexDirection: 'column' }}>
			<Flex css={{ pt: '$2' }}>
				<Box css={{ position: 'relative' }}>
					<Pill data-test-e2e="pill" color="gradientGreen" css={{ position: 'absolute', top: '-22px', left: '-1px' }}>
						BETA
					</Pill>
					<Z3usText css={{ width: '130px', height: '40px' }} />
				</Box>
			</Flex>
			<Box css={{ pt: '$6' }}>
				<Text bold size="9">
					Setup your wallet to enter the world of DeFi on{' '}
					<StyledLink as="a" href="https://www.radixdlt.com" target="_blank" bubble>
						Radix DLT
					</StyledLink>
					.
				</Text>
			</Box>
			<MotionBox css={{ mt: '$1', pt: '$3', flex: '1' }} initial={false} animate={state.mounted ? 'open' : 'closed'}>
				<MotionBox variants={ulVariants} css={{ display: 'flex', flexDirection: 'column', gap: '$3', mt: '0' }}>
					{Object.entries(setupItems).map(([key, { title, comingSoon }]) => (
						<CheckItem key={key} name={title} comingSoon={comingSoon} />
					))}
				</MotionBox>
			</MotionBox>
			<Flex>
				<Button data-test-e2e="create-new-wallet" color="primary" size="5" onClick={handleCreateNewWallet} fullWidth>
					Create new wallet
				</Button>
			</Flex>
			<Flex css={{ mt: '$2' }}>
				<Button color="tertiary" size="5" onClick={connectHardwareWallet} fullWidth>
					<Box as="span">Connect Ledger</Box>
					<Box as="span" css={{ pl: '4px', mt: '1px' }}>
						<HardwareWalletIcon />
					</Box>
				</Button>
			</Flex>
			<Flex justify="center" css={{ mt: '$4', gap: '12px' }}>
				<StyledLink
					underline
					as="button"
					data-test-e2e="restore-from-seed"
					onClick={handleRestoreFromPhrase}
					css={{ color: '$txtHelp' }}
				>
					<Text>Restore from seed</Text>
				</StyledLink>
				<StyledLink
					underline
					as="button"
					data-test-e2e="import-key"
					onClick={handleImportKey}
					css={{ color: '$txtHelp' }}
				>
					<Text>Import private key</Text>
				</StyledLink>
			</Flex>
		</PageWrapper>
	)
}
