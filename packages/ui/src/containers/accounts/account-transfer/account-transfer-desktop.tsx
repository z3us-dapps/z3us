import React from 'react'

import { Box } from 'ui/src/components/box'
import { ScrollPanel } from 'ui/src/components/scroll-panel'
import * as containerStyles from 'ui/src/components/styles/container-styles.css'
import { AccountTransfer } from 'ui/src/containers/accounts/account-transfer'

import * as styles from './account-transfer.css'

export const AccountsTransferDesktop = () => (
	<Box className={containerStyles.containerWrapper}>
		<Box className={styles.panelWrapper}>
			<ScrollPanel
				isTopShadowVisible
				renderPanel={(scrollableNode: HTMLElement | null) => <AccountTransfer scrollableNode={scrollableNode} />}
			/>
		</Box>
	</Box>
)
