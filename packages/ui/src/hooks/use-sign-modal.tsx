import { lazy, useCallback, useEffect, useState } from 'react'

import { useModals } from 'ui/src/hooks/use-modals'
import { generateId } from 'ui/src/utils/generate-id'

const SignModal = lazy(() => import('ui/src/components/modals/sign-modal'))

export const useSignModal = () => {
	const { addModal, removeModal } = useModals()

	const [isOpen, toggleModal] = useState<boolean>(false)
	const [resolve, setResolve] = useState<(value: unknown) => void>()
	const [reject, setReject] = useState<(reason?: any) => void>()

	const handleConfirm = useCallback(resolve, [resolve])

	const handleCancel = useCallback(reject, [reject])

	const confirm = () => {
		toggleModal(true)
		return new Promise<string>((resolve, reject) => {
			setResolve(resolve)
			setReject(reject)
		})
	}

	useEffect(() => {
		const id = generateId()
		addModal(id, <SignModal isOpen={isOpen} onConfirm={handleConfirm} onCancel={handleCancel} />)
		return () => {
			removeModal(id)
		}
	}, [])

	return { confirm }
}
