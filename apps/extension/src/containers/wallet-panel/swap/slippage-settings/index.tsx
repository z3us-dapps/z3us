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
				<Box as="button" css={{ display: 'flex', m: '0', p: '0', outline: '0', border: '0', color: '$z3usPurple' }}>
					<Text medium underline css={{ pr: '2px' }}>
						{minimum ? 'Min' : getSlippagePercentage(slippage)}
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
								Slippage settings
							</Text>
							<PopoverClose aria-label="Close">
								<Cross2Icon />
							</PopoverClose>
						</Flex>
						<Box css={{ pt: '$1', pb: '$2' }}>
							<Box css={{ transition: '$default', opacity: minimum ? '0.5' : '1.0' }}>
								<StyledSlider
									onValueChange={handleSlippageChange}
									value={[slippage * 100]}
									max={5}
									min={0.5}
									step={0.5}
									disabled={minimum}
									aria-label="swap slippage settings"
									css={{ width: '100%' }}
								>
									<StyledTrack>
										<StyledRange />
									</StyledTrack>
									<StyledThumb />
								</StyledSlider>
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
								<Checkbox
									id="minimum"
									size="1"
									onCheckedChange={onMinimumChange}
									checked={minimum}
									// disabled={state.isLoading}
								>
									<CheckIcon />
								</Checkbox>
								<Text medium size="2" as="label" css={{ paddingLeft: '$2' }} htmlFor="minimum">
									Minimum
								</Text>
							</Flex>
						</Box>
						<Text size="2" color="help" css={{ pt: '$1' }}>
							Minimum will return unfilled if the rate has moved adversely against you. Wallet and transaction fees
							still apply.
						</Text>
					</Flex>
				</Flex>
				<PopoverArrow offset={14} css={{ fill: '$bgPanel' }} />
			</PopoverContent>
		</Popover>
	)
}
