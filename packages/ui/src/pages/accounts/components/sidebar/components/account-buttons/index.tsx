import clsx from 'clsx'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { CardButtons } from 'ui/src/components/card-buttons'
import { useIsAllAccounts } from 'ui/src/hooks/use-is-all-accounts'

import * as styles from './styles.css'

export const AccountButtons: React.FC = () => {
	const isAllAccounts = useIsAllAccounts()

	return (
		<Box className={clsx(styles.cardButtonsWrapper, isAllAccounts && styles.cardButtonsWrapperAllAccounts)}>
			<CardButtons />
		</Box>
	)
}
