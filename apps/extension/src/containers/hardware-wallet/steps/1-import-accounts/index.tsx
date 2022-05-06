import React from 'react'
import TransportWebHID from '@ledgerhq/hw-transport-webhid'
import { HardwareWalletLedger } from '@radixdlt/hardware-ledger'
import { useEventListener } from 'usehooks-ts'
import { AccountAddress, SigningKey } from '@radixdlt/application'
import { HDPathRadix } from '@radixdlt/crypto'
import { useImmer } from 'use-immer'
import { useStore } from '@src/store'
import { CopyIcon, ReloadIcon } from '@radix-ui/react-icons'
import SimpleBar from 'simplebar-react'
import { copyTextToClipboard } from '@src/utils/copy-to-clipboard'
import { Checkbox, CheckIcon } from 'ui/src/components/checkbox'
import ButtonTipFeedback from 'ui/src/components/button-tip-feedback'
import { steps } from '@src/store/hardware-wallet'
import { getShortAddress } from '@src/utils/string-utils'
import InputFeedBack from 'ui/src/components/input/input-feedback'
import { PageWrapper, PageHeading, PageSubHeading } from '@src/components/layout'
import { Flex, Text, Box } from 'ui/src/components/atoms'
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
		selectedIndexes: Object.fromEntries(Object.entries(hwPublicAddresses).map(([k]) => [k, true])),
		isLoading: false,
		isDerivingAccounts: false,
		errorMessage: '',
	})

	const selectedAmount = Object.keys(state.addressMap).length

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

			const addressMap = {}
			addresses.forEach((address, index) => {
				if (state.selectedIndexes[index]) {
					addressMap[index] = address
				}
			})

			setState(draft => {
				draft.addresses = addresses
				draft.addressMap = addressMap
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
			draft.selectedIndexes = selectedIndexes
			draft.addressMap = addressMap
		})
	}

	const handleContinue = () => {
		if (!isHIDSupported || selectedAmount <= 0) {
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
		<PageWrapper css={{ flex: '1', position: 'relative', display: 'flex', flexDirection: 'column' }}>
			{isHIDSupported ? (
				<Box>
					<PageHeading>Import accounts</PageHeading>
					<PageSubHeading>Please ensure your Ledger is connected and the Radix application is open.</PageSubHeading>
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
			<Box css={{ mt: '$8', flex: '1' }}>
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
											css={{ pr: '$2' }}
										>
											<CheckIcon />
										</Checkbox>
										<Text truncate css={{ maxWidth: '270px', pr: '$2' }}>
											{getShortAddress(addressString)}
										</Text>
										<ButtonTipFeedback tooltip="Copy address">
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
			</Box>
			<Box css={{ mt: '$8', flex: '1', width: '100%' }}>
				<Button
					fullWidth
					color="primary"
					size="6"
					loading={state.isLoading}
					disabled={!isHIDSupported}
					onClick={handleRefreshDevices}
					css={{ flex: '1' }}
				>
					<ReloadIcon />
					Connect
				</Button>
				<InputFeedBack showFeedback={!!state.errorMessage} animateHeight={31}>
					<Text color="red" medium>
						{state.errorMessage}
					</Text>
				</InputFeedBack>
				<InputFeedBack showFeedback={state.isDerivingAccounts} animateHeight={31}>
					<Text color="help" medium>
						Confirm on your device
					</Text>
				</InputFeedBack>
			</Box>
			<Flex css={{ width: '100%' }}>
				<Button
					fullWidth
					color="primary"
					size="6"
					disabled={!isHIDSupported || selectedAmount <= 0}
					onClick={handleContinue}
					css={{ flex: '1' }}
				>
					{`Import ${selectedAmount} accounts`}
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
