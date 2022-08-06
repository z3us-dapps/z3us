import React from 'react'
import { RightArrowIcon } from 'ui/src/components/icons'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectViewport,
	SelectItem,
	SelectItemText,
	SelectItemIndicator,
	SelectScrollUpButton,
	SelectScrollDownButton,
} from 'ui/src/components/select'
import { CircleAvatar } from '@src/components/circle-avatar'
import { Box, Text, Flex } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import { Pool, PoolType } from '@src/types'
import useMeasure from 'react-use-measure'

interface IProps {
	pool?: Pool
	pools: Pool[]
	onPoolChange: (pool: Pool) => void
}

const defaultProps: Partial<IProps> = {
	pool: null,
}

export const PoolSelector: React.FC<IProps> = ({ pool, pools, onPoolChange }) => {
	const [measureRef, { width: triggerWidth }] = useMeasure()
	const handleValueChange = (address: string) => {
		onPoolChange(pools.find(p => p.wallet === address))
	}

	let selected = pools.find(p => p.wallet === pool?.wallet)
	if (!selected && pools.length === 1) {
		// eslint-disable-next-line prefer-destructuring
		selected = pools[0]
		onPoolChange(selected)
	}

	return (
		<Select value={selected?.wallet} onValueChange={handleValueChange}>
			<SelectTrigger aria-label="Pool selector" asChild>
				<Button
					ref={measureRef}
					css={{
						display: 'flex',
						align: 'center',
						justifyContent: 'flex-start',
						bg: '$bgPanel2',
						borderRadius: '8px',
						height: '64px',
						position: 'relative',
						width: '100%',
						ta: 'left',
						'&:hover': {
							bg: '$bgPanelHover',
						},
					}}
				>
					<Box css={{ p: '8px' }}>
						<CircleAvatar image={selected?.image} fallbackText={selected?.type.toLocaleUpperCase()}
													cutImage={selected?.type !== PoolType.DOGECUBEX} />
					</Box>
					<Box css={{ flex: '1' }}>
						<Flex css={{ mt: '2px' }}>
							<Text truncate css={{ fontSize: '14px', lineHeight: '17px', fontWeight: '500', maxWidth: '200px' }}>
								Pool: <SelectValue />
							</Text>
						</Flex>
					</Box>
					<Box css={{ pr: '$1', flexShrink: '0' }}>
						<RightArrowIcon />
					</Box>
				</Button>
			</SelectTrigger>
			<SelectContent>
				<SelectScrollUpButton>
					<ChevronUpIcon />
				</SelectScrollUpButton>
				<SelectViewport>
					{pools.map(p => (
						<SelectItem
							key={p.wallet}
							value={p.wallet}
							css={{
								'span:first-child': {
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap',
									maxWidth: `${triggerWidth}px`,
								},
							}}
						>
							<SelectItemText>{p.name}</SelectItemText>
							<SelectItemIndicator />
						</SelectItem>
					))}
				</SelectViewport>
				<SelectScrollDownButton>
					<ChevronDownIcon />
				</SelectScrollDownButton>
			</SelectContent>
		</Select>
	)
}

PoolSelector.defaultProps = defaultProps
