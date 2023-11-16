import { useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { Dialog } from 'ui/src/components/dialog'
import { Text } from 'ui/src/components/typography'

import CustomizeFeeForm from '@src/components/forms/customize-fee-form'
import type { TransactionSettings } from '@src/types/transaction'

import * as styles from './styles.css'

const messages = defineMessages({
	customize_fee_modal_title: {
		defaultMessage: 'Customize fees',
		id: '/grnpY',
	},
	customize_fee_modal_sub_title: {
		defaultMessage:
			'Choose what account to pay the transaction fee from, or add a "tip" to speed up your transaction if necessary. ',
		id: 'PktDQn',
	},
})

export interface IProps {
	settings: TransactionSettings
	onConfirm: (response: TransactionSettings) => void
	onCancel: () => void
}

const CustomizeFeeModal: React.FC<IProps> = ({ settings, onConfirm, onCancel }) => {
	const intl = useIntl()

	const [isOpen, setIsOpen] = useState<boolean>(true)

	const handleSubmit = async (values: TransactionSettings) => {
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
						{intl.formatMessage(messages.customize_fee_modal_title)}
					</Text>
					<Text size="small">{intl.formatMessage(messages.customize_fee_modal_sub_title)}</Text>
				</Box>
				<CustomizeFeeForm settings={settings} onSubmit={handleSubmit} />
			</Box>
		</Dialog>
	)
}

export default CustomizeFeeModal
