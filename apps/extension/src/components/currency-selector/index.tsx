import React from 'react'
import { useSharedStore } from '@src/store'
import { RightArrowIcon } from 'ui/src/components/icons'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuItemIndicator,
} from 'ui/src/components/drop-down-menu'
import { Box, Text } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import { useSupportedCurrencies } from '@src/services/react-query/queries/market'

export const CurrencySelector: React.FC = () => {
	const { currency, setCurrency } = useSharedStore(state => ({
		currency: state.currency,
		setCurrency: state.setCurrencyAction,
	}))
	const { data: currencies } = useSupportedCurrencies()

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
						<Text
							truncate
							css={{ fontSize: '14px', lineHeight: '17px', fontWeight: '500', mt: '2px', maxWidth: '210px' }}
						>
							{currency.toUpperCase()}
						</Text>
					</Box>
					<Box css={{ pr: '$1' }}>
						<RightArrowIcon />
					</Box>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				avoidCollisions={false}
				align="start"
				side="bottom"
				sideOffset={10}
				css={{ minWidth: '150px', maxWidth: '314px', width: '100%' }}
			>
				<DropdownMenuRadioGroup value={currency} onValueChange={setCurrency}>
					{currencies ? (
						currencies.map(cur => (
							<DropdownMenuRadioItem key={cur} value={cur}>
								<DropdownMenuItemIndicator />
								<Text size="2" bold truncate css={{ maxWidth: '274px' }}>
									{cur.toUpperCase()}
								</Text>
							</DropdownMenuRadioItem>
						))
					) : (
						<DropdownMenuRadioItem value="usd">
							<DropdownMenuItemIndicator />
							<Text size="2" bold truncate css={{ maxWidth: '274px' }}>
								USD
							</Text>
						</DropdownMenuRadioItem>
					)}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
