import React, { useEffect } from 'react'
import { useEventListener } from 'usehooks-ts'
import { AccountAddress, SigningKey } from '@radixdlt/application'
import { HDPathRadix } from '@radixdlt/crypto'
import { useImmer } from 'use-immer'
import { useStore } from '@src/store'
import { CopyIcon } from '@radix-ui/react-icons'
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

export const ImportAccounts = (): JSX.Element => {
	const { hardwareWallet, hwPublicAddresses, network, setStep, setPublicAddresses } = useStore(state => ({
		hardwareWallet: state.hardwareWallet,
		hwPublicAddresses: state.hwPublicAddresses,
		network: state.networks[state.selectedNetworkIndex],
		setStep: state.setHardwareWalletStepAction,
		setPublicAddresses: state.setHWPublicAddressesAction,
	}))
	const [state, setState] = useImmer({
		addresses: [],
		selectedIndexes: Object.fromEntries(Object.entries(hwPublicAddresses).map(([k]) => [k, true])),
		isLoading: false,
		errorMessage: '',
		hardwareWallet: null,
	})

	const selectedAmount = Object.values(state.selectedIndexes).filter(v => v).length

	useEffect(() => {
		const load = async () => {
			setState(draft => {
				draft.isLoading = true
			})

			try {
				const addresses = []
				for (let i = 0; i < 4; i += 1) {
					const hdPath = HDPathRadix.create({ address: { index: i, isHardened: true } })
					// eslint-disable-next-line no-await-in-loop
					const hardwareSigningKey = await hardwareWallet.makeSigningKey(hdPath, i === 0).toPromise()
					const signingKey = SigningKey.fromHDPathWithHWSigningKey({ hdPath, hardwareSigningKey })
					const address = AccountAddress.fromPublicKeyAndNetwork({
						publicKey: signingKey.publicKey,
						network: network.id,
					})

					addresses.push(address.toString())
				}

				setState(draft => {
					draft.addresses = addresses
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

	const handleSelectIndex = (index: number) => checked => {
		setState(draft => {
			draft.selectedIndexes = { ...draft.selectedIndexes, [index]: checked === true }
		})
	}

	const handleContinue = () => {
		const addressMap = {}
		state.addresses.forEach((address, index) => {
			if (state.selectedIndexes[index]) {
				addressMap[index] = address
			}
		})
		if (Object.keys(addressMap).length <= 0) {
			return
		}
		setPublicAddresses(addressMap)
		setStep(steps.COMPLETE)
	}

	useEventListener('keypress', e => {
		if (e.code === 'Enter') {
			handleContinue()
		}
	})

	return (
		<PageWrapper css={{ flex: '1', position: 'relative', display: 'flex', flexDirection: 'column' }}>
			<Box>
				<PageHeading>Import accounts</PageHeading>
				<PageSubHeading>Select amount of accounts to import.</PageSubHeading>
			</Box>
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
				<InputFeedBack showFeedback={state.errorMessage !== '' || state.isLoading} animateHeight={31}>
					<Text color={state.errorMessage ? 'red' : 'help'} medium>
						{state.errorMessage || 'Confirm on your device'}
					</Text>
				</InputFeedBack>
			</Box>
			<Flex css={{ width: '100%' }}>
				<Button
					fullWidth
					color="primary"
					size="6"
					disabled={!(selectedAmount > 0 && state.addresses.length > 0)}
					onClick={handleContinue}
					css={{ flex: '1' }}
				>
					{`Import ${selectedAmount} accounts`}
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
