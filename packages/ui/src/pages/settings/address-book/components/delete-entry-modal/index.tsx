import { t } from 'i18next'
import React from 'react'
import { toast } from 'sonner'

import { Box } from 'ui/src/components/box'
import { DialogAlert } from 'ui/src/components/dialog-alert'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

interface IProps {
	address: string
	onClose: () => void
}

const DeleteAddressBookEntryModal: React.FC<IProps> = ({ address, onClose }) => {
	const networkId = useNetworkId()

	const { handleRemoveAddress } = useNoneSharedStore(state => ({
		handleRemoveAddress: state.removeAddressBookEntryAction,
	}))

	const handleConfirm = () => {
		handleRemoveAddress(networkId, address)

		toast(t('settings.address_book.delete_modal.success_message'), {})
		onClose()
	}

	return (
		<DialogAlert
			open={!!address}
			title={<Translation capitalizeFirstLetter text="settings.address_book.delete_modal.delete_alert_title" />}
			description={
				<Box component="span">
					<Text truncate>
						<Translation capitalizeFirstLetter text="settings.address_book.delete_modal.delete_alert_description" />{' '}
						{address}
					</Text>
					?
				</Box>
			}
			confirmButtonText={t('settings.address_book.delete_modal.confirm_button_text')}
			onCancel={onClose}
			onConfirm={handleConfirm}
		/>
	)
}

export default DeleteAddressBookEntryModal
