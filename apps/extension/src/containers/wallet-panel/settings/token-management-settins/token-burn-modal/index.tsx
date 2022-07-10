import React, { useRef } from 'react'
import { useQueryClient } from 'react-query'
import { useImmer } from 'use-immer'
import { useSharedStore, useStore } from '@src/store'
import { useLocation } from 'wouter'
import { getShortAddress } from '@src/utils/string-utils'
import { Cross2Icon } from '@radix-ui/react-icons'
import { PageHeading, PageSubHeading, PageWrapper } from '@src/components/layout'
import { ScrollArea } from 'ui/src/components/scroll-area'
import { useEventListener } from 'usehooks-ts'
import Button from 'ui/src/components/button'
import Input from 'ui/src/components/input'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipArrow } from 'ui/src/components/tool-tip'
import { Dialog, DialogTrigger, DialogContent } from 'ui/src/components/dialog'
import { Box, Text, Flex } from 'ui/src/components/atoms'
import { AccountSelector } from '@src/components/account-selector'
import { HardwareWalletReconnect } from '@src/components/hardware-wallet-reconnect'
import { useTokenBalances, useTokenInfo } from '@src/services/react-query/queries/radix'
import { TokenSelector } from '@src/components/token-selector'
import { formatBigNumber } from '@src/utils/formatters'
import BigNumber from 'bignumber.js'
import { useTransaction } from '@src/hooks/use-transaction'
import { useTokenDerive } from '@src/hooks/use-token-derive'
import { useTokenBurn } from '@src/hooks/use-token-burn'

interface IProps {
	trigger: React.ReactNode
}

export const BurnTokenModal: React.FC<IProps> = ({ trigger }) => {
	const inputAmountRef = useRef(null)

	const [, setLocation] = useLocation()
	const queryClient = useQueryClient()

	const burn = useTokenBurn()
	const derive = useTokenDerive()
	const { signTransaction, submitTransaction } = useTransaction()

	const { hw, seed, addToast } = useSharedStore(state => ({
		hw: state.hardwareWallet,
		seed: state.masterSeed,
		addToast: state.addToastAction,
	}))

	const { selectAccount, account, accountAddress } = useStore(state => ({
		selectAccount: state.selectAccountAction,
		account: state.account,
		accountAddress: state.getCurrentAddressAction(),
	}))

	const [state, setState] = useImmer({
		amount: '',
		rri: '',

		fee: null,
		transaction: null,

		isLoading: false,
		isModalOpen: false,
	})

	const { data: balances } = useTokenBalances()
	const { data: token } = useTokenInfo(state.rri)
	const liquidBalances = balances?.account_balances?.liquid_balances || []
	const selectedToken = liquidBalances?.find(balance => balance.rri === state.rri)
	const selectedTokenAmmount = selectedToken ? new BigNumber(selectedToken.amount).shiftedBy(-18) : new BigNumber(0)
	const tokenSymbol = token?.symbol.toUpperCase()

	const shortAddress = getShortAddress(accountAddress)

	const handleAccountChange = async (accountIndex: number) => {
		await selectAccount(accountIndex, hw, seed)
	}

	const handleSelectedTokenChange = (rri: string) => {
		setState(draft => {
			draft.amount = ''
			draft.rri = rri
		})
	}

	const handleUseMax = () => {
		setState(draft => {
			draft.amount = selectedTokenAmmount.toString()
		})
		inputAmountRef.current.focus()
	}

	const handleSetValue = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setState(draft => {
			draft[key] = event.currentTarget.value
		})
	}

	const handleOnClick = () => {
		setState(draft => {
			draft.isModalOpen = !draft.isModalOpen
		})
	}

	const handleCloseModal = () => {
		setState(draft => {
			draft.isModalOpen = false
		})
	}

	useEventListener('keydown', e => {
		if (e.key === 'Escape') {
			setState(draft => {
				draft.isModalOpen = false
			})
		}
	})

	const handlePrepareTx = async () => {
		if (!token) return

		setState(draft => {
			draft.isLoading = true
		})

		try {
			const rri = await derive(accountAddress, token.symbol)
			const { transaction, fee } = await burn(rri, state.amount)
			setState(draft => {
				draft.rri = rri
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

	const handleConfirm = async () => {
		if (!account) return
		if (!token) return

		setState(draft => {
			draft.isLoading = true
		})
		try {
			const { blob } = await signTransaction(token.symbol, state.transaction)
			await submitTransaction(blob)
			await queryClient.invalidateQueries({ active: true, inactive: true, stale: true })
			setState(draft => {
				draft.fee = null
				draft.transaction = null
				draft.isModalOpen = false
			})
			setLocation(`/wallet/account/token/${state.rri}`)
			addToast({
				type: 'success',
				title: 'Succesfully submited transaction to the network',
				duration: 5000,
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

	return (
		<Dialog open={state.isModalOpen} modal={false}>
			<DialogTrigger asChild onClick={handleOnClick}>
				{trigger}
			</DialogTrigger>

			<DialogContent css={{ p: '0' }}>
				<Box css={{ height: '350px', position: 'relative' }}>
					<ScrollArea>
						<PageWrapper css={{ position: 'relative' }}>
							<Box>
								<Button
									color="ghost"
									iconOnly
									aria-label="close create token modal"
									size="2"
									css={{ position: 'absolute', top: '$3', right: '$3', zIndex: '1' }}
									onClick={handleCloseModal}
								>
									<Cross2Icon />
								</Button>
								<Box css={{ width: '100%' }}>
									<PageHeading>Burn</PageHeading>
									<PageSubHeading>From</PageSubHeading>
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
											placeholder={`Enter ${token?.symbol || ''} amount`}
											onChange={handleSetValue('amount')}
										/>
										<TokenSelector
											triggerType="input"
											token={token}
											tokens={liquidBalances.map(balance => balance.rri)}
											onTokenChange={handleSelectedTokenChange}
										/>
									</Box>
								</Box>
							</Box>
							<Flex css={{ mt: '$4' }}>
								{state.transaction ? (
									<Button
										size="5"
										color="primary"
										aria-label="confirm"
										css={{ px: '0', flex: '1' }}
										onClick={handleConfirm}
										disabled={!account}
										loading={state.isLoading}
									>
										Confirm
									</Button>
								) : (
									<Button
										size="5"
										color="primary"
										aria-label="burn"
										css={{ px: '0', flex: '1' }}
										onClick={handlePrepareTx}
										loading={state.isLoading}
									>
										Burn
									</Button>
								)}
							</Flex>
						</PageWrapper>
					</ScrollArea>
				</Box>
			</DialogContent>
		</Dialog>
	)
}
