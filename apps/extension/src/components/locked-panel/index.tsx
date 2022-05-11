import React, { useEffect, useRef } from 'react'
import { useStore } from '@src/store'
import { useImmer } from 'use-immer'
import { Z3usSpinnerAnimation } from '@src/components/z3us-spinner-animation'
import { WalletMenu } from '@src/components/wallet-menu'
import { Box, Flex, MotionBox, Text, StyledLink } from 'ui/src/components/atoms'
import Input from 'ui/src/components/input'
import InputFeedBack from 'ui/src/components/input/input-feedback'
import Button from 'ui/src/components/button'
import { Z3usText } from 'ui/src/components/z3us-text'
import { isWebAuthSupported } from '@src/services/credentials'

export const LockedPanel: React.FC = () => {
	const inputRef = useRef(null)
	const { seed, unlockWalletAction, setActiveAccount, addToast, hasAuth, authenticate } = useStore(state => ({
		seed: state.masterSeed,
		unlockWalletAction: state.unlockWalletAction,
		network: state.networks[state.selectedNetworkIndex],
		setActiveAccount: state.selectAccountAction,
		addToast: state.addToastAction,
		hasAuth: state.hasAuthAction,
		authenticate: state.authenticateAction,
	}))
	const [state, setState] = useImmer({
		password: '',
		passwordError: false,
		isLoading: false,
	})
	const hasWallet = !!seed

	const handleUnlock = async password => {
		setState(draft => {
			draft.isLoading = true
		})

		try {
			await setActiveAccount(0)
			await unlockWalletAction(password)
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
		if (hasWallet) {
			setState(draft => {
				draft.password = ''
				draft.isLoading = false
			})
			unlockWithWebAuth()
		}
	}, [hasWallet])

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
			animate={hasWallet ? 'unlocked' : 'locked'}
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
						justifyContent: 'flex-end',
					}}
				>
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
