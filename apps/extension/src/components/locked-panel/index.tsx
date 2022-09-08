/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef, useState } from 'react'
import { useSharedStore, useStore } from '@src/store'
import { motion, useAnimationControls } from 'framer-motion'
import { useImmer } from 'use-immer'
// import { Z3usSpinnerAnimation } from '@src/components/z3us-spinner-animation'
import { WalletMenu } from '@src/components/wallet-menu'
import { Box, Flex, MotionBox, Text, StyledLink } from 'ui/src/components/atoms'
import Input from 'ui/src/components/input'
import { ChevronDownIcon } from 'ui/src/components/icons'
// import InputFeedBack from 'ui/src/components/input/input-feedback'
import Button from 'ui/src/components/button'
import { Z3usText } from 'ui/src/components/z3us-text'
// import { isWebAuthSupported } from '@src/services/credentials'
import { KeystoreType } from '@src/store/types'
import { WalletSelector } from './wallet-selector'
import { Z3USLogoOuter, Z3USLogoInner } from './z3us-logo'

const wait = (ms: number) => {
	return new Promise(resolve => setTimeout(resolve, ms))
}

interface IImmer {
	password: string
	passwordError: boolean
	isLoading: boolean
	isInputFocused: boolean
}

export const LockedPanel: React.FC = () => {
	const panelControls = useAnimationControls()
	const z3usLogoControls = useAnimationControls()
	const z3usLogoSpinnerControls = useAnimationControls()
	const inputControls = useAnimationControls()
	const imageControls = useAnimationControls()
	const inputRef = useRef(null)
	const { keystore, unlock, unlockHW, isUnlocked, setSeed, hw, addToast } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectKeystoreId),
		isUnlocked: Boolean(state.masterSeed || state.isHardwareWallet),
		hw: state.hardwareWallet,
		seed: state.masterSeed,
		unlock: state.unlockWalletAction,
		// hasAuth: state.hasAuthAction,
		// authenticate: state.authenticateAction,
		setSeed: state.setMasterSeedAction,
		unlockHW: state.unlockHardwareWalletAction,
		addToast: state.addToastAction,
	}))

	const { selectAccount } = useStore(state => ({
		selectAccount: state.selectAccountAction,
	}))
	const [state, setState] = useImmer<IImmer>({
		password: '',
		passwordError: false,
		isLoading: false,
		isInputFocused: false,
	})

	const resetAnimElements = () => {
		z3usLogoSpinnerControls.stop()
		z3usLogoSpinnerControls.set({
			rotate: [null, 0],
		})
		z3usLogoControls.start({
			y: '0',
			fill: '#323232',
			transition: { duration: 0.1, ease: 'anticipate' },
		})
		inputControls.start({ y: '0px', opacity: 1, transition: { duration: 0.3, ease: 'anticipate' } })
		imageControls.start({ opacity: 0, transition: { delay: 0.1, duration: 0.4, ease: 'easeIn' } })
	}

	const handleUnlock = async (password: string) => {
		console.log('handleUnlock:')
		setState(draft => {
			draft.isLoading = true
		})
		inputControls.set({ opacity: 1 })
		imageControls.set({ opacity: 0 })
		z3usLogoControls.set({ fill: '#323232' })
		inputControls.start({ y: '40px', opacity: 0, transition: { duration: 0.3, ease: 'anticipate' } })
		z3usLogoSpinnerControls.start({
			rotate: [null, 360],
			transition: {
				delay: 0.1,
				duration: 5,
				repeat: Infinity,
				ease: 'linear',
			},
		})
		z3usLogoControls.start({
			y: '96px',
			fill: '#8457FF',
			transition: { duration: 0.1, ease: 'anticipate' },
		})
		imageControls.start({ opacity: 1, transition: { delay: 0.1, duration: 0.4, ease: 'easeIn' } })

		await wait(1000)

		try {
			switch (keystore.type) {
				case KeystoreType.LOCAL: {
					const newSeed = await unlock(password)
					setSeed(newSeed)
					await selectAccount(0, null, newSeed)
					break
				}
				case KeystoreType.HARDWARE:
					unlockHW()
					await selectAccount(0, hw, null)
					break
				default:
					throw new Error(`Unknown keystore ${keystore.id} (${keystore.name}) type: ${keystore.type}`)
			}
		} catch (error) {
			resetAnimElements()
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
		// try {
		// 	const isSupported = await isWebAuthSupported()
		// 	const has = await hasAuth()
		// 	if (isSupported && has) {
		// 		handleUnlock(await authenticate())
		// 	}
		// } catch (error) {
		// 	// eslint-disable-next-line no-console
		// 	console.error(error)
		// }
	}

	const unlockAnimation = async (isUnlocked: boolean) => {
		if (isUnlocked) {
			z3usLogoControls.start({
				y: '96px',
				fill: '#8457FF',
				scale: 22,
				transition: { duration: 0.1, ease: 'anticipate' },
			})
			panelControls.start({ y: '0px', opacity: 0, transition: { delay: 0.1, duration: 0.5, ease: 'anticipate' } })
			panelControls.start({ y: '-3620px', opacity: 0, transition: { delay: 0.2, duration: 0 } })
			z3usLogoSpinnerControls.stop()
			z3usLogoSpinnerControls.set({
				rotate: [null, 0],
			})
		} else {
			z3usLogoControls.start({
				y: '0',
				fill: '#323232',
				scale: 1,
				transition: { duration: 0, ease: 'anticipate' },
			})
			inputControls.start({ y: '0px', opacity: 1, transition: { duration: 0, ease: 'anticipate' } })
			imageControls.start({ opacity: 0, transition: { delay: 0, duration: 0, ease: 'easeIn' } })
			panelControls.start({ y: '0px', opacity: 1, transition: { delay: 0, duration: 0, ease: 'easeOut' } })
		}
	}

	useEffect(() => {
		unlockAnimation(isUnlocked)
		if (!isUnlocked) return

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
			animate={panelControls}
			css={{
				position: 'absolute',
				top: '0',
				left: '0',
				width: '100%',
				height: '100%',
				backgroundColor: '$bgPanel2',
			}}
			initial={false}
			// animate={isUnlocked ? 'unlocked' : 'locked'}
			// variants={{
			// 	locked: {
			// 		transform: 'translateY(0px)',
			// 		transition: {
			// 			ease: 'easeOut',
			// 			duration: 0,
			// 		},
			// 	},
			// 	unlocked: () => ({
			// 		transform: `translateY(-620px)`,
			// 		transition: {
			// 			type: 'spring',
			// 			stiffness: 100,
			// 			damping: 25,
			// 		},
			// 	}),
			// }}
		>
			<Flex direction="column" css={{ height: '100%', position: 'relative', zIndex: '1' }}>
				<Flex
					css={{
						display: 'flex',
						height: '48px',
						pt: '6px',
						pl: '6px',
						pr: '6px',
						justifyContent: 'flex-end',
					}}
				>
					<WalletMenu />
					<Box
						css={{
							width: '102px',
							height: '18px',
							fill: '$iconDefault',
							position: 'absolute',
							top: '15px',
							left: '50%',
							marginLeft: '-51px',
						}}
					>
						<Z3usText css={{ width: '102px', height: '18px', fill: '$iconDefault' }} />
					</Box>
				</Flex>
				<Flex align="center" justify="center" css={{ flex: '1', position: 'relative' }}>
					<MotionBox
						animate={imageControls}
						css={{
							pe: 'none',
							opacity: '0',
							position: 'absolute',
							width: '204px',
							height: '347px',
							top: '-16px',
							right: '0px',
							backgroundImage: 'url("/images/locked-panel-right.webp")',
							backgroundSize: '100%',
						}}
					/>
					<MotionBox
						animate={z3usLogoControls}
						css={{
							width: '232px',
							height: '232px',
							bg: '$bgPanel',
							borderRadius: '50%',
							position: 'absolute',
							top: '30px',
							left: '50%',
							marginLeft: '-116px',
							boxShadow: '0px 10px 44px rgba(0, 0, 0, 0.35)',
							transition: '$default',
							fill: '$bgPanel2',
							zIndex: '99',
						}}
					>
						<MotionBox
							initial={false}
							animate={z3usLogoSpinnerControls}
							css={{ width: '232px', height: '232px', position: 'absolute', top: '0', left: '0' }}
						>
							<Z3USLogoOuter />
						</MotionBox>
						<Box
							css={{
								width: '168px',
								height: '168px',
								position: 'absolute',
								top: '32px',
								left: '32px',
							}}
						>
							<Z3USLogoInner />
						</Box>
					</MotionBox>
				</Flex>

				<form onSubmit={handleSubmitForm}>
					<Box css={{ p: '$6' }}>
						{keystore.type === KeystoreType.LOCAL && (
							<MotionBox animate={inputControls}>
								<WalletSelector />
								<Box
									onClick={() => {
										if (inputRef.current) {
											inputRef.current.focus()
										}
									}}
									css={{
										pb: '10px',
										position: 'relative',
										transition: '$default',
										borderBottom: '2px solid',
										color: '$txtMuted',
										borderColor: state.passwordError
											? '$borderInputError'
											: state.isInputFocused
											? '$borderInputFocus'
											: '$borderPanel',
									}}
								>
									<Input
										type="password"
										theme="minimal"
										size="2"
										ref={inputRef}
										focusOnMount
										value={state.password}
										// placeholder="Enter password"
										error={state.passwordError}
										onChange={handlePasswordChange}
										onFocus={() => {
											setState(draft => {
												draft.isInputFocused = true
											})
										}}
										onBlur={() => {
											setState(draft => {
												draft.isInputFocused = false
											})
										}}
									/>
									<Box css={{ pb: '7px' }}>
										{state.passwordError ? (
											<Text size="5" color="red">
												<StyledLink underlineOnHover href="#/onboarding" css={{ display: 'block' }}>
													Forgot password?
												</StyledLink>
											</Text>
										) : (
											<Text size="5" color="muted">
												Password
											</Text>
										)}
									</Box>
								</Box>
							</MotionBox>
						)}
						<Flex css={{ mt: '$4', transition: '$default', opacity: state.isLoading ? '0.4' : '1.0', zIndex: '1' }}>
							<Button type="submit" loading={state.isLoading} color="primary" size="6" css={{ flex: '1' }}>
								Unlock
							</Button>
						</Flex>
					</Box>
				</form>
			</Flex>
			<MotionBox
				animate={imageControls}
				css={{
					opacity: '0',
					pe: 'none',
					position: 'absolute',
					width: '180px',
					height: '277px',
					bottom: '0px',
					left: '0px',
					backgroundImage: 'url("/images/locked-panel-left.webp")',
					backgroundSize: '100%',
				}}
			/>
		</MotionBox>
	)
}
