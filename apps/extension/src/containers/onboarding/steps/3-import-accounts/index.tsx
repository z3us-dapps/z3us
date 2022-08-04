import React, { useEffect } from 'react'
import { HDMasterSeed, HDPathRadix, PrivateKey, AccountAddress } from '@radixdlt/application'
import { useEventListener } from 'usehooks-ts'
import { useImmer } from 'use-immer'
import { useSharedStore, useStore } from '@src/store'
import { CopyIcon } from '@radix-ui/react-icons'
import { ScrollArea } from 'ui/src/components/scroll-area'
import { copyTextToClipboard } from '@src/utils/copy-to-clipboard'
import { Checkbox, CheckIcon } from 'ui/src/components/checkbox'
import ButtonTipFeedback from 'ui/src/components/button-tip-feedback'
import { onBoardingSteps } from '@src/store/onboarding'
import InputFeedBack from 'ui/src/components/input/input-feedback'
import { PageWrapper, PageHeading, PageSubHeading } from '@src/components/layout'
import { StyledSlider, StyledTrack, StyledThumb, StyledRange } from 'ui/src/components/slider'
import { Flex, Text, Box } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'

interface ImmerT {
	amount: number
	addresses: Array<string>
	selectedIndexes: object
	showError: boolean
	errorMessage: string
}

export const ImportAccounts = (): JSX.Element => {
	const { mnemonic, setOnboardingStep } = useSharedStore(state => ({
		mnemonic: state.mnemonic,
		setOnboardingStep: state.setOnboardingStepAction,
	}))
	const { network, setPublicAddresses } = useStore(state => ({
		network: state.networks[state.selectedNetworkIndex],
		setPublicAddresses: state.setPublicAddressesAction,
	}))
	const [state, setState] = useImmer<ImmerT>({
		amount: 0,
		addresses: [],
		selectedIndexes: {},
		showError: false,
		errorMessage: '',
	})

	const selectedAmount = Object.values(state.selectedIndexes).filter(v => v).length

	useEffect(() => {
		if (!mnemonic) {
			return
		}

		const load = async () => {
			try {
				setState(draft => {
					if (draft.addresses.length <= draft.amount) {
						const seed = HDMasterSeed.fromMnemonic({ mnemonic })
						const key = seed
							.masterNode()
							.derive(HDPathRadix.create({ address: { index: draft.amount, isHardened: true } }))

						const pk = PrivateKey.fromHex(key.privateKey.toString())
						if (pk.isErr()) {
							throw pk.error
						}

						const address = AccountAddress.fromPublicKeyAndNetwork({
							publicKey: key.publicKey,
							network: network.id,
						})
						draft.addresses = [...draft.addresses, address.toString()]
					} else if (draft.addresses.length > draft.amount) {
						draft.addresses = draft.addresses.slice(0, draft.amount - draft.addresses.length + 1)
					}
				})
			} catch (error) {
				setState(draft => {
					draft.showError = true
					draft.errorMessage = (error?.message || error).toString().trim()
				})
			}
		}

		load()
	}, [mnemonic, state.amount])

	const handleSliderChange = ([track]: Array<number>) => {
		setState(draft => {
			draft.amount = track
		})
	}

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
		setOnboardingStep(onBoardingSteps.CREATE_PASSWORD)
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
				<PageSubHeading>
					Drag the &apos;slider&apos; to select the number of accounts that you would like to import.
				</PageSubHeading>
			</Box>
			<Box css={{ mt: '$4', flex: '1' }}>
				<Box
					css={{
						background: '$bgPanel',
						br: '$2',
						border: '1px solid $borderPanel',
						position: 'relative',
						height: '278px',
					}}
				>
					<ScrollArea>
						<Box css={{ pt: '$4', pb: '$2', px: '$3' }}>
							<StyledSlider
								defaultValue={[state.amount]}
								min={0}
								max={9}
								step={1}
								onValueChange={handleSliderChange}
								aria-label="Account number"
								css={{ width: '100%' }}
							>
								<StyledTrack>
									<StyledRange />
								</StyledTrack>
								<StyledThumb />
							</StyledSlider>
						</Box>
						<Box as="ul" css={{ pb: '$3' }}>
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
										<Text as="label" htmlFor="select" truncate css={{ maxWidth: '228px', pl: '$2', pr: '$2' }}>
											{addressString}
										</Text>
										<ButtonTipFeedback tooltip="Copy address" sideOffset={5} toolTipOffset={8}>
											<Button
												color="ghost"
												onClick={() => copyTextToClipboard(addressString)}
												iconOnly
												size="1"
												aria-label="wallet address"
												css={{ mt: '2px', flexShrink: '0' }}
											>
												<CopyIcon />
											</Button>
										</ButtonTipFeedback>
									</Flex>
								)
							})}
						</Box>
					</ScrollArea>
				</Box>
				<InputFeedBack showFeedback={state.showError} animateHeight={31}>
					<Text color="red" medium>
						{state.errorMessage}
					</Text>
				</InputFeedBack>
			</Box>
			<Flex css={{ width: '100%' }}>
				<Button
					fullWidth
					color="primary"
					size="6"
					disabled={selectedAmount <= 0}
					onClick={handleContinue}
					css={{ flex: '1' }}
				>
					{`Import ${selectedAmount} accounts`}
				</Button>
			</Flex>
			<Flex justify="center" align="center" css={{ height: '48px', ta: 'center', mt: '$2', width: '100%' }}>
				<Text medium size="3" color="muted">
					Step 2 of 4
				</Text>
			</Flex>
		</PageWrapper>
	)
}
