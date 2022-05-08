import React, { useEffect, useRef } from 'react'
import { TransferTokens } from '@src/services/radix/transactions'
import { AnimatePresence } from 'framer-motion'
import { useStore } from '@src/store'
import { useImmer } from 'use-immer'
import { useTokenBalances, useTokenInfo } from '@src/services/react-query/queries/radix'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipArrow } from 'ui/src/components/tool-tip'
import Button from 'ui/src/components/button'
import { Checkbox, CheckIcon } from 'ui/src/components/checkbox'
import { AccountSelector } from '@src/components/account-selector'
import Input from 'ui/src/components/input'
import BigNumber from 'bignumber.js'
import { getSplitParams } from '@src/utils/url-utils'
import { getShortAddress } from '@src/utils/string-utils'
import { useRoute } from 'wouter'
import { Box, Text, Flex, MotionBox } from 'ui/src/components/atoms'
import { formatBigNumber } from '@src/utils/formatters'
import { TokenSelector } from '@src/components/token-selector'
import { HardwareWalletReconnect } from '@src/components/hardware-wallet-reconnect'
import { AddressBookSelector } from '@src/components/address-book-selector'
import { SendReceiveHeader } from '../send-receive-header'
import { SendTokenReview } from './send-token-review'

export const SendToken: React.FC = () => {
	const inputAmountRef = useRef(null)
	const inputToAddressRef = useRef(null)

	const [isSendTokenRoute, params] = useRoute('/account/send/:rri')
	const { addToast, account, accountAddress, selectAccount, network } = useStore(state => ({
		addToast: state.addToastAction,
		selectAccount: state.selectAccountAction,
		account: state.account,
		accountAddress: state.getCurrentAddressAction(),
		network: state.networks[state.selectedNetworkIndex],
	}))

	const [state, setState] = useImmer({
		rri: getSplitParams(params),
		amount: '',
		to: '',
		message: '',
		encrypt: false,
		fee: null,
		transaction: null,
		isLoading: false,
	})

	const { data: balances } = useTokenBalances()
	const { data: token } = useTokenInfo(state.rri)
	const shortAddress = getShortAddress(accountAddress)
	const liquidBalances = balances?.account_balances?.liquid_balances || []
	const selectedToken = liquidBalances?.find(balance => balance.rri === state.rri)
	const selectedTokenAmmount = selectedToken ? new BigNumber(selectedToken.amount).shiftedBy(-18) : new BigNumber(0)
	const tokenSymbol = token?.symbol.toUpperCase()

	useEffect(() => {
		if (state.rri) {
			return
		}
		if (!balances) {
			return
		}
		if (liquidBalances) {
			setState(draft => {
				draft.rri = liquidBalances?.[0]?.rri
			})
		}
	}, [balances, state.rri])

	const handleSetTo = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState(draft => {
			draft.to = event.currentTarget.value
		})
	}

	const handleSetAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState(draft => {
			draft.amount = event.currentTarget.value
		})
	}

	const handleSetMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState(draft => {
			draft.message = event.currentTarget.value
		})
	}

	const handleSetEncrypt = checked => {
		setState(draft => {
			draft.encrypt = checked === true
		})
	}

	const handlePrepareTx = async () => {
		if (!account) return
		setState(draft => {
			draft.isLoading = true
		})
		try {
			const { transaction, fee } = await TransferTokens(
				network.url,
				account,
				state.rri,
				accountAddress,
				state.to,
				state.amount,
				state.message,
				state.encrypt,
			)
			setState(draft => {
				draft.fee = fee
				draft.transaction = transaction
			})
		} catch (error) {
			addToast({
				type: 'error',
				title: 'Failed to build transaction',
				subTitle: (error?.message || error).toString().trim(),
				duration: 8000,
			})
		}
		setState(draft => {
			draft.isLoading = false
		})
	}

	const handleAccountChange = async (accountIndex: number) => {
		await selectAccount(accountIndex)
		setState(draft => {
			draft.rri = ''
			draft.amount = ''
		})
	}

	const handleSelectedTokenChange = (rri: string) => {
		const changeToken = liquidBalances?.find(balance => balance.rri === rri)
		setState(draft => {
			draft.amount = ''
			draft.rri = changeToken.rri
		})
	}

	const handleUseMax = () => {
		setState(draft => {
			draft.amount = formatBigNumber(selectedTokenAmmount)
		})
		inputAmountRef.current.focus()
	}

	const handleSelectAddressBookAddress = (_address: string) => {
		setState(draft => {
			draft.to = _address
		})

		// HACK: race condition, this is to focus the input as the address selector interrupts the event
		setTimeout(() => {
			inputToAddressRef.current.focus()
		}, 10)
	}

	const handleExitReview = () => {
		setState(draft => {
			draft.amount = ''
			draft.to = ''
			draft.message = null
			draft.encrypt = false
			draft.fee = null
			draft.transaction = null
			draft.isLoading = false
		})
	}

	return (
		<AnimatePresence exitBeforeEnter>
			<MotionBox
				key={state.transaction ? 'confirm' : 'send'}
				animate={{ opacity: 1, y: 0 }}
				initial={{ opacity: 0, y: 0 }}
				exit={{ opacity: 0, y: 0 }}
				transition={{ duration: 0.2 }}
			>
				{state.transaction ? (
					<SendTokenReview
						token={token}
						to={state.to}
						totalTokenAmount={formatBigNumber(selectedTokenAmmount)}
						amount={new BigNumber(state.amount)}
						fee={new BigNumber(state.fee).shiftedBy(-18)}
						transaction={state.transaction}
						onExit={handleExitReview}
					/>
				) : (
					<Flex
						direction="column"
						css={{
							bg: '$bgPanel',
							height: '600px',
							position: 'absolute',
							zIndex: '1',
							left: '0',
							right: '0',
							bottom: '0',
						}}
					>
						<SendReceiveHeader backLocation={isSendTokenRoute ? `/account/token/${state?.rri}` : '/account'} />
						<Box css={{ py: '20px', px: '23px', flex: '1' }}>
							<Box>
								<Text css={{ fontSize: '32px', lineHeight: '38px', fontWeight: '800' }}>Send</Text>
								<Text css={{ fontSize: '14px', lineHeight: '17px', fontWeight: '500', mt: '20px' }}>From:</Text>
							</Box>
							<AccountSelector
								shortAddress={shortAddress}
								tokenAmount={formatBigNumber(selectedTokenAmmount)}
								tokenSymbol={tokenSymbol}
								onAccountChange={handleAccountChange}
							/>
							<HardwareWalletReconnect />
							<Box>
								<Flex align="center" css={{ mt: '14px', position: 'relative' }}>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												size="1"
												color="tertiary"
												css={{
													position: 'absolute',
													top: '-4px',
													right: '0',
													textTransform: 'uppercase',
												}}
												onClick={handleUseMax}
											>
												MAX
											</Button>
										</TooltipTrigger>
										<TooltipContent sideOffset={3}>
											<TooltipArrow offset={15} />
											Select maximum {tokenSymbol}
										</TooltipContent>
									</Tooltip>
									<Text css={{ fontSize: '14px', lineHeight: '17px', fontWeight: '500', flex: '1' }}>Amount:</Text>
								</Flex>
								<Box css={{ mt: '13px', position: 'relative' }}>
									<Input
										ref={inputAmountRef}
										type="number"
										size="2"
										value={state.amount}
										placeholder="Enter amount"
										onChange={handleSetAmount}
									/>
									{token && (
										<TokenSelector
											triggerType="input"
											token={token}
											tokens={liquidBalances.map(balance => balance.rri)}
											onTokenChange={handleSelectedTokenChange}
										/>
									)}
								</Box>
							</Box>
							<Box css={{ position: 'relative', mt: '14px' }}>
								<Flex align="center" css={{ position: 'relative' }}>
									<Text css={{ fontSize: '14px', lineHeight: '17px', fontWeight: '500', flex: '1' }}>To:</Text>
									<Box
										css={{
											position: 'absolute',
											top: '-4px',
											right: '0',
										}}
									>
										<AddressBookSelector
											selectedAddress={state.to}
											onSelectAddressBookAddress={handleSelectAddressBookAddress}
										/>
									</Box>
								</Flex>
								<Box css={{ mt: '13px', position: 'relative' }}>
									<Input
										ref={inputToAddressRef}
										value={state.to}
										size="2"
										placeholder="Enter recipient's address"
										onChange={handleSetTo}
									/>
								</Box>
							</Box>

							<Box>
								<Flex align="center" css={{ mt: '14px', position: 'relative' }}>
									<Flex>
										<Text medium css={{ fontSize: '14px', lineHeight: '17px', pr: '2px' }}>
											Message:
										</Text>
									</Flex>
									<Flex
										align="center"
										justify="end"
										css={{
											position: 'absolute',
											top: '-2px',
											right: '0',
											width: '105px',
											transition: '$default',
											pe: state.message === '' ? 'none' : 'auto',
											opacity: state.message === '' ? 0 : 1,
										}}
									>
										<Checkbox
											id="encrypt"
											size="1"
											onCheckedChange={handleSetEncrypt}
											disabled={state.message === ''}
											checked={state.encrypt}
										>
											<CheckIcon />
										</Checkbox>
										<Text medium size="3" as="label" css={{ paddingLeft: '$2' }} htmlFor="encrypt">
											Encrypt
										</Text>
									</Flex>
								</Flex>
								<Box css={{ mt: '13px' }}>
									<Input
										as="textarea"
										size="2"
										placeholder="Enter transaction message"
										onChange={handleSetMessage}
										css={{ height: '70px' }}
									/>
								</Box>
							</Box>
						</Box>
						<Flex css={{ px: '$2', pb: '$2' }}>
							<Button
								size="6"
								color="primary"
								aria-label="send address"
								css={{ flex: '1' }}
								onClick={handlePrepareTx}
								fullWidth
								loading={state.isLoading}
								disabled={!state.to || !state.amount || !account}
							>
								Review send
							</Button>
						</Flex>
					</Flex>
				)}
			</MotionBox>
		</AnimatePresence>
	)
}
