import { useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { Dialog } from 'ui/src/components/dialog'
import { Text } from 'ui/src/components/typography'

import CustomizeGuaranteeForm from '@src/components/forms/customize-guarantee-form'
import type { Change, Guarantee, Summary } from '@src/types/transaction'

import * as styles from './styles.css'

const messages = defineMessages({
	modal_title: {
		defaultMessage: 'Customize guarantee',
		id: 'UoIf5k',
	},
	modal_sub_title: {
		defaultMessage: 'Protect yourself by setting guaranteed minimums for estimated deposits',
		id: 'fKIHr5',
	},
})

export interface IProps {
	summary: Summary
	change: Change
	onConfirm: (response: Guarantee) => void
	onCancel: () => void
}

const CustomizeGuaranteeModal: React.FC<IProps> = ({ summary, change, onConfirm, onCancel }) => {
	const intl = useIntl()

	const [isOpen, setIsOpen] = useState<boolean>(true)

	const handleSubmit = async (values: Guarantee) => {
		onConfirm(values)
		setIsOpen(false)
	}

	const handleClose = () => {
		onCancel()
		setIsOpen(false)
	}

	return (
		<Dialog open={isOpen} onClose={handleClose}>
			<Box className={styles.modalContentWrapper}>
				<Box className={styles.modalContentTitleTextWrapper}>
					<Text color="strong" size="large" weight="strong">
						{intl.formatMessage(messages.modal_title)}
					</Text>
					<Text size="small">{intl.formatMessage(messages.modal_sub_title)}</Text>
				</Box>
				<CustomizeGuaranteeForm summary={summary} change={change} onSubmit={handleSubmit} />
			</Box>
		</Dialog>
	)
}

export default CustomizeGuaranteeModal
