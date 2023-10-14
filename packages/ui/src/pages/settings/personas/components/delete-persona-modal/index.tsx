import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { toast } from 'sonner'

import { Box } from 'ui/src/components/box'
import { DialogAlert } from 'ui/src/components/dialog-alert'
import { Text } from 'ui/src/components/typography'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

interface IProps {
	identityAddress: string
	onClose: () => void
}

const messages = defineMessages({
	title: {
		id: 'personas.delete_modal.title',
		defaultMessage: 'Are you sure?',
	},
	description: {
		id: 'personas.delete_modal.description',
		defaultMessage: 'Are you sure you want to delete {identityAddress} from wallet ?',
	},
	button_text: {
		id: 'personas.delete_modal.button_text',
		defaultMessage: 'Delete',
	},
	success_message: {
		id: 'personas.delete_modal.success_message',
		defaultMessage: 'Successfully deleted persona',
	},
})

const DeletePersonaModal: React.FC<IProps> = ({ identityAddress, onClose }) => {
	const intl = useIntl()
	const networkId = useNetworkId()

	const { remove } = useNoneSharedStore(state => ({
		remove: state.removePersonaAction,
	}))

	const handleConfirm = () => {
		remove(networkId, identityAddress)

		toast(intl.formatMessage(messages.success_message), {})
		onClose()
	}

	return (
		<DialogAlert
			open={!!identityAddress}
			title={intl.formatMessage(messages.title)}
			description={
				<Box component="span">
					<Text truncate>{intl.formatMessage(messages.description, { identityAddress })}</Text>?
				</Box>
			}
			confirmButtonText={intl.formatMessage(messages.button_text)}
			onCancel={onClose}
			onConfirm={handleConfirm}
		/>
	)
}

export default DeletePersonaModal
