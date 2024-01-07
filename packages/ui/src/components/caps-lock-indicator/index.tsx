import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { TextUppercaseIcon } from 'ui/src/components/icons'
import { ToolTip } from 'ui/src/components/tool-tip'
import useKeyLock from 'ui/src/hooks/use-key-lock'

import * as styles from './styles.css'

const messages = defineMessages({
	caps_lock: {
		defaultMessage: 'Caps lock is on',
		id: 'UuMbWw',
	},
})

export const CapsLockIndicator: React.FC = () => {
	const intl = useIntl()
	const hasCapsLock = useKeyLock('CapsLock')

	return hasCapsLock ? (
		<ToolTip message={intl.formatMessage(messages.caps_lock)}>
			<TextUppercaseIcon className={styles.unlockCapsIconWrapper} />
		</ToolTip>
	) : null
}

export default CapsLockIndicator
