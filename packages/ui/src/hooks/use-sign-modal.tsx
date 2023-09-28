import { lazy } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { useModals } from 'ui/src/hooks/use-modals'
import { generateId } from 'ui/src/utils/generate-id'

const SignModal = lazy(() => import('ui/src/components/modals/sign-modal'))

const messages = defineMessages({
	rejected: {
		id: 'hooks.modals.sign_modal.reject',
		defaultMessage: 'Rejected',
	},
})

export const useSignModal = () => {
	const intl = useIntl()
	const { addModal, removeModal } = useModals()

	const confirm = (manifest: string) => {
		return new Promise<string>((resolve, reject) => {
			const id = generateId()
			const handleConfirm = (password: string) => {
				resolve(password)
				removeModal(id)
			}
			const handleCancel = () => {
				reject(intl.formatMessage(messages.rejected))
				removeModal(id)
			}
			addModal(id, <SignModal key={id} manifest={manifest} onConfirm={handleConfirm} onCancel={handleCancel} />)
		})
	}

	return { confirm }
}
