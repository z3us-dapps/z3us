import type { WalletSdk as WalletSdkType } from '@radixdlt/wallet-sdk'
import type { PropsWithChildren } from 'react'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { ScrollPanel } from 'ui/src/components/scroll-panel'
import { Text } from 'ui/src/components/typography'

import * as styles from './styles.css'

export type TransactionDetails = Parameters<WalletSdkType['sendTransaction']>[0]

export type TransactionDetailsGetter = () => TransactionDetails | null

export type SetTransaction = (input: TransactionDetails | TransactionDetailsGetter) => void

export interface ITransferWrapperProps {
	title: string | React.ReactElement
}

export const TransferWrapper: React.FC<PropsWithChildren<ITransferWrapperProps>> = props => {
	const { title, children } = props
	return (
		<ScrollPanel>
			<Box className={styles.transferDesktopWrapper}>
				<Box width="full">
					<Box className={styles.transferDesktopTitleWrapper}>
						<Box display="flex" alignItems="center">
							<Text size="xxlarge" weight="strong" color="strong">
								{title}
							</Text>
						</Box>
					</Box>
					{children}
				</Box>
			</Box>
		</ScrollPanel>
	)
}

export default TransferWrapper
