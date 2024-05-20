import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { toast } from 'sonner'

import { Box } from 'ui/src/components/box'
import { DialogAlert } from 'ui/src/components/dialog-alert'
import { Text } from 'ui/src/components/typography'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { getShortAddress } from 'ui/src/utils/string'

interface IProps {
	identityAddress: string
	onClose: () => void
}

const messages = defineMessages({
	title: {
		id: 'IipetU',
		defaultMessage: 'Delete persona',
	},
	description: {
		id: 'sKyGsm',
		defaultMessage: 'Are you sure you want to delete {identityAddress} from wallet?',
	},
	button_text: {
		id: 'K3r6DQ',
		defaultMessage: 'Delete',
	},
	success_message: {
		id: 'BiqE0f',
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

		toast.success(intl.formatMessage(messages.success_message), {})
		onClose()
	}

	return (
		<DialogAlert
			open={!!identityAddress}
			title={intl.formatMessage(messages.title)}
			description={
				<Box component="span">
					<Text truncate>
						{intl.formatMessage(messages.description, { identityAddress: getShortAddress(identityAddress) })}
					</Text>
				</Box>
			}
			confirmButtonText={intl.formatMessage(messages.button_text)}
			onCancel={onClose}
			onConfirm={handleConfirm}
		/>
	)
}

export default DeletePersonaModal
