import { QRCodeSVG } from 'qrcode.react'
import React, { useRef } from 'react'
import { useImmer } from 'use-immer'

import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from 'ui/src/components/alert-dialog'
import { Box, Flex, Text } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import Input from 'ui/src/components/input'
import InputFeedBack from 'ui/src/components/input/input-feedback'
import { ScrollArea } from 'ui/src/components/scroll-area'

import { HardwareWalletReconnect } from '@src/components/hardware-wallet-reconnect'
import { SLIDE_PANEL_EXPAND_HEIGHT, SLIDE_PANEL_HEADER_HEIGHT, SLIDE_PANEL_HEIGHT } from '@src/config'
import { useColorMode } from '@src/hooks/use-color-mode'
import { useMessanger } from '@src/hooks/use-messanger'
import { useNoneSharedStore, useSharedStore } from '@src/hooks/use-store'
import { parseAccountAddress } from '@src/services/radix/serializer'
import { AddressBookEntry } from '@src/store/types'
import { KeystoreType } from '@src/types'

import { AccountSwitcher } from '../account-switcher'
import { SlideUpPanel } from '../slide-up-panel'

/* eslint-disable no-control-regex */
const emojiRegex = /\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu
const unicodeRegex = /[^\u0000-\u007F]/gu

// eslint-disable-next-line @typescript-eslint/naming-convention
const END__OF_HEADER = ']'
const INTRA_SEPARATOR = '^'
const INTER_SEPARATOR = '~'
const END_OF_ACCOUNT_NAME = '}'

const FORBIDDEN_CHARACTERS = [END__OF_HEADER, INTRA_SEPARATOR, INTER_SEPARATOR, END_OF_ACCOUNT_NAME]
const ACCOUNT_NAME_REPLACEMENT = '_'

export const sanitizeName = (name: string = ''): string => {
	const nameWithoutUnicode = name
		.replace(emojiRegex, ACCOUNT_NAME_REPLACEMENT)
		.replace(unicodeRegex, ACCOUNT_NAME_REPLACEMENT)
	const limitedName = [...nameWithoutUnicode].slice(0, 30).join('')
	const replacedName = FORBIDDEN_CHARACTERS.reduce(
		(acc, forbidden) => acc.replace(forbidden, ACCOUNT_NAME_REPLACEMENT),
		limitedName,
	)
	return `${replacedName}${END_OF_ACCOUNT_NAME}`
}

const compressPublicKeyToHex = (publicKey: string): string => Buffer.from(publicKey, 'hex').toString('base64')

type AccountType = 'H' | 'S'

export const accountToExportPayload = (
	accountType: AccountType,
	publicKey: string,
	addressIndex: number,
	name: string,
): string => [accountType, publicKey, addressIndex, sanitizeName(name)].join(INTRA_SEPARATOR)

const accountSummary = (account: AddressBookEntry, addressIndex: number, isLocal: boolean): string => {
	const localType = isLocal ? 'S' : 'H'
	const compressedKey = compressPublicKeyToHex(parseAccountAddress(account.address).publicKey.toString())
	return accountToExportPayload(localType, compressedKey, addressIndex, account.name)
}

export const exportAsCode = (accounts: string[], payloadSize: number, mnemonicLength: number): string[] => {
	const allAccounts = accounts.join(INTER_SEPARATOR)
	const payloadsWithoutHeaders = allAccounts.match(new RegExp(`.{1,${payloadSize}}`, 'g')) || []
	const payloadTotal = payloadsWithoutHeaders.length
	return payloadsWithoutHeaders.map(
		(payload, index) =>
			`${payloadTotal}${INTRA_SEPARATOR}${index}${INTRA_SEPARATOR}${mnemonicLength}${END__OF_HEADER}${payload}`,
	)
}

interface ImmerT {
	words: string[]
	exports: string[]
	password: string
	errorMessage: string
	isQrModalOpen: boolean
	isExportingAccounts: boolean
}

