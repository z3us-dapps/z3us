import type { ReactNode } from 'react'
import { lazy } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { useModals } from 'ui/src/hooks/use-modals'
import { generateId } from 'ui/src/utils/generate-id'

const Modal = lazy(() => import('@src/components/modals/sign-modal'))

const messages = defineMessages({
	rejected: {
		id: '5qaD7s',
		defaultMessage: 'Rejected',
	},
})

export const usePasswordModal = () => {
	const intl = useIntl()
	const { addModal, removeModal } = useModals()

	const confirm = (content: ReactNode, buttonTitle?: string) =>
		new Promise<string>((resolve, reject) => {
			const id = generateId()
			const handleConfirm = (password: string) => {
				resolve(password)
				removeModal(id)
			}
			const handleCancel = () => {
				reject(intl.formatMessage(messages.rejected))
				removeModal(id)
			}
			addModal(
				id,
				<Modal content={content} buttonTitle={buttonTitle} onConfirm={handleConfirm} onCancel={handleCancel} />,
			)
		})

	return confirm
}
