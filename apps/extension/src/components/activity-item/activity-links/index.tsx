import React from 'react'
import { useStore } from '@src/store'
import { CopyIcon, ExternalLinkIcon, InfoCircledIcon, Cross2Icon, EnvelopeClosedIcon } from '@radix-ui/react-icons'
import { Text, Box, Flex } from 'ui/src/components/atoms'
import { Action, Transaction } from '@src/services/types'
import { getShortAddress } from '@src/utils/string-utils'
import Button from 'ui/src/components/button'
import ButtonTipFeedback from 'ui/src/components/button-tip-feedback'
import { Tooltip, TooltipContent, TooltipTrigger, TooltipArrow } from 'ui/src/components/tool-tip'
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from 'ui/src/components/popover'
import { copyTextToClipboard } from '@src/utils/copy-to-clipboard'
import { ActivityType } from '@src/components/activity-type'
import { EXPLORER_URL } from '@src/containers/wallet-panel/config'
import { TransactionMessage } from '../transaction-message'

interface IProps {
	accountAddress: string
	tx?: Transaction
	activity?: Action
}

const defaultProps = {
	tx: undefined,
	activity: undefined,
}

export const ActivityLinks: React.FC<IProps> = ({ accountAddress, tx, activity }: IProps) => {
	const { addressBook } = useStore(state => ({
		addressBook: state.addressBook,
	}))

	const entry = addressBook[accountAddress]
	const shortAddress = getShortAddress(accountAddress)

	const toAccount = activity?.to_account || activity?.to_validator
	const toEntry = addressBook[toAccount]
	const toShortAddress = getShortAddress(toAccount)

	const fromAccount = activity?.from_account || activity?.from_validator
	const fromEntry = addressBook[fromAccount]
	const fromShortAddress = getShortAddress(fromAccount)

	const handleCopyAddress = (str: string) => {
		copyTextToClipboard(str)
	}

	const handleGotoTokenExplorer = () => {
		window.open(`${EXPLORER_URL}/transactions/${tx.id}`)
	}

	const LEFT_COL_WIDTH = '100px'

	return (
		<>
			<Text size="3" color="muted" css={{ mr: '$2' }}>
				{entry?.name ? `${entry.name} (${shortAddress})` : shortAddress} {tx.message && <EnvelopeClosedIcon />}
			</Text>
			<Popover>
				<PopoverTrigger asChild>
					<Button size="1" iconOnly color="ghost">
						<InfoCircledIcon />
					</Button>
				</PopoverTrigger>
				<PopoverContent css={{ width: '275px' }}>
					<Box css={{ p: '$4' }}>
						<Flex css={{ mt: '0' }}>
							<Text medium size="3" truncate css={{ width: LEFT_COL_WIDTH }}>
								Transaction
							</Text>
						</Flex>
						<Flex align="center" css={{ mt: '$2' }}>
							<Text size="2" truncate css={{ width: LEFT_COL_WIDTH }}>
								Type:
							</Text>
							<Flex align="center" justify="end" css={{ flex: '1' }}>
								<ActivityType activity={activity} accountAddress={accountAddress} />
							</Flex>
						</Flex>
						<Flex align="center" css={{ mt: '5px' }}>
							<Text size="2" truncate css={{ width: LEFT_COL_WIDTH }}>
								Transaction ID:
							</Text>
							<Flex align="center" justify="end" css={{ flex: '1' }}>
								<Text color="muted" size="2" css={{ pr: '$1' }}>
									{getShortAddress(tx.id)}
								</Text>
								<ButtonTipFeedback feedback="Copied" delay={500} css={{ backgroundColor: '$bgPanel' }} sideOffset={10}>
									<Button size="1" iconOnly color="ghost" onClick={() => handleCopyAddress(tx.id)}>
										<CopyIcon />
									</Button>
								</ButtonTipFeedback>
							</Flex>
						</Flex>
						{fromShortAddress && (
							<Flex align="center" css={{ mt: '3px' }}>
								<Text size="2" truncate css={{ width: LEFT_COL_WIDTH }}>
									{activity.from_validator ? 'From validator' : 'From address'}
								</Text>
								<Flex align="center" justify="end" css={{ flex: '1' }}>
									<Text color="muted" size="2" css={{ pr: '$1' }}>
										{fromEntry?.name ? `${fromEntry.name} (${fromShortAddress})` : fromShortAddress}
									</Text>
									<ButtonTipFeedback
										feedback="Copied"
										delay={500}
										css={{ backgroundColor: '$bgPanel' }}
										sideOffset={10}
									>
										<Button size="1" iconOnly color="ghost" onClick={() => handleCopyAddress(fromAccount)}>
											<CopyIcon />
										</Button>
									</ButtonTipFeedback>
								</Flex>
							</Flex>
						)}
						{toShortAddress && (
							<Flex align="center" css={{ mt: '3px' }}>
								<Text size="2" truncate css={{ width: LEFT_COL_WIDTH }}>
									{activity.to_validator ? 'To validator' : 'To address'}
								</Text>
								<Flex align="center" justify="end" css={{ flex: '1' }}>
									<Text color="muted" size="2" css={{ pr: '$1' }}>
										{toEntry?.name ? `${toEntry.name} (${toShortAddress})` : toShortAddress}
									</Text>
									<ButtonTipFeedback
										feedback="Copied"
										delay={500}
										css={{ backgroundColor: '$bgPanel' }}
										sideOffset={10}
									>
										<Button size="1" iconOnly color="ghost" onClick={() => handleCopyAddress(toAccount)}>
											<CopyIcon />
										</Button>
									</ButtonTipFeedback>
								</Flex>
							</Flex>
						)}
						{tx.message && (
							<Flex align="center" css={{ mt: '7px' }}>
								<Box>
									<Text size="2" truncate css={{ pb: '6px' }}>
										Message:
									</Text>
									<Text color="muted" css={{ maxWdith: '219px' }}>
										<TransactionMessage tx={tx} activity={activity} />
									</Text>
								</Box>
							</Flex>
						)}
					</Box>
					<PopoverClose aria-label="Close">
						<Cross2Icon />
					</PopoverClose>
				</PopoverContent>
			</Popover>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button size="1" iconOnly color="ghost" onClick={handleGotoTokenExplorer}>
						<ExternalLinkIcon />
					</Button>
				</TooltipTrigger>

				<TooltipContent sideOffset={1} css={{ backgroundColor: '$bgPanel' }}>
					<TooltipArrow css={{ fill: '$bgPanel' }} />
					Go to explorer
				</TooltipContent>
			</Tooltip>
		</>
	)
}

ActivityLinks.defaultProps = defaultProps
