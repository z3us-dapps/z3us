import React, { useEffect, useRef } from 'react'
import { useSharedStore, useStore } from '@src/store'
import { useImmer } from 'use-immer'
import { Z3usSpinnerAnimation } from '@src/components/z3us-spinner-animation'
import { WalletMenu } from '@src/components/wallet-menu'
import { Z3usMenu } from '@src/components/z3us-menu'
import { Box, Flex, MotionBox, Text, StyledLink } from 'ui/src/components/atoms'
import Input from 'ui/src/components/input'
import InputFeedBack from 'ui/src/components/input/input-feedback'
import Button from 'ui/src/components/button'
import { Z3usText } from 'ui/src/components/z3us-text'
import { isWebAuthSupported } from '@src/services/credentials'
import { KeystoreSelector } from '@src/components/keystore-selector'
import { KeystoreType } from '@src/store/types'

export const LockedPanel: React.FC = () => {
	const inputRef = useRef(null)
	const { addToast } = useSharedStore(state => ({
		addToast: state.addToastAction,
	}))
	const { keystore, unlock, unlockHW, hasAuth, authenticate, isUnlocked, setSeed, hw, seed } = useSharedStore(
		state => ({
			keystore: state.keystores.find(({ id }) => id === state.selectKeystoreId),
			isUnlocked: Boolean(state.masterSeed || state.isHardwareWallet),
			hw: state.hardwareWallet,
			seed: state.masterSeed,
			unlock: state.unlockWalletAction,
			hasAuth: state.hasAuthAction,
			authenticate: state.authenticateAction,
			setSeed: state.setMasterSeedAction,
			unlockHW: state.unlockHardwareWalletAction,
		}),
	)
	const { selectAccount } = useStore(state => ({
		selectAccount: state.selectAccountAction,
	}))
	const [state, setState] = useImmer({
		password: '',
		passwordError: false,
		isLoading: false,
	})

	const handleUnlock = async password => {
		setState(draft => {
			draft.isLoading = true
		})

		try {
			switch (keystore.type) {
				case KeystoreType.LOCAL:
					await setSeed(await unlock(password))
					await selectAccount(0, hw, seed)
					break
				case KeystoreType.HARDWARE:
					await unlockHW()
					await selectAccount(0, hw, seed)
					break
				default:
					throw new Error(`Unknown keystore ${keystore.id} (${keystore.name}) type: ${keystore.type}`)
			}
		} catch (error) {
			if (state.passwordError) {
				addToast({
					type: 'error',
					title: 'Invalid password',
					subTitle: 'Are you sure you typed it correctly?',
					duration: 8000,
				})
			}
			setState(draft => {
				draft.passwordError = true
			})

			if (inputRef.current) {
				inputRef.current.focus()
			}
		}
		setState(draft => {
			draft.isLoading = false
		})
	}

	const unlockWithWebAuth = async () => {
		try {
			const isSupported = await isWebAuthSupported()
			const has = await hasAuth()
			if (isSupported && has) {
				handleUnlock(await authenticate())
			}
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error)
		}
	}

	useEffect(() => {
		if (isUnlocked) return
		setState(draft => {
			draft.password = ''
			draft.isLoading = false
		})
		unlockWithWebAuth()
	}, [isUnlocked])

	const handleSubmitForm = (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()
		handleUnlock(state.password)
	}

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setState(draft => {
			draft.password = e.target.value
			draft.passwordError = false
		})
	}

	return (
		<MotionBox
			initial={false}
			css={{
				position: 'absolute',
				top: '0',
				left: '0',
				width: '100%',
				height: '100%',
				backgroundColor: '$bgPanel',
			}}
			animate={isUnlocked ? 'unlocked' : 'locked'}
			variants={{
				locked: {
					transform: 'translateY(0px)',
					transition: {
						ease: 'easeOut',
						duration: 0,
					},
				},
				unlocked: () => ({
					transform: `translateY(-620px)`,
					transition: {
						type: 'spring',
						stiffness: 100,
						damping: 25,
					},
				}),
			}}
		>
			<Flex direction="column" css={{ height: '100%', position: 'relative', zIndex: '1' }}>
				<Flex
					css={{
						display: 'flex',
						height: '48px',
						pt: '6px',
						pl: '6px',
						pr: '6px',
						justifyContent: 'space-between',
					}}
				>
					<Box css={{ opacity: '0', pe: 'none' }}>
						<Z3usMenu />
					</Box>
					<WalletMenu />
				</Flex>
				<Flex align="center" justify="center" css={{ flex: '1' }}>
					<Box>
						<Z3usSpinnerAnimation showAnimation={false} />
						<Box css={{ ta: 'center', pt: '$8' }}>
							<Z3usText css={{ width: '130px', height: '30px' }} />
						</Box>
					</Box>
				</Flex>

				<Flex align="center" justify="center">
					<KeystoreSelector />
				</Flex>

				<form onSubmit={handleSubmitForm}>
					<Box css={{ p: '$6' }}>
						<Box>
							<Input
								type="password"
								size="2"
								ref={inputRef}
								placeholder="Enter password"
								focusOnMount
								value={state.password}
								error={state.passwordError}
								onChange={handlePasswordChange}
							/>
							<InputFeedBack showFeedback={state.passwordError} animateHeight={31}>
								<StyledLink underlineOnHover href="#/onboarding" css={{ display: 'block', mt: '12px' }}>
									<Text uppercase medium>
										Forgot password?
									</Text>
								</StyledLink>
							</InputFeedBack>
						</Box>
						<Flex css={{ mt: '$3' }}>
							<Button type="submit" loading={state.isLoading} color="primary" size="6" css={{ flex: '1' }}>
								Unlock
							</Button>
						</Flex>
					</Box>
				</form>
			</Flex>
		</MotionBox>
	)
}
