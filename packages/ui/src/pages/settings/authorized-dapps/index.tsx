import React, { useEffect } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'
import { useImmer } from 'use-immer'

import { Box } from 'ui/src/components/box'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore, useSharedStore } from 'ui/src/hooks/use-store'
import { KeystoreType } from 'ui/src/store/types'

import { SettingsTitle } from '../components/settings-title'
import { SettingsWrapper } from '../components/settings-wrapper'
import DeleteDappModal from './components/delete-dapp-modal'
import { Table } from './components/table'

const messages = defineMessages({
	title: {
		id: 'xhTCHJ',
		defaultMessage: 'Authorized dApps',
	},
	subtitle: {
		id: 'JjhY5a',
		defaultMessage: `This are the dApps that you have logged into.`,
	},
})

export interface IState {
	deleting: string | undefined
}

const AuthorizedDapps: React.FC = () => {
	const intl = useIntl()
	const navigate = useNavigate()
	const networkId = useNetworkId()

	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))
	const { approvedDapps } = useNoneSharedStore(state => ({
		approvedDapps: state.approvedDapps[networkId] || {},
	}))

	const [state, setState] = useImmer<IState>({
		deleting: undefined,
	})

	useEffect(() => {
		if (keystore?.type !== KeystoreType.LOCAL && keystore?.type !== KeystoreType.HARDWARE) {
			navigate('/')
		}
	}, [keystore])

	const handleDeleteAddress = (address: string) => {
		setState(draft => {
			draft.deleting = address
		})
	}

	const handleCloseDeleteAddress = () => {
		setState(draft => {
			draft.deleting = undefined
		})
	}

	return (
		<>
			<SettingsWrapper>
				<SettingsTitle title={intl.formatMessage(messages.title)} subTitle={intl.formatMessage(messages.subtitle)} />
				<Box display="flex" flexDirection="column" gap="small">
					<Table data={approvedDapps} onDelete={handleDeleteAddress} />
				</Box>
			</SettingsWrapper>
			<DeleteDappModal address={state.deleting} onClose={handleCloseDeleteAddress} />
		</>
	)
}

export default AuthorizedDapps
