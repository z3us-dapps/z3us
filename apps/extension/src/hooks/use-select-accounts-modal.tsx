import { lazy } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { useModals } from 'ui/src/hooks/use-modals'
import { generateId } from 'ui/src/utils/generate-id'

const Modal = lazy(() => import('@src/components/modals/select-accounts-modal'))

const messages = defineMessages({
	rejected: {
		id: 'hooks.modals.select_accounts.reject',
		defaultMessage: 'Accounts select declined',
	},
})

export const useSelectAccountsModal = () => {
	const intl = useIntl()
	const { addModal, removeModal } = useModals()

	const selectAccounts = (required: number, exactly: boolean) =>
		new Promise<number[]>((resolve, reject) => {
			const id = generateId()
			const handleConfirm = (indexes: number[]) => {
				resolve(indexes)
				removeModal(id)
			}
			const handleCancel = () => {
				reject(intl.formatMessage(messages.rejected))
				removeModal(id)
			}
			addModal(
				id,
				<Modal key={id} required={required} exactly={exactly} onConfirm={handleConfirm} onCancel={handleCancel} />,
			)
		})

	return selectAccounts
}
