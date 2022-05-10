import React from 'react'
import { useStore } from '@src/store'
import BigNumber from 'bignumber.js'
import { Action, Transaction } from '@src/types'
import { Cross2Icon, EnvelopeClosedIcon } from '@radix-ui/react-icons'
import { useTokenInfo } from '@src/services/react-query/queries/radix'
import { formatBigNumber } from '@src/utils/formatters'
import { Box, Flex, Text } from 'ui/src/components/atoms'
import { getShortAddress } from '@src/utils/string-utils'
import Button from 'ui/src/components/button'
import { CSS } from 'ui/src/theme'
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from 'ui/src/components/popover'
import { ActivityLinks } from './activity-links'
import { ActivityType } from '../activity-type'

interface IProps {
	tx: Transaction
	activity: Action
	css?: CSS
	isIsoStyled?: boolean
}

const defaultProps = {
	css: {},
	isIsoStyled: false,
}

export const ActivityItem = React.forwardRef<HTMLDivElement, IProps>(({ tx, activity, css, isIsoStyled }, ref) => {
	const { accountAddress, addressBook } = useStore(state => ({
		accountAddress: state.getCurrentAddressAction(),
		addressBook: state.addressBook,
	}))
	const { data: token } = useTokenInfo(activity?.rri)
	const tokenImage = token?.image || token?.iconURL

	const entry = addressBook[accountAddress]
	const shortAddress = getShortAddress(accountAddress)

	return (
		<div ref={ref} style={{ paddingBottom: isIsoStyled ? '12px' : '0' }}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						css={{
							...(css as any),
						}}
					>
						<Box css={{ mr: '13px', pl: '$2' }}>
							<Box css={{ width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden' }}>
								<Box as="img" src={tokenImage} css={{ width: '36px', height: '36px' }} />
							</Box>
						</Box>
						<Flex direction="column" css={{ flex: '1' }}>
							<Flex align="center">
								<Flex css={{ flex: '1' }}>
									<Box css={{ maxWidth: isIsoStyled ? '164px' : '207px' }}>
										<Text
											truncate
											bold
											size="3"
											css={{
												...(isIsoStyled
													? {
															fontSize: '14px',
															lineHeight: '16px',
													  }
													: {
															fontSize: '16px',
															lineHeight: '22px',
													  }),
												display: 'flex',
												mt: '1px',
											}}
										>
											<Box css={{ pr: '$1' }}>{formatBigNumber(new BigNumber(activity.amount).shiftedBy(-18))}</Box>
											<Box>{token?.symbol?.toLocaleUpperCase()}</Box>
										</Text>
										<Flex css={{ mr: '$2', mt: isIsoStyled ? '2px' : '0px' }}>
											{tx.message && (
												<Box css={{ mr: '4px', fill: '$txtHelp', color: '$txtHelp' }}>
													<EnvelopeClosedIcon style={{ color: 'currentColor', fill: 'currentColor' }} />
												</Box>
											)}
											<Text truncate size="3" color="help">
												{entry?.name ? `${entry.name} (${shortAddress})` : shortAddress}{' '}
											</Text>
										</Flex>
									</Box>
								</Flex>
								<Flex align="center" css={{ pl: '$1' }}>
									<ActivityType activity={activity} accountAddress={accountAddress} />
								</Flex>
							</Flex>
						</Flex>
					</Button>
				</PopoverTrigger>
				<PopoverContent css={{ width: '300px' }}>
					<ActivityLinks activity={activity} tx={tx} accountAddress={accountAddress} />
					<PopoverClose aria-label="Close">
						<Cross2Icon />
					</PopoverClose>
				</PopoverContent>
			</Popover>
		</div>
	)
})

ActivityItem.defaultProps = defaultProps
