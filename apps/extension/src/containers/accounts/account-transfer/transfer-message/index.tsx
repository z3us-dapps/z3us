import React from 'react'

import { Box } from 'ui/src/components-v2/box'
import { Checkbox } from 'ui/src/components-v2/checkbox'
import { type FormElement, Input, type TStyleVariant } from 'ui/src/components-v2/input'
import { Text } from 'ui/src/components-v2/typography'

import { ShowHidePanel } from '@src/components/show-hide-panel'

import * as styles from './transfer-message.css'

interface ITransferMessageRequiredProps {
	isVisible: boolean
	message: string
	isEncrypted: boolean
	onUpdateIsMessageEncrypted: (isEncrypted: boolean) => void
	onUpdateMessage: (message: string) => void
}

interface ITransferMessageOptionalProps {
	styleVariant?: TStyleVariant
	isError?: boolean
}

interface ITransferMessageProps extends ITransferMessageRequiredProps, ITransferMessageOptionalProps {}

const defaultProps: ITransferMessageOptionalProps = {
	styleVariant: 'secondary',
	isError: false
}

export const TransferMessage: React.FC<ITransferMessageProps> = props => {
	const { isVisible, message, isEncrypted, styleVariant, isError, onUpdateMessage, onUpdateIsMessageEncrypted } = props

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

TransferMessage.defaultProps = defaultProps
