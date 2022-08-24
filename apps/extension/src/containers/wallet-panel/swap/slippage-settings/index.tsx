import React from 'react'
import { Cross2Icon, Pencil1Icon } from '@radix-ui/react-icons'
import { Box, Text, Flex } from 'ui/src/components/atoms'
import { StyledSlider, StyledTrack, StyledThumb, StyledRange } from 'ui/src/components/slider'
import { Checkbox, CheckIcon } from 'ui/src/components/checkbox'
import { Popover, PopoverArrow, PopoverContent, PopoverTrigger, PopoverClose } from 'ui/src/components/popover'
import { getSlippagePercentage } from '../utils'

interface IProps {
	minimum: boolean
	onMinimumChange: (checked: boolean) => void
	slippage: number
	onSlippageChange: (slippage: number) => void
}

export const SlippageSettings: React.FC<IProps> = ({ minimum, onMinimumChange, slippage, onSlippageChange }) => {
	const handleSlippageChange = ([_slippage]: Array<number>) => {
		onSlippageChange(_slippage / 100)
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Box
					as="button"
					css={{
						display: 'flex',
						m: '0',
						p: '0',
						outline: '0',
						border: '0',
						color: '$z3usPurple',
						background: 'none',
						cursor: 'pointer',
					}}
				>
					<Text medium underline css={{ pr: '2px' }} color={!minimum ? 'muted' : undefined}>
						{getSlippagePercentage(slippage)}
					</Text>
					<Box css={{ transform: 'translateY(-1px)', mr: '-2px' }}>
						<Pencil1Icon />
					</Box>
				</Box>
			</PopoverTrigger>
			<PopoverContent sideOffset={0} css={{ width: '220px', backgroundColor: '$bgPanel', padding: '$4' }}>
				<Flex css={{ flexDirection: 'column', gap: 7 }}>
					<Flex css={{ flexDirection: 'column', gap: 5 }}>
						<Flex align="start" css={{ flexWrap: 'wrap' }}>
							<Text size="3" bold truncate>
								Slippage Tolerance
							</Text>
							<PopoverClose aria-label="Close">
								<Cross2Icon />
							</PopoverClose>
						</Flex>
						<Box css={{ pt: '$1', pb: '$2' }}>
							<Box css={{ transition: '$default', opacity: !minimum ? '0.3' : '1.0' }}>
								<StyledSlider
									onValueChange={handleSlippageChange}
									value={[slippage * 100]}
									max={50}
									min={1}
									step={1}
									disabled={!minimum}
									aria-label="swap slippage tolerance"
									css={{ width: '100%' }}
								>
									<StyledTrack>
										<StyledRange />
									</StyledTrack>
									<StyledThumb />
								</StyledSlider>
								<Flex css={{ mt: '6px', justifyContent: 'space-between' }}>
									<Text size="1" color="help" css={{ transform: 'translateX(-1px)' }}>
										1%
									</Text>
									<Text size="1" color="help">
										12%
									</Text>
									<Text size="1" color="help" css={{ transform: 'translateX(4px)' }}>
										25%
									</Text>
									<Text size="1" color="help" css={{ transform: 'translateX(3px)' }}>
										37%
									</Text>
									<Text size="1" color="help" css={{ transform: 'translateX(2px)' }}>
										50%
									</Text>
								</Flex>
							</Box>
						</Box>
						<Box>
							<Flex
								align="center"
								css={{
									transition: '$default',
									pe: 'auto',
									opacity: 1,
								}}
							>
								<Checkbox id="minimum" size="1" onCheckedChange={onMinimumChange} checked={minimum}>
									<CheckIcon />
								</Checkbox>
								<Text medium size="2" as="label" css={{ paddingLeft: '$2' }} htmlFor="minimum">
									Enabled
								</Text>
							</Flex>
						</Box>
						<Text size="2" color="help" css={{ pt: '$1' }}>
							Slippage Tolerance is the pricing difference between the price at the confirmation time and the actual
							price of the transaction users are willing to accept when swapping. Transaction will return unfilled if
							the rate has moved adversely against you. Wallet and transaction fees still apply.
						</Text>
					</Flex>
				</Flex>
				<PopoverArrow offset={14} css={{ fill: '$bgPanel' }} />
			</PopoverContent>
		</Popover>
	)
}
