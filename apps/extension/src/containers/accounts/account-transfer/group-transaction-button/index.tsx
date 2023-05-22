/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

import { Box } from 'ui/src/components-v2/box'
import { Button } from 'ui/src/components-v2/button'
import { ToolTip } from 'ui/src/components-v2/tool-tip'
import { PlusIcon } from 'ui/src/components/icons'

interface IGroupTransactionButtonRequiredProps {
	isGroupUiVisible: boolean
	onGroupTransaction: () => void
	onAddGroup: () => void
}

interface IGroupTransactionButtonOptionalProps {}

interface IGroupTransactionButtonProps
	extends IGroupTransactionButtonRequiredProps,
		IGroupTransactionButtonOptionalProps {}

const defaultProps: IGroupTransactionButtonOptionalProps = {}

export const GroupTransactionButton: React.FC<IGroupTransactionButtonProps> = props => {
	const { isGroupUiVisible, onAddGroup, onGroupTransaction } = props

	const handleClick = () => {
		if (isGroupUiVisible) {
			onAddGroup()
		}

		onGroupTransaction()
	}

	return (
		<ToolTip
			sideOffset={5}
			side="top"
			theme="backgroundPrimary"
			message={
				isGroupUiVisible ? (
					<span>Add another address to send tokens</span>
				) : (
					<>
						<span>Group transaction to send multiple</span>
						<br />
						<span>tokens to the same address.</span>
					</>
				)
			}
		>
			<Button
				styleVariant="tertiary"
				sizeVariant="xlarge"
				fullWidth
				onClick={handleClick}
				leftIcon={
					<Box marginLeft="small">
						<PlusIcon />
					</Box>
				}
			>
				{isGroupUiVisible ? 'Add group' : 'Group transaction'}
			</Button>
		</ToolTip>
	)
}

GroupTransactionButton.defaultProps = defaultProps
