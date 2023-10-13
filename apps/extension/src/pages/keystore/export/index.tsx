import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { useSharedStore } from 'ui/src/hooks/use-store'
import { KeystoreType } from 'ui/src/store/types'

import ExportForm from './components/export-form'

export const Export: React.FC = () => {
	const navigate = useNavigate()
	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))

	const [secret, setSecret] = useState<string | undefined>()

	useEffect(() => {
		if (keystore?.type !== KeystoreType.LOCAL) {
			navigate('/settings')
		}
	}, [keystore])

	return (
		<Box padding="xxxlarge">
			{!secret && <ExportForm onUnlock={setSecret} />}
			{secret && <Box>{secret}</Box>}
		</Box>
	)
}

export default Export
