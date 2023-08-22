import React from 'react'

import { Box } from 'ui/src/components/box'
import { WriteNoteIcon } from 'ui/src/components/icons'
import * as plainButtonStyles from 'ui/src/components/styles/plain-button-styles.css'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'

interface IProps {
	isVisible: boolean
	onClick: () => void
}

export const ToggleMessageButton: React.FC<IProps> = props => {
	const { isVisible, onClick } = props

	return (
		<Box
			component="button"
			type="button"
			className={plainButtonStyles.plainButtonHoverWrapper}
			onClick={onClick}
			display="flex"
			alignItems="center"
		>
			<Box component="span" display="flex" alignItems="center" marginRight="xxsmall">
				<WriteNoteIcon />
			</Box>
			<Text inheritColor component="span" size="small" underline="always" truncate>
				{isVisible ? (
					<Translation capitalizeFirstLetter text="transfer.group.hideMessage" />
				) : (
					<Translation capitalizeFirstLetter text="transfer.group.addMessage" />
				)}
			</Text>
		</Box>
	)
}
