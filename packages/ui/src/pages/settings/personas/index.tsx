import React, { useEffect } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'
import { useImmer } from 'use-immer'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { PlusIcon } from 'ui/src/components/icons'
import { usePersonaIndexes } from 'ui/src/hooks/use-persona-indexes'
import { useSharedStore } from 'ui/src/hooks/use-store'
import type { Persona } from 'ui/src/store/types'
import { KeystoreType } from 'ui/src/store/types'

import { SettingsTitle } from '../components/settings-title'
import { SettingsWrapper } from '../components/settings-wrapper'
import DeletePersonaModal from './components/delete-persona-modal'
import { Table } from './components/table'
import UpsertPersonaModal from './components/upsert-persona-modal'

const messages = defineMessages({
	title: {
		id: '48INch',
		defaultMessage: 'Personas',
	},
	subtitle: {
		id: 'i+vOQd',
		defaultMessage: `Manage your Radix network identities`,
	},
	new_persona: {
		id: 'JsdfgN',
		defaultMessage: 'New persona',
	},
})

export interface IState {
	personas: Persona[]
	deleting: string | undefined
	editing: string | undefined
}

const Personas: React.FC = () => {
	const intl = useIntl()
	const navigate = useNavigate()
	const personaIndexes = usePersonaIndexes()

	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))

	const [state, setState] = useImmer<IState>({
		personas: [],
		deleting: undefined,
		editing: undefined,
	})

	useEffect(() => {
		if (keystore?.type === KeystoreType.RADIX_WALLET) {
			navigate('/')
		}
	}, [keystore])

	useEffect(() => {
		setState(draft => {
			draft.personas = Object.values(personaIndexes)
		})
	}, [personaIndexes])

	const handleDeleteAddress = (address: string) => {
		setState(draft => {
			draft.deleting = address
		})
	}

	const handleAddEditAddress = (address: string = '') => {
		setState(draft => {
			draft.editing = address
		})
	}

	const handleCloseEditAddressDialog = () => {
		setState(draft => {
			draft.editing = undefined
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
					<Box paddingBottom="medium">
						<Button styleVariant="primary" leftIcon={<PlusIcon />} onClick={() => handleAddEditAddress()}>
							{intl.formatMessage(messages.new_persona)}
						</Button>
					</Box>
					<Table data={state.personas} onEdit={handleAddEditAddress} onDelete={handleDeleteAddress} />
				</Box>
			</SettingsWrapper>

			<DeletePersonaModal identityAddress={state.deleting} onClose={handleCloseDeleteAddress} />
			<UpsertPersonaModal identityAddress={state.editing} onClose={handleCloseEditAddressDialog} />
		</>
	)
}

export default Personas
