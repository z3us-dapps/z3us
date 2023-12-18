import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { toast } from 'sonner'

import { Box } from 'ui/src/components/box'
import { DialogAlert } from 'ui/src/components/dialog-alert'
import { Text } from 'ui/src/components/typography'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { getShortAddress } from 'ui/src/utils/string-utils'

interface IProps {
	address: string
	onClose: () => void
}

const messages = defineMessages({
	title: {
		id: '74xz0X',
		defaultMessage: 'Delete address',
	},
	description: {
		id: '2tBfaP',
		defaultMessage: 'Are you sure you want to delete {address} from address book?',
	},
	button_text: {
		id: 'K3r6DQ',
		defaultMessage: 'Delete',
	},
	success_message: {
		id: 'qNNICy',
		defaultMessage: 'Successfully deleted entry',
	},
})

const DeleteAddressBookEntryModal: React.FC<IProps> = ({ address, onClose }) => {
	const intl = useIntl()
	const networkId = useNetworkId()

	const { handleRemoveAddress } = useNoneSharedStore(state => ({
		handleRemoveAddress: state.removeAddressBookEntryAction,
	}))

	const handleConfirm = () => {
		handleRemoveAddress(networkId, address)

		toast.success(intl.formatMessage(messages.success_message), {})
		onClose()
	}

	return (
		<DialogAlert
			open={!!address}
			title={intl.formatMessage(messages.title)}
			description={
				<Box component="span">
					<Text truncate>{intl.formatMessage(messages.description, { address: getShortAddress(address) })}</Text>
				</Box>
			}
			confirmButtonText={intl.formatMessage(messages.button_text)}
			onCancel={onClose}
			onConfirm={handleConfirm}
		/>
	)
}

export default DeleteAddressBookEntryModal
