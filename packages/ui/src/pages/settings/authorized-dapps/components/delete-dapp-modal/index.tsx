import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { toast } from 'sonner'

import { Box } from 'ui/src/components/box'
import { DialogAlert } from 'ui/src/components/dialog-alert'
import { Text } from 'ui/src/components/typography'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { getStringMetadata } from 'ui/src/services/metadata'

interface IProps {
	address: string
	onClose: () => void
}

const messages = defineMessages({
	title: {
		id: 'authorized_dapps.delete_modal.title',
		defaultMessage: 'Are you sure?',
	},
	description: {
		id: 'authorized_dapps.delete_modal.description',
		defaultMessage: 'Are you sure you want to revoke {dappName} access ?',
	},
	button_text: {
		id: 'authorized_dapps.delete_modal.button_text',
		defaultMessage: 'Revoke',
	},
	success_message: {
		id: 'authorized_dapps.delete_modal.success_message',
		defaultMessage: 'Successfully revoked access',
	},
})

const DeleteDappModal: React.FC<IProps> = ({ address, onClose }) => {
	const intl = useIntl()
	const networkId = useNetworkId()
	const { data: dappData } = useEntityDetails(address)
	const dappName = getStringMetadata('name', dappData?.metadata?.items)

	const { remove } = useNoneSharedStore(state => ({
		remove: state.forgetDappAction,
	}))

	const handleConfirm = () => {
		remove(networkId, address)

		toast(intl.formatMessage(messages.success_message), {})
		onClose()
	}

	return (
		<DialogAlert
			open={!!address}
			title={intl.formatMessage(messages.title)}
			description={
				<Box component="span">
					<Text truncate>{intl.formatMessage(messages.description, { dappName })}</Text>?
				</Box>
			}
			confirmButtonText={intl.formatMessage(messages.button_text)}
			onCancel={onClose}
			onConfirm={handleConfirm}
		/>
	)
}

export default DeleteDappModal
