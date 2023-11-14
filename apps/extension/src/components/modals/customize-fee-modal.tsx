import type { PersonaDataRequestItem, PersonaDataRequestResponseItem } from '@radixdlt/radix-dapp-toolkit'
import { useMemo, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { z } from 'zod'

import { Box } from 'ui/src/components/box'
import { Dialog } from 'ui/src/components/dialog'
import CustomizeFeeForm from 'ui/src/components/form/customize-fee-form'
import { Text } from 'ui/src/components/typography'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

import * as styles from './styles.css'

const messages = defineMessages({
	customize_fee_modal_title: {
		defaultMessage: 'Customize fees',
		id: '/grnpY',
	},
	customize_fee_modal_sub_title: {
		defaultMessage:
			'Choose what account to pay the transaction fee from, or add a "tip" to speed up your transaction if necessary. ',
		id: 'PktDQn',
	},
})

export interface IProps {
	identityAddress: string
	request: PersonaDataRequestItem
	onConfirm: (response: PersonaDataRequestResponseItem) => void
	onCancel: () => void
}

const SelectPersonaModal: React.FC<IProps> = ({ identityAddress, request, onConfirm, onCancel }) => {
	const intl = useIntl()
	const networkId = useNetworkId()
	// const { personaIndexes, updatePersona } = useNoneSharedStore(state => ({
	// 	personaIndexes: state.personaIndexes[networkId] || {},
	// 	updatePersona: state.addPersonaAction,
	// }))

	const [isOpen, setIsOpen] = useState<boolean>(true)

	const handleSubmit = async values => {}

	return (
		<Dialog open={isOpen} onClose={onCancel}>
			<Box className={styles.modalContentWrapper}>
				<Box className={styles.modalContentTitleTextWrapper}>
					<Text color="strong" size="large" weight="strong">
						{intl.formatMessage(messages.customize_fee_modal_title)}
					</Text>
					<Text size="small">{intl.formatMessage(messages.customize_fee_modal_sub_title)}</Text>
				</Box>
				<CustomizeFeeForm
					// identityAddress={identityAddress}
					// customValidationSchema={validationSchema}
					onSubmit={handleSubmit}
				/>
			</Box>
		</Dialog>
	)
}

export default SelectPersonaModal