const AccountExport: React.FC = () => {
	const inputRef = useRef<HTMLInputElement>()
	const isDarkMode = useColorMode()
	const { getWalletAction: getWallet } = useMessanger()
	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectKeystoreId),
	}))
	const { publicAddresses } = useNoneSharedStore(state => ({
		publicAddresses: state.publicAddresses,
	}))

	const [state, setState] = useImmer<ImmerT>({
		words: [],
		exports: [],
		password: '',
		errorMessage: '',
		isQrModalOpen: false,
		isExportingAccounts: false,
	})

	const handleExport = async () => {
		setState(draft => {
			draft.isExportingAccounts = true
		})
		try {
			const { mnemonic } = await getWallet(state.password)
			const summaries = []
			Object.keys(publicAddresses).forEach(idx =>
				summaries.push(accountSummary(publicAddresses[idx], +idx, keystore.type === KeystoreType.LOCAL)),
			)
			const exports = exportAsCode(summaries, 1800, mnemonic?.words.length)
			setState(draft => {
				draft.words = mnemonic?.words || []
				draft.exports = exports
				draft.isQrModalOpen = true
			})
		} catch (error) {
			setState(draft => {
				draft.errorMessage = 'Invalid password'
			})
		} finally {
			inputRef.current.value = ''

			setState(draft => {
				draft.password = ''
				draft.isExportingAccounts = false
			})
		}
	}

	const handleCloseQrModal = async () => {
		setState(draft => {
			draft.words = []
			draft.exports = []
			draft.isQrModalOpen = false
		})
	}

	return (
		<Box>
			<HardwareWalletReconnect />
			<Text css={{ pb: '$3' }}>Enter your password to reveal export QR code for this account.</Text>
			<Input
				ref={inputRef}
				type="password"
				placeholder="Password"
				error={state.errorMessage !== ''}
				onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
					setState(draft => {
						draft.password = e.target.value
						draft.errorMessage = ''
					})
				}}
			/>
			<InputFeedBack
				showFeedback={!!state.errorMessage}
				animateHeight={25}
				css={{ display: 'flex', alignItems: 'flex-end', overflow: 'clip' }}
			>
				<Text color="red" medium>
					{state.errorMessage}
				</Text>
			</InputFeedBack>
			<AlertDialog open={state.isQrModalOpen}>
				<AlertDialogTrigger asChild>
					<Button
						onClick={handleExport}
						disabled={state.isExportingAccounts && state.errorMessage === ''}
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
					<Box css={{ position: 'relative', height: '497px' }}>
						<ScrollArea>
							<Flex direction="column" css={{ p: '$2', position: 'relative' }}>
								<Box css={{ flex: '1' }}>
									<Flex css={{ pb: '$3' }}>
										<Text medium size="3" css={{ position: 'relative' }}>
											To import your accounts, use the &#34;Import from a Legacy Wallet&#34; feature of the new Radix
											Wallet mobile app to scan below QR codes and then type in your seed phrase.
										</Text>
									</Flex>
									<Flex direction="column" align="center" css={{ bg: '$bgPanel2', width: '100%', p: '$2', br: '$2' }}>
										{state.exports.map(data => (
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
															value={data}
															size={180}
															fgColor={isDarkMode ? '#a6a6a6' : '#161718'}
															bgColor={isDarkMode ? '#161718' : '#ffffff'}
														/>
													</Flex>
												</Flex>
											</Box>
										))}
										{state.words.length > 0 && (
											<Box
												css={{
													background: '$bgPanel',
													p: '$4',
													pb: '100px',
													br: '$2',
													border: '1px solid $borderPanel',
													position: 'relative',
												}}
											>
												<Flex css={{ overflow: 'hidden', flexWrap: 'wrap' }}>
													{state.words.map(word => (
														<Box key={word} css={{ mr: '$2', mb: '$1' }}>
															<Text size="4">{word}</Text>
														</Box>
													))}
												</Flex>
											</Box>
										)}
									</Flex>
								</Box>
								<Box css={{ mt: '$2' }}>
									<Button
										data-test-e2e="accounts-send-transaction-close"
										size="6"
										color="primary"
										aria-label="close"
										css={{ px: '0', flex: '1' }}
										onClick={handleCloseQrModal}
										fullWidth
									>
										Close
									</Button>
								</Box>
							</Flex>
						</ScrollArea>
					</Box>
				</AlertDialogContent>
			</AlertDialog>
		</Box>
	)
}

export const ExportAccount: React.FC = () => {
	const { addresses, activeSlideIndex, expanded } = useNoneSharedStore(state => ({
		addresses: Object.values(state.publicAddresses).map(({ address }) => address),
		activeSlideIndex: state.activeSlideIndex,
		expanded: state.accountPanelExpanded,
	}))

	const isSlideUpPanelVisible = activeSlideIndex < addresses.length

	const calculateHeight = expanded
		? SLIDE_PANEL_EXPAND_HEIGHT - SLIDE_PANEL_HEADER_HEIGHT
		: SLIDE_PANEL_HEIGHT - SLIDE_PANEL_HEADER_HEIGHT

	return (
		<>
			<AccountSwitcher />
			<Box
				css={{
					pe: isSlideUpPanelVisible ? 'auto' : 'none',
					opacity: isSlideUpPanelVisible ? '1' : '0',
					transition: !isSlideUpPanelVisible ? '$default' : 'unset',
				}}
			>
				<SlideUpPanel headerComponent={<Box />}>
					<Box css={{ position: 'relative', height: `${calculateHeight}px` }}>
						<AccountExport />
					</Box>
				</SlideUpPanel>
			</Box>
		</>
	)
}

export default ExportAccount
