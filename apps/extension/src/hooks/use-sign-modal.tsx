import type { ReactNode} from 'react';
import { lazy } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { useModals } from 'ui/src/hooks/use-modals'
import { generateId } from 'ui/src/utils/generate-id'

const Modal = lazy(() => import('@src/components/modals/sign-modal'))

const messages = defineMessages({
	rejected: {
		id: 'hooks.modals.sign.reject',
		defaultMessage: 'Rejected',
	},
})

export const useSignModal = () => {
	const intl = useIntl()
	const { addModal, removeModal } = useModals()

	const confirm = (content: ReactNode) => new Promise<string>((resolve, reject) => {
			const id = generateId()
			const handleConfirm = (password: string) => {
				resolve(password)
				removeModal(id)
			}
			const handleCancel = () => {
				reject(intl.formatMessage(messages.rejected))
				removeModal(id)
			}
			addModal(id, <Modal key={id} content={content} onConfirm={handleConfirm} onCancel={handleCancel} />)
		})

	return confirm
}
