import React, { useRef } from 'react'
import { useQueryClient } from 'react-query'
import { useImmer } from 'use-immer'
import { useSharedStore, useStore } from '@src/store'
import { useLocation } from 'wouter'
import { getShortAddress } from '@src/utils/string-utils'
import {
	FinalizeTransaction,
	SubmitSignedTransaction,
	UnstakeTokens,
	StakeTokens,
} from '@src/services/radix/transactions'
import { HardwareWalletReconnect } from '@src/components/hardware-wallet-reconnect'
import { useEventListener } from 'usehooks-ts'
import {
	useNativeToken,
	useLookupValidator,
	useTokenBalances,
	useStakedPositions,
} from '@src/services/react-query/queries/radix'
import { CloseIcon } from 'ui/src/components/icons'
import Button from 'ui/src/components/button'
import Input from 'ui/src/components/input'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipArrow } from 'ui/src/components/tool-tip'
import { Dialog, DialogTrigger, DialogContent } from 'ui/src/components/dialog'
import { Box, Text, Flex } from 'ui/src/components/atoms'
import { SlippageBox } from '@src/components/slippage-box'
import BigNumber from 'bignumber.js'
import { formatBigNumber } from '@src/utils/formatters'

interface IProps {
	trigger: React.ReactNode
	validatorAddress?: string
	tooltipMessage?: string
	reduceStake?: boolean
}

export const StakeModal: React.FC<IProps> = ({ trigger, tooltipMessage, validatorAddress, reduceStake }) => {
	const inputAmountRef = useRef(null)
	const [, setLocation] = useLocation()
	const queryClient = useQueryClient()
	const { data: stakedPositions } = useStakedPositions()
	const { data: balances } = useTokenBalances()
	const { data: token } = useNativeToken()
	const { data: validator } = useLookupValidator(validatorAddress)

	const { addToast } = useSharedStore(state => ({
		addToast: state.addToastAction,
	}))

	const { account, entry, network } = useStore(state => ({
		account: state.account,
		entry: Object.values(state.publicAddresses).find(_account => _account.address === state.getCurrentAddressAction()),
		network: state.networks[state.selectedNetworkIndex],
	}))

	let amount = new BigNumber(0)
	if (reduceStake) {
		const staked = stakedPositions?.stakes.find(position => position.validator.toString() === validator?.address)
		amount = staked ? new BigNumber(staked.amount).shiftedBy(-18) : new BigNumber(0)
	} else {
		const liquidBalances = balances?.account_balances?.liquid_balances || []
		const selectedToken = liquidBalances?.find(balance => balance.rri === token?.rri)
		amount = selectedToken ? new BigNumber(selectedToken.amount).shiftedBy(-18) : new BigNumber(0)
	}

	const [state, setState] = useImmer({
		amount: '',
		validator: validatorAddress,
		fee: null,
		transaction: null,
		isLoading: false,
		isModalOpen: false,
	})

	const shortAddress = getShortAddress(entry?.address)
	const stakeTitle = reduceStake ? 'Unstake' : 'Stake'

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

	const handleSetValidator = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState(draft => {
			draft.validator = event.currentTarget.value
		})
	}

	const handleSetAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState(draft => {
			draft.amount = event.currentTarget.value
		})
	}

	const handleUseMax = () => {
		setState(draft => {
			draft.amount = formatBigNumber(amount)
		})
		inputAmountRef.current.focus()
	}

	const wrappedTrigger = tooltipMessage ? (
		<DialogTrigger asChild>
			<Tooltip>
				<TooltipTrigger asChild onClick={handleOnClick}>
					{trigger}
				</TooltipTrigger>
				<TooltipContent sideOffset={5} css={{ backgroundColor: '$bgPanel2' }}>
					<TooltipArrow css={{ fill: '$bgPanel2' }} />
					{tooltipMessage}
				</TooltipContent>
			</Tooltip>
		</DialogTrigger>
	) : (
		<DialogTrigger asChild onClick={handleOnClick}>
			{trigger}
		</DialogTrigger>
	)

	useEventListener('keydown', e => {
		if (e.key === 'Escape') {
			setState(draft => {
				draft.isModalOpen = false
			})
		}
	})

	const handlePrepareTx = async () => {
		if (!token) {
			return
		}
		setState(draft => {
			draft.isLoading = true
		})

		try {
			const method = reduceStake ? UnstakeTokens : StakeTokens
			const { transaction, fee } = await method(network.url, token.rri, entry?.address, state.validator, state.amount)
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

	const handleConfirm = async () => {
		if (!account) return
		setState(draft => {
			draft.isLoading = true
		})
		try {
			const { blob } = await FinalizeTransaction(network.url, account, token.symbol, state.transaction)
			await SubmitSignedTransaction(network.url, account, blob)
			await queryClient.invalidateQueries({ active: true, inactive: true, stale: true })
			setState(draft => {
				draft.fee = null
				draft.transaction = null
				draft.isModalOpen = false
			})
			setLocation(`/wallet/account/token/${token.rri}`)
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
			{wrappedTrigger}
			<DialogContent>
				<Flex direction="column" css={{ p: '$2', position: 'relative' }}>
					<Button
						color="ghost"
						iconOnly
						aria-label="close stake modal"
						size="3"
						css={{ position: 'absolute', top: '0px', right: '0px' }}
						onClick={handleCloseModal}
					>
						<CloseIcon />
					</Button>

					<Box css={{ flex: '1' }}>
						<Flex direction="column" align="center" css={{ bg: '$bgPanel2', width: '100%', p: '0', br: '$2' }}>
							<Text medium size="8" bold css={{ mt: '35px' }}>
								{validator?.name}
							</Text>
							<Text color="help" medium size="6" bold css={{ mt: '10px' }}>
								{stakeTitle}
							</Text>
							<Text color="help" size="4" css={{ pb: '10px', mt: '10px', mb: '5px' }}>
								{entry?.name ? `${entry.name} (${shortAddress})` : shortAddress}
							</Text>
						</Flex>
						<HardwareWalletReconnect />
						<Box css={{ mt: '$3' }}>
							<Input
								value={state.validator}
								placeholder="Enter validator address"
								onChange={handleSetValidator}
								disabled={!!validatorAddress}
							/>
						</Box>
						<Box css={{ mt: '$2' }}>
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
										Select maximum {token?.symbol.toUpperCase()}
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
							</Box>
						</Box>
						<SlippageBox
							css={{ mt: '12px' }}
							token={token}
							amount={state.amount ? new BigNumber(state.amount) : null}
							fee={state.fee ? new BigNumber(state.fee).shiftedBy(-18) : null}
						/>
					</Box>
					<Flex css={{ mt: '$3' }}>
						{state.transaction ? (
							<Button
								size="6"
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
								size="6"
								color="primary"
								aria-label={stakeTitle}
								css={{ px: '0', flex: '1' }}
								onClick={handlePrepareTx}
								loading={state.isLoading}
							>
								{stakeTitle}
							</Button>
						)}
					</Flex>
				</Flex>
			</DialogContent>
		</Dialog>
	)
}

StakeModal.defaultProps = {
	validatorAddress: '',
	tooltipMessage: '',
	reduceStake: false,
}
