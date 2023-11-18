import { lazy } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { useModals } from 'ui/src/hooks/use-modals'
import { generateId } from 'ui/src/utils/generate-id'

const Modal = lazy(() => import('@src/components/modals/ledger-confirm-modal'))

const messages = defineMessages({
	rejected: {
		id: '5qaD7s',
		defaultMessage: 'Rejected',
	},
})

export const useLedgerConfirmModal = () => {
	const intl = useIntl()
	const { addModal, removeModal } = useModals()

	const showModalAndWait = <T,>(cb: () => Promise<T>) =>
		new Promise<T>((resolve, reject) => {
			const id = generateId()

			const handleLoad = async () =>
				cb()
					.then(resolve)
					.catch(error => reject(error.message))
					.finally(() => removeModal(id))

			const handleCancel = () => {
				reject(intl.formatMessage(messages.rejected))
				removeModal(id)
			}

			addModal(id, <Modal key={id} onClose={handleCancel} load={handleLoad} />)
		})

	return showModalAndWait
}
