import React, { useState, useEffect } from 'react'
import { useImmer } from 'use-immer'
import { Pencil1Icon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
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
import { Box, Text } from 'ui/src/components/atoms'
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

interface ImmerProps {
	selected?: Pool
	pools: Pool[]
}

export const PoolSelector: React.FC<IProps> = ({ pool, pools, onPoolChange }) => {
	const [open, setOpen] = useState<boolean>(false)
	const [measureRef, { width: triggerWidth }] = useMeasure()

	const [state, setState] = useImmer<ImmerProps>({
		selected: undefined,
		pools: [],
	})

	const handleValueChange = (id: string) => {
		onPoolChange(state.pools.find(p => p.id === id))
		setOpen(false)
	}

	useEffect(() => {
		const selected = pools.find(p => p.id === pool?.id)
		if (!selected && state.pools.length === 1) {
			onPoolChange(state.pools[0])
		} else {
			setState(draft => {
				draft.selected = selected
				draft.pools = [...pools].sort((a, b) => {
					if (a.id === state.selected?.id) return -1
					if (!a.costRatio) return 1
					if (!b.costRatio) return -1
					return a.costRatio.minus(b.costRatio).toNumber()
				})
			})
		}
	}, [pool, pools])

	return (
		<Select open={open} value={state.selected?.id} onValueChange={handleValueChange}>
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
					{state.selected?.image && (
						<Box css={{ mt: '1px' }}>
							<CircleAvatar
								width={22}
								height={22}
								image={state.selected?.image}
								fallbackText={state.selected?.type.toLocaleUpperCase()}
								cutImage={state.selected?.type !== PoolType.DOGECUBEX}
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
					{state.pools.map(p => (
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
							{p.costRatio && p.costRatio.gt(0) && `+${p.costRatio.multipliedBy(100).toFixed(2).toLocaleString()}%`}
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
