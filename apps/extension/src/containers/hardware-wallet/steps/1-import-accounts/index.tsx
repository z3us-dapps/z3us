import React from 'react'
import TransportWebHID from '@ledgerhq/hw-transport-webhid'
import AlertCard from 'ui/src/components/alert-card'
import { HardwareWalletLedger } from '@radixdlt/hardware-ledger'
import { useEventListener } from 'usehooks-ts'
import { AccountAddress, SigningKey } from '@radixdlt/application'
import { HDPathRadix } from '@radixdlt/crypto'
import { useImmer } from 'use-immer'
import { useStore } from '@src/store'
import { CopyIcon, ReloadIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons'
import SimpleBar from 'simplebar-react'
import { copyTextToClipboard } from '@src/utils/copy-to-clipboard'
import { Checkbox, CheckIcon } from 'ui/src/components/checkbox'
import ButtonTipFeedback from 'ui/src/components/button-tip-feedback'
import { steps } from '@src/store/hardware-wallet'
import { getShortAddress } from '@src/utils/string-utils'
import InputFeedBack from 'ui/src/components/input/input-feedback'
import { PageWrapper, PageHeading, PageSubHeading } from '@src/components/layout'
import { Flex, Text, Box, MotionBox } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'

const isHIDSupported = !!window?.navigator?.hid

export const ImportAccounts = (): JSX.Element => {
	const { hwPublicAddresses, network, setStep, setPublicAddresses, sendAPDU } = useStore(state => ({
		hwPublicAddresses: state.hwPublicAddresses,
		network: state.networks[state.selectedNetworkIndex],
		setStep: state.setHardwareWalletStepAction,
		setPublicAddresses: state.setHWPublicAddressesAction,
		sendAPDU: state.sendAPDUAction,
	}))

	const [state, setState] = useImmer({
		addresses: [],
		addressMap: {},
		selectedIndexes: {},
		selectedAmount: 0,
		isLoading: false,
		isDerivingAccounts: false,
		errorMessage: '',
	})

	const handleRefreshDevices = async () => {
		if (!isHIDSupported) {
			return
		}

		setState(draft => {
			draft.isDerivingAccounts = false
			draft.isLoading = true
			draft.errorMessage = ''
		})

		try {
			const transport = await TransportWebHID.request()
			await transport.close()

			setState(draft => {
				draft.isDerivingAccounts = true
			})

			const addresses = []
			const hw = await HardwareWalletLedger.create({ send: sendAPDU }).toPromise()
			for (let i = 0; i < 4; i += 1) {
				const hdPath = HDPathRadix.create({ address: { index: i, isHardened: true } })
				// eslint-disable-next-line no-await-in-loop
				const hardwareSigningKey = await hw.makeSigningKey(hdPath, i === 0).toPromise()
				const signingKey = SigningKey.fromHDPathWithHWSigningKey({ hdPath, hardwareSigningKey })
				const address = AccountAddress.fromPublicKeyAndNetwork({
					publicKey: signingKey.publicKey,
					network: network.id,
				})

				addresses.push(address.toString())
			}

			const selectedIndexes = Object.fromEntries(Object.entries(hwPublicAddresses).map(([k]) => [k, true]))
			const addressMap = {}
			addresses.forEach((address, index) => {
				if (selectedIndexes[index]) {
					addressMap[index] = address
				}
			})

			setState(draft => {
				draft.addresses = addresses
				draft.addressMap = addressMap
				draft.selectedIndexes = selectedIndexes
				draft.selectedAmount = Object.keys(selectedIndexes).filter(idx => selectedIndexes?.[idx])?.length
				draft.errorMessage = ''
			})
		} catch (error) {
			setState(draft => {
				draft.errorMessage = (error?.message || error).toString().trim()
			})
		}
		setState(draft => {
			draft.isDerivingAccounts = false
			draft.isLoading = false
		})
	}

	const handleSelectIndex = (index: number) => checked => {
		const selectedIndexes = { ...state.selectedIndexes, [index]: checked === true }

		const addressMap = {}
		state.addresses.forEach((address, idx) => {
			if (state.selectedIndexes[idx]) {
				addressMap[idx] = address
			}
		})

		setState(draft => {
			draft.addressMap = addressMap
			draft.selectedIndexes = selectedIndexes
			draft.selectedAmount = Object.keys(selectedIndexes).filter(idx => selectedIndexes?.[idx])?.length
		})
	}

	const handleContinue = () => {
		if (!isHIDSupported || state.selectedAmount <= 0) {
			return
		}
		setPublicAddresses(state.addressMap)
		setStep(steps.COMPLETE)
	}

	useEventListener('keypress', e => {
		if (e.code === 'Enter') {
			handleContinue()
		}
	})

	return (
		<PageWrapper
			css={{ flex: '1', position: 'relative', display: 'flex', flexDirection: 'column', maxHeight: '600px' }}
		>
			{isHIDSupported ? (
				<Box>
					<PageHeading>Import accounts</PageHeading>
					<Box>
						<PageSubHeading>Connect your ledger to the Z3US wallet.</PageSubHeading>
					</Box>
				</Box>
			) : (
				<Box>
					<PageHeading>Unsupported</PageHeading>
					<PageSubHeading>
						Your browser does not allow connection with USB device. Please update your browser to the latest version or
						use different one.
					</PageSubHeading>
				</Box>
			)}
			<Box css={{ flex: '1' }}>
				<Box css={{ mt: '$8', flex: '1' }} />
				<Box css={{ mt: '$8', flex: '1', width: '100%' }}>
					<MotionBox
						key="address_animate"
						animate={{ opacity: 1, y: 0 }}
						initial={{ opacity: 0, y: 0 }}
						exit={{ opacity: 0, y: 0 }}
						transition={{ duration: 0.2 }}
					>
						{!(state.addresses?.length > 0) ? (
							<Box>
								<AlertCard icon color="warning" css={{ mt: '$4' }}>
									<Text medium size="3" css={{ p: '$2' }}>
										Please ensure your Ledger is connected and the Radix application is open.
									</Text>
								</AlertCard>
								<Button
									fullWidth
									color="primary"
									size="6"
									loading={state.isLoading}
									disabled={!isHIDSupported}
									onClick={handleRefreshDevices}
									css={{ flex: '1', mt: '$6' }}
								>
									<ReloadIcon />
									Connect
								</Button>
								<InputFeedBack showFeedback={!!state.errorMessage} animateHeight={60}>
									<Text color="red" medium>
										{state.errorMessage}
									</Text>
								</InputFeedBack>
								<InputFeedBack showFeedback={state.isDerivingAccounts} animateHeight={60}>
									<Flex align="center">
										<Box css={{ mt: '6px' }}>
											<ExclamationTriangleIcon />
										</Box>
										<Text css={{ pl: '$2' }}>Please confirm on your device.</Text>
									</Flex>
								</InputFeedBack>
							</Box>
						) : (
							<Box
								css={{
									background: '$bgPanel',
									br: '$2',
									border: '1px solid $borderPanel',
									position: 'relative',
									minHeight: '70px',
									pb: '$3',
								}}
							>
								<Box as="ul">
									<SimpleBar
										style={{
											height: '100%',
											position: 'relative',
											maxHeight: '350px',
										}}
									>
										{state.addresses.map((address, index) => {
											const addressString = address.toString()
											return (
												<Flex as="li" align="center" key={addressString} css={{ px: '$3', pt: '$2' }}>
													<Checkbox
														id="select"
														onCheckedChange={handleSelectIndex(index)}
														checked={!!state.selectedIndexes[index]}
													>
														<CheckIcon />
													</Checkbox>
													<Text truncate css={{ maxWidth: '270px', pl: '$3', pr: '$2' }}>
														{getShortAddress(addressString)}
													</Text>
													<ButtonTipFeedback tooltip="Copy address" bgColor="$bgPanel2">
														<Button
															color="ghost"
															onClick={() => copyTextToClipboard(addressString)}
															iconOnly
															size="1"
															aria-label="wallet qr code"
															css={{ mt: '2px' }}
														>
															<CopyIcon />
														</Button>
													</ButtonTipFeedback>
												</Flex>
											)
										})}
									</SimpleBar>
								</Box>
							</Box>
						)}
					</MotionBox>
				</Box>
			</Box>
			<Flex css={{ width: '100%' }}>
				<Button
					fullWidth
					color="primary"
					size="6"
					disabled={!isHIDSupported || state.selectedAmount <= 0 || !(state.addresses?.length > 0)}
					onClick={handleContinue}
					css={{ flex: '1' }}
				>
					{state.selectedAmount > 0 ? (
						<>
							Import {state.selectedAmount} account{state.selectedAmount > 1 ? 's' : ''}
						</>
					) : (
						<>Import</>
					)}
				</Button>
			</Flex>
			<Flex justify="center" align="center" css={{ height: '48px', ta: 'center', mt: '$2', width: '100%' }}>
				<Text medium size="3" color="muted">
					Step 1 of 2
				</Text>
			</Flex>
		</PageWrapper>
	)
}
