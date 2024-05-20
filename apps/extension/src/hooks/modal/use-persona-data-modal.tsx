import type { PersonaDataRequestItem, PersonaDataRequestResponseItem } from '@radixdlt/radix-dapp-toolkit'
import { lazy } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { useModals } from 'ui/src/hooks/use-modals'
import { generateId } from 'ui/src/utils/rand'

const Modal = lazy(() => import('@src/components/modals/persona-data-modal'))

const messages = defineMessages({
	rejected: {
		id: 'vIvaHq',
		defaultMessage: 'Persona data declined',
	},
})

export const usePersonaDataModal = () => {
	const intl = useIntl()
	const { addModal, removeModal } = useModals()

	const getPersonaData = (identityAddress: string, request?: PersonaDataRequestItem) =>
		new Promise<PersonaDataRequestResponseItem>((resolve, reject) => {
			if (!request) {
				resolve(undefined)
				return
			}

			const id = generateId()

			const handleConfirm = (response: PersonaDataRequestResponseItem) => {
				resolve(response)
				removeModal(id)
			}

			const handleCancel = () => {
				reject(intl.formatMessage(messages.rejected))
				removeModal(id)
			}

			addModal(
				id,
				<Modal
					key={id}
					identityAddress={identityAddress}
					request={request}
					onConfirm={handleConfirm}
					onCancel={handleCancel}
				/>,
			)
		})

	return getPersonaData
}
