import { lazy } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { useModals } from 'ui/src/hooks/use-modals'
import { generateId } from 'ui/src/utils/generate-id'

const Modal = lazy(() => import('@src/components/modals/select-persona-modal'))

const messages = defineMessages({
	rejected: {
		id: 'gKZmaD',
		defaultMessage: 'Persona select declined',
	},
})

export const useSelectPersonaModal = () => {
	const intl = useIntl()
	const { addModal, removeModal } = useModals()

	const selectPersona = () =>
		new Promise<string>((resolve, reject) => {
			const id = generateId()
			const handleConfirm = (address: string) => {
				resolve(address)
				removeModal(id)
			}
			const handleCancel = () => {
				reject(intl.formatMessage(messages.rejected))
				removeModal(id)
			}
			addModal(id, <Modal onConfirm={handleConfirm} onCancel={handleCancel} />)
		})

	return selectPersona
}
