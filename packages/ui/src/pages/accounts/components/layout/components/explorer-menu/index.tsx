import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLeftSlot,
	DropdownMenuPortal,
	DropdownMenuTrigger,
} from 'ui/src/components/dropdown-menu'
import { RadixIcon, Z3usIcon } from 'ui/src/components/icons'
import { ToolTip } from 'ui/src/components/tool-tip'
import Text from 'ui/src/components/typography/text'
import { useDashboardUrl } from 'ui/src/hooks/dapp/use-network'
import { useZdtState } from 'ui/src/hooks/zdt/use-zdt'

import * as styles from './styles.css'

const messages = defineMessages({
	open_radix_dashboard: {
		id: 'xxuT0a',
		defaultMessage: 'Open in Radix Dashboard',
	},
	open_z3us: {
		id: 'WAHvBA',
		defaultMessage: 'Open in Z3US.com',
	},
	open_transaction_tooltip: {
		id: 'YnOdQH',
		defaultMessage: 'Open in explorer',
	},
})

export interface IProps {
	trigger: React.ReactElement
	radixExplorerUrl: string
	z3usExplorerUrl: string
	isToolTipVisible?: boolean
}

export const ExplorerMenu: React.FC<IProps> = ({
	trigger,
	radixExplorerUrl,
	z3usExplorerUrl,
	isToolTipVisible = true,
}) => {
	const intl = useIntl()
	const { isWallet } = useZdtState()

	return (
		<Box className={styles.explorerMenuWrapper}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Box>
						<ToolTip disabled={!isToolTipVisible} message={intl.formatMessage(messages.open_transaction_tooltip)}>
							{trigger}
						</ToolTip>
					</Box>
				</DropdownMenuTrigger>
				<DropdownMenuPortal>
					<DropdownMenuContent align="end" sideOffset={2} className={styles.explorerMenuDropdownWrapper}>
						<DropdownMenuItem
							onSelect={() => {
								window.open(radixExplorerUrl, '_blank', 'noreferrer')
							}}
						>
							<DropdownMenuLeftSlot>
								<RadixIcon />
							</DropdownMenuLeftSlot>
							<Box display="flex" marginLeft="small">
								<Text size="xsmall" truncate>
									{intl.formatMessage(messages.open_radix_dashboard)}
								</Text>
							</Box>
						</DropdownMenuItem>
						{isWallet && (
							<DropdownMenuItem
								onSelect={() => {
									window.open(z3usExplorerUrl, '_blank', 'noreferrer')
								}}
							>
								<DropdownMenuLeftSlot>
									<Z3usIcon />
								</DropdownMenuLeftSlot>
								<Box display="flex" marginLeft="small">
									<Text size="xsmall" truncate>
										{intl.formatMessage(messages.open_z3us)}
									</Text>
								</Box>
							</DropdownMenuItem>
						)}
					</DropdownMenuContent>
				</DropdownMenuPortal>
			</DropdownMenu>
		</Box>
	)
}
