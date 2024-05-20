import { lazy } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { useModals } from 'ui/src/hooks/use-modals'
import { generateId } from 'ui/src/utils/rand'

import type { Values } from '@src/components/forms/customize-fee-form'
import type { TransactionSettings } from '@src/types/transaction'

const messages = defineMessages({
	rejected: {
		id: '5qaD7s',
		defaultMessage: 'Rejected',
	},
})

const Modal = lazy(() => import('@src/components/modals/customize-fee-modal'))

export const useCustomizeFeeModal = () => {
	const intl = useIntl()
	const { addModal, removeModal } = useModals()

	const confirm = (settings: TransactionSettings) =>
		new Promise<TransactionSettings>((resolve, reject) => {
			const id = generateId()
			const handleConfirm = (newSettings: Values) => {
				resolve({
					...settings,
					feePayer: newSettings.feePayer,
					tipPercentage: Number.parseFloat(newSettings.tipPercentage) || 0,
					padding: Number.parseFloat(newSettings.padding) || 0,
				})
				removeModal(id)
			}
			const handleCancel = () => {
				reject(intl.formatMessage(messages.rejected))
				removeModal(id)
			}
			addModal(id, <Modal key={id} settings={settings} onConfirm={handleConfirm} onCancel={handleCancel} />)
		})

	return confirm
}
