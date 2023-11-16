import React, { type PropsWithChildren } from 'react'

import { ConfirmContext } from 'ui/src/context/confirm'

import { usePasswordModal } from '@src/hooks/modal/use-password-modal'

export const ConfirmProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const confirm = usePasswordModal()
	return <ConfirmContext.Provider value={confirm}>{children}</ConfirmContext.Provider>
}
