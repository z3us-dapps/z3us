import { t } from 'i18next'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { Checkbox } from 'ui/src/components/checkbox'
import { type FormElement, Input } from 'ui/src/components/input'
import { ShowHidePanel } from 'ui/src/components/show-hide-panel'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'

import * as styles from './styles.css'

interface ITransferMessageProps {
	isVisible: boolean
	message: string
	isEncrypted: boolean
	onUpdateIsMessageEncrypted: (isEncrypted: boolean) => void
	onUpdateMessage: (message: string) => void
	isError?: boolean
}

export const TransferMessage: React.FC<ITransferMessageProps> = props => {
	const { isVisible, message, isEncrypted, isError = false, onUpdateMessage, onUpdateIsMessageEncrypted } = props

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
									<Translation capitalizeFirstLetter text="transfer.group.enterMessage" /> (10/180)
								</Text>
							</Box>
							<Text size="medium" truncate>
								<Translation capitalizeFirstLetter text="transfer.group.encrypt" />
							</Text>
							<Checkbox checked={isEncrypted} onCheckedChange={handleUpdateEncryptedMessage} styleVariant="primary" />
						</Box>
					</Box>
				</Box>
				<Input
					className={styles.transferUiTextAreaMessage}
					elementType="textarea"
					sizeVariant="large"
					placeholder={t('transfer.group.messagePlaceholder')}
					styleVariant={isError ? 'secondary-error' : 'primary'}
					value={message}
					onChange={handleUpdateMessage}
				/>
			</Box>
		</ShowHidePanel>
	)
}
