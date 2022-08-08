import React, { useEffect } from 'react'
import { firstValueFrom } from 'rxjs'
import TransportWebHID from '@ledgerhq/hw-transport-webhid'
import AlertCard from 'ui/src/components/alert-card'
import { HardwareWalletLedger } from '@radixdlt/hardware-ledger'
import { useEventListener } from 'usehooks-ts'
import { AccountAddress, SigningKey } from '@radixdlt/application'
import { HDPathRadix } from '@radixdlt/crypto'
import { useImmer } from 'use-immer'
import { useSharedStore, useStore } from '@src/store'
import { CopyIcon, ReloadIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { ScrollArea } from 'ui/src/components/scroll-area'
import { copyTextToClipboard } from '@src/utils/copy-to-clipboard'
import { Checkbox, CheckIcon } from 'ui/src/components/checkbox'
import ButtonTipFeedback from 'ui/src/components/button-tip-feedback'
import { connectHardwareWalletSteps } from '@src/store/onboarding'
import { getShortAddress } from '@src/utils/string-utils'
import InputFeedBack from 'ui/src/components/input/input-feedback'
import { PageWrapper, PageHeading, PageSubHeading } from '@src/components/layout'
import { Flex, Text, Box, MotionBox } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import { generateId } from '@src/utils/generate-id'
import { KeystoreType } from '@src/store/types'
import { useAPDU } from '@src/hooks/use-apdu'

const isHIDSupported = !!window?.navigator?.hid

interface ImmerT {
	addresses: Array<string>
	addressMap: { [key: number]: string }
	selectedIndexes: object
	isLoading: boolean
	isDerivingAccounts: boolean
	errorMessage: string
}

export const ImportAccounts = (): JSX.Element => {
	const sendAPDU = useAPDU()
	const { keystore, setStep, lock, addKeystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectKeystoreId),
		setStep: state.setConnectHardwareWalletStepAction,
		lock: state.lockAction,
		addKeystore: state.addKeystoreAction,
	}))
	const { publicAddresses, network, setPublicAddresses } = useStore(state => ({
		publicAddresses: state.publicAddresses,
		network: state.networks[state.selectedNetworkIndex],
		setPublicAddresses: state.setPublicAddressesAction,
	}))

	const [state, setState] = useImmer<ImmerT>({
		addresses: [],
		addressMap: {},
		selectedIndexes: {},
		isLoading: false,
		isDerivingAccounts: false,
		errorMessage: '',
	})

	const createKeystore = async () => {
		if (!isHIDSupported) {
			return
		}

		if (keystore && keystore.type === KeystoreType.HARDWARE && Object.keys(publicAddresses).length === 0) {
			return
		}

		const id = generateId()
		addKeystore(id, id, KeystoreType.HARDWARE, false)
		await lock() // clear background memory
	}

	useEffect(() => {
		createKeystore()
	}, [])

	const selectedAmount = Object.keys(state.selectedIndexes).filter(idx => state.selectedIndexes?.[idx])?.length

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
			const hw = await firstValueFrom(HardwareWalletLedger.create({ send: sendAPDU }))
			for (let i = 0; i < 4; i += 1) {
				const hdPath = HDPathRadix.create({ address: { index: i, isHardened: true } })
				// eslint-disable-next-line no-await-in-loop
				const hardwareSigningKey = await firstValueFrom(hw.makeSigningKey(hdPath, i === 0))
				const signingKey = SigningKey.fromHDPathWithHWSigningKey({ hdPath, hardwareSigningKey })
				const address = AccountAddress.fromPublicKeyAndNetwork({
					publicKey: signingKey.publicKey,
					network: network.id,
				})

				addresses.push(address.toString())
			}

			const selectedIndexes = Object.fromEntries(Object.entries(publicAddresses).map(([k]) => [k, true]))
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
			if (selectedIndexes[idx]) {
				addressMap[idx] = address
			}
		})

		setState(draft => {
			draft.addressMap = addressMap
			draft.selectedIndexes = selectedIndexes
		})
	}

	const handleContinue = () => {
		if (!isHIDSupported || selectedAmount <= 0) {
			return
		}
		setPublicAddresses(state.addressMap)
		setStep(connectHardwareWalletSteps.COMPLETE)
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
									pb: '$3',
								}}
							>
								<Box
									as="ul"
									css={{
										height: '100%',
										position: 'relative',
										minHeight: '200px',
									}}
								>
									<ScrollArea>
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
									</ScrollArea>
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
					disabled={!isHIDSupported || selectedAmount <= 0 || !(state.addresses?.length > 0)}
					onClick={handleContinue}
					css={{ flex: '1' }}
				>
					{selectedAmount > 0 ? `Import ${selectedAmount} account${selectedAmount > 1 ? 's' : ''}` : 'Import'}
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
