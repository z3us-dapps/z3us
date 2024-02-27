import { lazy } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { useModals } from 'ui/src/hooks/use-modals'
import { generateId } from 'ui/src/utils/generate-id'

import type { Change, Guarantee, Summary } from '@src/types/transaction'

const messages = defineMessages({
	rejected: {
		id: '5qaD7s',
		defaultMessage: 'Rejected',
	},
})

const Modal = lazy(() => import('@src/components/modals/customize-guarantee-modal'))

export const useCustomizeGuaranteesFeeModal = () => {
	const intl = useIntl()
	const { addModal, removeModal } = useModals()

	const confirm = (summary: Summary, change: Change) =>
		new Promise<Summary>((resolve, reject) => {
			const id = generateId()
			const handleConfirm = (guarantee: Guarantee) => {
				const guarantees = [...summary.guarantees]
				if (guarantee.amount > 0) {
					const idx = guarantees.findIndex(
						({ index, resourceAddress }) => resourceAddress === change.resource && index === change.index - 1,
					)
					if (idx > -1) {
						guarantees[idx] = guarantee
					} else {
						guarantees.push(guarantee)
					}
				}
				resolve({ ...summary, guarantees: guarantees.sort((a, b) => a.index - b.index) })
				removeModal(id)
			}
			const handleCancel = () => {
				reject(intl.formatMessage(messages.rejected))
				removeModal(id)
			}
			addModal(
				id,
				<Modal key={id} summary={summary} change={change} onConfirm={handleConfirm} onCancel={handleCancel} />,
			)
		})

	return confirm
}
