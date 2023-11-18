import { useEffect, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { Dialog } from 'ui/src/components/dialog'
import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import { Text } from 'ui/src/components/typography'

import * as styles from './styles.css'

const messages = defineMessages({
	confirm_with_ledger: {
		id: 'TunNXS',
		defaultMessage: 'Confirm with Ledger device',
	},
	confirm_with_ledger_sub_title: {
		id: '+pOWX4',
		defaultMessage: 'Follow the prompts in the open tab',
	},
	close: {
		id: '47FYwb',
		defaultMessage: 'Cancel',
	},
})

export interface IProps {
	load: () => Promise<void>
	onClose: () => void
}

const LedgerConfirmModal: React.FC<IProps> = ({ load, onClose }) => {
	const intl = useIntl()

	const [isOpen, setIsOpen] = useState<boolean>(true)

	useEffect(() => {
		load().finally(() => {
			onClose()
			setIsOpen(false)
		})
	}, [])

	return (
		<Dialog open={isOpen} onClose={onClose}>
			<Box className={styles.modalContentWrapper}>
				<Box className={styles.modalContentTitleTextWrapper}>
					<Text color="strong" size="large" weight="strong">
						{intl.formatMessage(messages.confirm_with_ledger)}
					</Text>
					<Text size="small">{intl.formatMessage(messages.confirm_with_ledger_sub_title)}</Text>
				</Box>
				<Box>
					<FallbackLoading />
				</Box>
			</Box>
		</Dialog>
	)
}

export default LedgerConfirmModal
