import { lazy } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { useModals } from 'ui/src/hooks/use-modals'
import { generateId } from 'ui/src/utils/rand'

import type { IProps } from '@src/components/modals/sign-modal'

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

	const confirm = (props: Omit<IProps, 'onConfirm' | 'onCancel'>) =>
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
			addModal(id, <Modal {...props} key={id} onConfirm={handleConfirm} onCancel={handleCancel} />)
		})

	return confirm
}
