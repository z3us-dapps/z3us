import React, { useEffect } from 'react'
import { AccountAddress, SigningKey } from '@radixdlt/application'
import { HDPathRadix } from '@radixdlt/crypto'
import { HardwareWalletLedger } from '@radixdlt/hardware-ledger'
import { useImmer } from 'use-immer'
import { useStore } from '@src/store'
import { CopyIcon } from '@radix-ui/react-icons'
import SimpleBar from 'simplebar-react'
import { copyTextToClipboard } from '@src/utils/copy-to-clipboard'
import ButtonTipFeedback from 'ui/src/components/button-tip-feedback'
import { steps } from '@src/store/hardware-wallet'
import { getShortAddress } from '@src/utils/string-utils'
import InputFeedBack from 'ui/src/components/input/input-feedback'
import { PageWrapper, PageHeading, PageSubHeading } from '@src/components/layout'
import { StyledSlider, StyledTrack, StyledThumb } from 'ui/src/components/slider'
import { Flex, Text, Box } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'

export const ImportAccounts = (): JSX.Element => {
	const { network, setStep, setPublicAddresses, sendAPDU } = useStore(state => ({
		network: state.networks[state.selectedNetworkIndex],
		setStep: state.setHardwareWalletStepAction,
		setPublicAddresses: state.setHWPublicAddressesAction,
		sendAPDU: state.sendAPDUAction,
	}))
	const [state, setState] = useImmer({
		amount: 0,
		addresses: [],
		isLoading: false,
		errorMessage: '',
	})

	useEffect(() => {
		const load = async () => {
			setState(draft => {
				draft.isLoading = true
			})

			try {
				const hardwareWallet = await HardwareWalletLedger.create({ send: sendAPDU }).toPromise()
				const hdPath = HDPathRadix.create({ address: { index: 1, isHardened: true } })
				const hardwareSigningKey = await hardwareWallet.makeSigningKey(hdPath, false).toPromise()

				const signingKey = SigningKey.fromHDPathWithHWSigningKey({ hdPath, hardwareSigningKey })

				const address = AccountAddress.fromPublicKeyAndNetwork({
					publicKey: signingKey.publicKey,
					network: network.id,
				})

				setState(draft => {
					if (draft.addresses.length <= draft.amount) {
						draft.addresses = [...draft.addresses, address.toString()]
					} else if (draft.addresses.length > draft.amount) {
						draft.addresses = draft.addresses.slice(0, draft.amount - draft.addresses.length + 1)
					}
					draft.errorMessage = ''
				})
			} catch (error) {
				setState(draft => {
					draft.errorMessage = (error?.message || error).toString().trim()
				})
			}

			setState(draft => {
				draft.isLoading = false
			})
		}

		load()
	}, [])

	const handleContinue = () => {
		setPublicAddresses(state.addresses)
		setStep(steps.COMPLETE)
	}

	const handleSliderChange = ([track]: Array<number>) => {
		setState(draft => {
			draft.amount = track
		})
	}

	return (
		<PageWrapper css={{ flex: '1', position: 'relative', display: 'flex', flexDirection: 'column' }}>
			<Box>
				<PageHeading>Import accounts</PageHeading>
				<PageSubHeading>Select amount of accounts to import.</PageSubHeading>
			</Box>
			<Box css={{ mt: '$8', flex: '1' }}>
				<Box css={{ pb: '$6', px: '$1' }}>
					<StyledSlider
						defaultValue={[state.amount]}
						min={0}
						max={20}
						step={1}
						onValueChange={handleSliderChange}
						aria-label="Volume"
						css={{ width: '100%' }}
					>
						<StyledTrack>
							<StyledTrack />
						</StyledTrack>
						<StyledThumb />
					</StyledSlider>
				</Box>
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
							{state.addresses.map(address => {
								const addressString = address.toString()
								return (
									<Flex as="li" align="center" key={addressString} css={{ px: '$3', pt: '$2' }}>
										<Text truncate css={{ maxWidth: '270px', pr: '$2' }}>
											{getShortAddress(addressString)}
										</Text>
										<ButtonTipFeedback feedback="Address copied">
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
				<InputFeedBack showFeedback={state.errorMessage !== ''} animateHeight={31}>
					<Text color="red" medium>
						{state.errorMessage}
					</Text>
				</InputFeedBack>
			</Box>
			<Flex css={{ width: '100%' }}>
				<Button fullWidth color="primary" size="6" onClick={handleContinue} css={{ flex: '1' }}>
					{`Import ${state.amount + 1} accounts`}
				</Button>
			</Flex>
			<Flex justify="center" align="center" css={{ height: '48px', ta: 'center', mt: '$2', width: '100%' }}>
				<Text medium size="3" color="muted">
					Step 2 of 3
				</Text>
			</Flex>
		</PageWrapper>
	)
}
