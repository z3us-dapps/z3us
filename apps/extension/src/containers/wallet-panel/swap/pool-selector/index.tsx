import { ChevronDownIcon, ChevronUpIcon, Pencil1Icon } from '@radix-ui/react-icons'
import React, { useEffect, useState } from 'react'
import useMeasure from 'react-use-measure'

import { Box, Text } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectItemIndicator,
	SelectItemText,
	SelectScrollDownButton,
	SelectScrollUpButton,
	SelectTrigger,
	SelectValue,
	SelectViewport,
} from 'ui/src/components/select'

import { CircleAvatar } from '@src/components/circle-avatar'
import type { Pool} from '@src/types';
import { PoolType } from '@src/types'

interface IProps {
	pool?: Pool
	pools: Pool[]
	onPoolChange: (pool: Pool) => void
}

const defaultProps: Partial<IProps> = {
	pool: null,
}

export const PoolSelector: React.FC<IProps> = ({ pool, pools, onPoolChange }) => {
	const [open, setOpen] = useState<boolean>(false)
	const [measureRef, { width: triggerWidth }] = useMeasure()

	const handleValueChange = (id: string) => {
		onPoolChange(pools.find(p => p.id === id))
		setOpen(false)
	}

	useEffect(() => {
		const selected = pools.find(p => p.id === pool?.id)
		if (!selected && pools.length === 1) {
			onPoolChange(pools[0])
		}
	}, [pool, pools])

	return (
		<Select open={open} value={pool?.id} onValueChange={handleValueChange}>
			<SelectTrigger aria-label="Pool selector" asChild onClick={() => setOpen(true)}>
				<Button
					ref={measureRef}
					css={{
						margin: '0',
						padding: '0',
						display: 'flex',
						align: 'center',
						justifyContent: 'center',
						bg: 'transparent',
						borderRadius: '3px',
						height: '24px',
						width: 'auto',
						position: 'relative',
						color: '$txt',
						ta: 'left',
					}}
				>
					{pool?.image && (
						<Box css={{ mt: '1px' }}>
							<CircleAvatar
								width={22}
								height={22}
								image={pool?.image}
								fallbackText={pool?.type.toLocaleUpperCase()}
								cutImage={pool?.type !== PoolType.DOGECUBEX}
								borderWidth={0}
								shadow={false}
							/>
						</Box>
					)}
					<Text
						medium
						truncate
						color="purple"
						underline
						css={{ ml: '1px', display: 'flex', alignItems: 'center', gap: '3px', svg: { mt: '2px' } }}
					>
						<SelectValue />
						<Pencil1Icon />
					</Text>
				</Button>
			</SelectTrigger>
			<SelectContent onPointerDownOutside={() => setOpen(false)}>
				<SelectScrollUpButton>
					<ChevronUpIcon />
				</SelectScrollUpButton>
				<SelectViewport>
					{pools.map(p => (
						<SelectItem
							key={p.id}
							value={p.id}
							css={{
								'span:first-child': {
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap',
									maxWidth: `${triggerWidth}px`,
									minWidth: '100px',
								},
							}}
						>
							<SelectItemText>{p.name}</SelectItemText>
							{p.costRatio && (
								<Text color={p.costRatio > 0 ? 'red' : 'green'} medium>
									{`${p.costRatio > 0 ? '+' : ''}${p.costRatio.multipliedBy(100).toFixed(2).toLocaleString()}%`}
								</Text>
							)}
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
