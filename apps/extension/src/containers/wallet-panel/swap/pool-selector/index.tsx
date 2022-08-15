import React, { useState } from 'react'
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

export const PoolSelector: React.FC<IProps> = ({ pool, pools, onPoolChange }) => {
	const [open, setOpen] = useState<boolean>(false)
	const [measureRef, { width: triggerWidth }] = useMeasure()

	const handleValueChange = (address: string) => {
		onPoolChange(pools.find(p => p.wallet === address))
		setOpen(false)
	}

	let selected = pools.find(p => p.wallet === pool?.wallet)
	if (!selected && pools.length === 1) {
		// eslint-disable-next-line prefer-destructuring
		selected = pools[0]
		onPoolChange(selected)
	}

	return (
		<Select open={open} value={selected?.wallet} onValueChange={handleValueChange}>
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
					{selected?.image && (
						<Box css={{ mt: '1px' }}>
							<CircleAvatar
								width={22}
								height={22}
								image={selected?.image}
								fallbackText={selected?.type.toLocaleUpperCase()}
								cutImage={selected?.type !== PoolType.DOGECUBEX}
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
							key={p.wallet}
							value={p.wallet}
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
