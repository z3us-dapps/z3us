import React from 'react'

import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'
import { Checkbox } from 'ui/src/components-v2/checkbox'
import { Input } from 'ui/src/components-v2/input'

import { ShowHidePanel } from '@src/components/show-hide-panel'

import * as styles from './transfer-message.css'

interface ITransferMessageRequiredProps {
	isVisible: boolean
}

interface ITransferMessageOptionalProps {}

interface ITransferMessageProps extends ITransferMessageRequiredProps, ITransferMessageOptionalProps {}

const defaultProps: ITransferMessageOptionalProps = {}

export const TransferMessage: React.FC<ITransferMessageProps> = props => {
	const { isVisible } = props

	return (
		<ShowHidePanel isChildrenVisible={isVisible}>
			<Box display="flex" flexDirection="column" gap="small">
				<Box paddingTop="large">
					<Box display="flex">
						<Box display="flex" alignItems="center" gap="small" width="full">
							<Box flexGrow={1}>
								<Text size="medium" truncate>
									Enter transaction message
								</Text>
							</Box>
							<Text size="medium" truncate>
								Encrypt
							</Text>
							<Checkbox />
						</Box>
					</Box>
				</Box>
				<Input
					className={styles.transferUiTextAreaMessage}
					elementType="textarea"
					sizeVariant="large"
					styleVariant="secondary"
					value={undefined}
					placeholder="Enter message"
				// onChange={handleOnChange}
				/>
			</Box>
		</ShowHidePanel>
	)
}

TransferMessage.defaultProps = defaultProps
