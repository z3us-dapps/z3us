import React from 'react'

import { Box } from 'ui/src/components-v2/box'

import { ScrollPanel } from '@src/components/scroll-panel'
import * as containerStyles from '@src/components/styles/container-styles.css'
import { AccountTransfer } from '@src/containers/accounts/account-transfer'

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
