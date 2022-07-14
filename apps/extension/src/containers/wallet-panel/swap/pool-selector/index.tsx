import React from 'react'
import { RightArrowIcon } from 'ui/src/components/icons'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuItemIndicator,
} from 'ui/src/components/drop-down-menu'
import { Box, Text, Flex } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import { Pool } from '@src/hooks/react-query/queries/pools'

interface IProps {
	pool?: Pool
	pools: Pool[]
	onPoolChange: (pool: Pool) => void
}

const defaultProps: Partial<IProps> = {
	pool: null,
}

export const PoolSelector: React.FC<IProps> = ({ pool, pools, onPoolChange }) => {
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
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					css={{
						display: 'flex',
						align: 'center',
						justifyContent: 'flex-start',
						mt: '12px',
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
					<Box css={{ flex: '1' }}>
						<Flex css={{ mt: '2px' }}>
							<Text
								truncate
								uppercase
								css={{ fontSize: '14px', lineHeight: '17px', fontWeight: '500', maxWidth: '200px' }}
							>
								{selected?.name || 'Select'}
							</Text>
						</Flex>
					</Box>
					<Box css={{ pr: '$1', flexShrink: '0' }}>
						<RightArrowIcon />
					</Box>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				avoidCollisions={false}
				align="start"
				side="bottom"
				sideOffset={10}
				css={{ minWidth: '314px' }}
			>
				<DropdownMenuRadioGroup value={selected?.wallet} onValueChange={handleValueChange}>
					{pools.map(p => (
						<DropdownMenuRadioItem key={p.wallet} value={p.wallet}>
							<DropdownMenuItemIndicator />
							<Text size="2" bold truncate css={{ maxWidth: '274px' }}>
								{p.name}
							</Text>
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

PoolSelector.defaultProps = defaultProps
