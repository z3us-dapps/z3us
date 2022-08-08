import React, { useEffect } from 'react'
import { useLocation } from 'wouter'
import Button from 'ui/src/components/button'
import { HardwareWalletIcon } from 'ui/src/components/icons'
import Pill from 'ui/src/components/pill'
import { MotionBox } from 'ui/src/components/atoms/motion-box'
import { useImmer } from 'use-immer'
import { PageWrapper } from '@src/components/layout'
import { Text, Box, Flex, StyledLink } from 'ui/src/components/atoms'
import { useSharedStore, useStore } from '@src/store'
import { onBoardingSteps } from '@src/store/onboarding'
import { Z3usText } from 'ui/src/components/z3us-text'
import { KeystoreType } from '@src/store/types'
import { generateId } from '@src/utils/generate-id'
import { popupHtmlMap } from '@src/config'
import { CheckItem } from './check-item'

interface ImmerT {
	mounted: boolean
}

const setupItems = {
	send: { title: 'Send and receive tokens.', comingSoon: false },
	earn: { title: 'Earn XRD by staking.', comingSoon: false },
	//sign: { title: 'Sign DApp transactions.', comingSoon: false },
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
	const [, setLocation] = useLocation()
	const { theme, keystoreId, setOnboardingStep, setIsRestoreWorkflow, lock, addKeystore } = useSharedStore(state => ({
		theme: state.theme,
		keystoreId: state.selectKeystoreId,
		setOnboardingStep: state.setOnboardingStepAction,
		setIsRestoreWorkflow: state.setIsRestoreWorkflowAction,
		lock: state.lockAction,
		addKeystore: state.addKeystoreAction,
	}))
	const { publicAddresses } = useStore(state => ({
		publicAddresses: state.publicAddresses,
	}))
	const [state, setState] = useImmer<ImmerT>({
		mounted: false,
	})

	const createKeystore = async (type: KeystoreType) => {
		if (keystoreId && Object.keys(publicAddresses).length === 0) {
			return
		}

		const id = generateId()
		addKeystore(id, id, type, false)
		await lock() // clear background memory
	}

	const handleCreateNewWallet = async () => {
		await createKeystore(KeystoreType.LOCAL)
		setIsRestoreWorkflow(false)
		setOnboardingStep(onBoardingSteps.GENERATE_PHRASE)
	}

	const handleRestoreFromPhrase = async () => {
		await createKeystore(KeystoreType.LOCAL)
		setIsRestoreWorkflow(true)
		setOnboardingStep(onBoardingSteps.INSERT_PHRASE)
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
				<MotionBox variants={ulVariants} as="ul" css={{ mt: '0', li: { mt: '$3' } }}>
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
				<Button color="tertiary" size="5" onClick={handleRestoreFromPhrase} fullWidth>
					Restore from seed
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
		</PageWrapper>
	)
}
