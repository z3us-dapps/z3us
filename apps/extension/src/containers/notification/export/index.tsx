import { CheckIcon } from '@heroicons/react/24/outline'
import { CopyIcon } from '@radix-ui/react-icons'
import { QRCodeSVG } from 'qrcode.react'
import React from 'react'
import { useImmer } from 'use-immer'

import AlertCard from 'ui/src/components/alert-card'
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from 'ui/src/components/alert-dialog'
import { Box, Flex, StyledLink, Text } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import ButtonTipFeedback from 'ui/src/components/button-tip-feedback'
import { Checkbox } from 'ui/src/components/checkbox'
import { ScrollArea } from 'ui/src/components/scroll-area'

import { PageHeading, PageWrapper } from '@src/components/layout'
import { useColorMode } from '@src/hooks/use-color-mode'
import { copyTextToClipboard } from '@src/utils/copy-to-clipboard'
import { getShortAddress } from '@src/utils/string-utils'

interface ImmerT {
	addresses: Array<string>
	isExportingAccounts: boolean
	selectedIndexes: object
	isQrModalOpen: boolean
}

export const Export = (): JSX.Element => {
	const isDarkMode = useColorMode()
	const [state, setState] = useImmer<ImmerT>({
		addresses: [],
		isExportingAccounts: false,
		selectedIndexes: {},
		isQrModalOpen: false,
	})

	const handleCancel = () => {
		window.location.hash = `#/wallet/account`
	}

	const handleExportAccounts = async () => {
		setState(draft => {
			draft.isExportingAccounts = true
		})

		setTimeout(() => {
			setState(draft => {
				draft.isQrModalOpen = true
			})
		}, 1000)
	}

	const handleCloseQrModal = async () => {
		setState(draft => {
			draft.isQrModalOpen = false
		})
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const handleSelectIndex = (index: number) => checked => {
		// const selectedIndexes = { ...state.selectedIndexes, [index]: checked === true }
		// const addressMap = {}
		// state.addresses.forEach((address, idx) => {
		// 	if (selectedIndexes[idx]) {
		// 		addressMap[idx] = address
		// 	}
		// })
		// setState(draft => {
		// 	draft.addressMap = addressMap
		// 	draft.selectedIndexes = selectedIndexes
		// })
	}

	return (
		<Box css={{ display: 'flex', flexDirection: 'column', height: '100%', bg: '$bgPanel3' }}>
			<PageWrapper css={{ flex: '1' }}>
				<Box css={{ pt: '10px' }}>
					<PageHeading>Export accounts</PageHeading>
					<Text css={{ fontSize: '16px', lineHeight: '20px', fontWeight: '400', mt: '8px' }}>
						To migrate your Radix mainnet accounts, first{' '}
						<StyledLink
							underline
							href="https://wallet.radixdlt.com/"
							target="_blank"
							className="font-medium"
							rel="noreferrer"
						>
							download and setup the new Radix Wallet for Babylon
						</StyledLink>
						.
					</Text>
					<Text css={{ mt: '12px' }}>
						If you are using a Ledger hardware wallet device, you will also need to download and link the Radix
						Connector browser extension. Then begin the export process by clicking "Export All" or "Export Selected"
						here.
					</Text>
				</Box>
				{/* <Box css={{ py: '$5' }}>
					<Flex
						align="center"
						css={{
							bg: '$bgPanel4',
							mt: '25px',
							br: '$3',
							pr: '12px',
							pl: '17px',
							py: '12px',
						}}
					>
						<Box css={{ flexShrink: '0', width: '31px' }}>
							<ExclamationCircleIcon />
						</Box>
						<Box css={{ ml: '$2' }}>
							<Text size="2">
								Since{' '}
								<StyledLink underline href="/" target="_blank">
									link
								</StyledLink>{' '}
							</Text>
						</Box>
					</Flex>
				</Box> */}
				<Box css={{ mt: '$5' }}>
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
								position: 'relative',
								height: '200px',
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
													aria-label="copy"
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
				</Box>
			</PageWrapper>
			<PageWrapper css={{ display: 'flex', gridGap: '12px', borderTop: '1px solid $borderPanel2' }}>
				<Button
					onClick={handleCancel}
					size="6"
					color="tertiary"
					aria-label="cancel connect wallet"
					css={{ px: '0', flex: '1' }}
				>
					Cancel
				</Button>
				<AlertDialog open={state.isQrModalOpen}>
					<AlertDialogTrigger asChild>
						<Button
							onClick={handleExportAccounts}
							disabled={state.isExportingAccounts}
							loading={state.isExportingAccounts}
							size="6"
							color="primary"
							aria-label="confirm connect wallet"
							css={{ px: '0', flex: '1' }}
						>
							Export
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<Flex direction="column" css={{ p: '$2', position: 'relative' }}>
							<Box css={{ flex: '1' }}>
								<Flex css={{ pb: '$3' }}>
									<Text medium size="3" css={{ position: 'relative' }}>
										To import your accounts, use the "Import from a Legacy Wallet" feature of the new Radix Wallet
										mobile app to scan this QR code.
									</Text>
								</Flex>
								<Flex direction="column" align="center" css={{ bg: '$bgPanel2', width: '100%', p: '$2', br: '$2' }}>
									<Box css={{ pb: '$4', ta: 'center' }}>
										<Flex justify="center" css={{ mt: '24px' }}>
											<Flex
												align="center"
												justify="center"
												css={{
													border: '1px solid',
													borderColor: '$borderPanel2',
													width: '200px',
													height: '200px',
													br: '$2',
												}}
											>
												<QRCodeSVG
													// value={accountAddress}
													value="hello"
													size={180}
													fgColor={isDarkMode ? '#a6a6a6' : '#161718'}
													bgColor={isDarkMode ? '#161718' : '#ffffff'}
												/>
											</Flex>
										</Flex>
									</Box>
								</Flex>
								<Box css={{ py: '$5' }}>
									<AlertCard icon color="success" css={{ py: '$2' }}>
										<Box css={{ p: '$2' }}>
											<Text size="3" css={{ display: 'inline', lineHeight: '16px' }}>
												success
												{/* <StyledLink
												underline
												href="https://z3us.com/docs"
												css={{ display: 'inline', px: '$1' }}
												target="_blank"
											>
												here
											</StyledLink> */}
											</Text>
										</Box>
									</AlertCard>
								</Box>
							</Box>
							<Box css={{ mt: '$2' }}>
								<Button
									data-test-e2e="accounts-send-transaction-close"
									size="6"
									color="primary"
									aria-label="close"
									css={{ px: '0', flex: '1' }}
									onClick={handleCloseQrModal}
									// disabled={state.isSendingTransaction}
									fullWidth
								>
									Close
								</Button>
							</Box>
						</Flex>
					</AlertDialogContent>
				</AlertDialog>
			</PageWrapper>
		</Box>
	)
}

export default Export
