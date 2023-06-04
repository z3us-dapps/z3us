/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

import { Box } from 'ui/src/components-v2/box'
import { Button } from 'ui/src/components-v2/button'
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'ui/src/components-v2/popover'
import { ToolTip } from 'ui/src/components-v2/tool-tip'
import { Text } from 'ui/src/components-v2/typography'
import { InformationIcon, PlusIcon } from 'ui/src/components/icons'

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
		<Box display="flex" width="full" flexDirection="column">
			<Box display="flex" alignItems="center" paddingBottom="small" gap="small">
				<Text color="strong" weight="regular">
					Group transaction
				</Text>
				<PopoverRoot>
					<PopoverTrigger asChild>
						<Box>
							<Button styleVariant="ghost" sizeVariant="xsmall" iconOnly aria-label="TODO">
								<InformationIcon />
							</Button>
						</Box>
					</PopoverTrigger>
					<PopoverPortal>
						<PopoverContent align="start" sideOffset={2} style={{ maxWidth: '300px' }}>
							<Box padding="medium" display="flex" flexDirection="column" gap="small">
								<Text color="strong">Group transaction</Text>
								<Text>
									If you wish to send multiple tokens to an address, or send tokens to multiple addresses
									<br />
									<br />
									Sed ac tempor ex arcu suscipit vel nulla convallis suspendisse mi magna, vivamus aliquet pellentesque
									pellentesque facilisis amet et neque ligula aliquet, porttitor vestibulum tortor lectus iaculis lacus.
									Tempor consectetur dui in quisque faucibus hac morbi faucibus magnis posuere odio.
								</Text>
							</Box>
						</PopoverContent>
					</PopoverPortal>
				</PopoverRoot>
			</Box>
			<Box>
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
					Add group
				</Button>
			</Box>
		</Box>
	)
}

GroupTransactionButton.defaultProps = defaultProps

// return (
// 	<ToolTip
// 		sideOffset={5}
// 		side="top"
// 		theme="backgroundPrimary"
// 		message={
// 			isGroupUiVisible ? (
// 				<span>Add another address to send tokens</span>
// 			) : (
// 				<>
// 					<span>Group transaction to send multiple</span>
// 					<br />
// 					<span>tokens to the same address.</span>
// 				</>
// 			)
// 		}
// 	>
// 		<Button
// 			styleVariant="tertiary"
// 			sizeVariant="xlarge"
// 			fullWidth
// 			onClick={handleClick}
// 			leftIcon={
// 				<Box marginLeft="small">
// 					<PlusIcon />
// 				</Box>
// 			}
// 		>
// 			{isGroupUiVisible ? 'Add group' : 'Group transaction'}
// 		</Button>
// 	</ToolTip>
// )
