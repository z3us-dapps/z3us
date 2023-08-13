import React from 'react'

import { Box } from 'ui/src/components/box'
import { Checkbox } from 'ui/src/components/checkbox'
import { type FormElement, Input, type TStyleVariant } from 'ui/src/components/input'
import { ShowHidePanel } from 'ui/src/components/show-hide-panel'
import { Text } from 'ui/src/components/typography'

import * as styles from './transfer-message.css'

interface ITransferMessageProps {
	isVisible: boolean
	message: string
	isEncrypted: boolean
	onUpdateIsMessageEncrypted: (isEncrypted: boolean) => void
	onUpdateMessage: (message: string) => void
	styleVariant?: TStyleVariant
	isError?: boolean
}

export const TransferMessage: React.FC<ITransferMessageProps> = props => {
	const {
		isVisible,
		message,
		isEncrypted,
		styleVariant = 'secondary',
		isError = false,
		onUpdateMessage,
		onUpdateIsMessageEncrypted,
	} = props

	const handleUpdateMessage = (event: React.ChangeEvent<FormElement>) => {
		onUpdateMessage(event.currentTarget.value)
	}

	const handleUpdateEncryptedMessage = (checked: boolean) => {
		onUpdateIsMessageEncrypted(checked)
	}

	return (
		<ShowHidePanel isChildrenVisible={isVisible}>
			<Box display="flex" flexDirection="column" gap="small">
				<Box paddingTop="large">
					<Box display="flex">
						<Box display="flex" alignItems="center" gap="small" width="full">
							<Box flexGrow={1}>
								<Text size="medium" truncate>
									Enter transaction message (10/180)
								</Text>
							</Box>
							<Text size="medium" truncate>
								Encrypt
							</Text>
							<Checkbox
								checked={isEncrypted}
								onCheckedChange={handleUpdateEncryptedMessage}
								styleVariant={styleVariant}
							/>
						</Box>
					</Box>
				</Box>
				<Input
					className={styles.transferUiTextAreaMessage}
					elementType="textarea"
					sizeVariant="large"
					placeholder="Enter message"
					styleVariant={isError ? 'secondary-error' : 'secondary'}
					value={message}
					onChange={handleUpdateMessage}
				/>
			</Box>
		</ShowHidePanel>
	)
}
