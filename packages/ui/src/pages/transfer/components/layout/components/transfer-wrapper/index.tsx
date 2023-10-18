import type { WalletSdk as WalletSdkType } from '@radixdlt/wallet-sdk'
import type { PropsWithChildren } from 'react'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { InformationIcon } from 'ui/src/components/icons'
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'ui/src/components/popover'
import { ScrollPanel } from 'ui/src/components/scroll-panel'
import { Text } from 'ui/src/components/typography'

import * as styles from './styles.css'

export type TransactionDetails = Parameters<WalletSdkType['sendTransaction']>[0]

export type TransactionDetailsGetter = () => TransactionDetails | null

export type SetTransaction = (input: TransactionDetails | TransactionDetailsGetter) => void

export interface ITransferWrapperProps {
	title: string | React.ReactElement
	titleSuffix?: string | React.ReactElement
	description?: string | React.ReactElement
	helpTitle?: string | React.ReactElement
	help?: string | React.ReactElement
}

export const TransferWrapper: React.FC<PropsWithChildren<ITransferWrapperProps>> = props => {
	const { title, titleSuffix, description, helpTitle, help, children } = props
	return (
		<ScrollPanel>
			<Box className={styles.transferDesktopWrapper}>
				<Box width="full">
					<Box display="flex" alignItems="flex-end">
						<Box display="flex" alignItems="center">
							<Text size="xxlarge" weight="strong" color="strong">
								{title}
							</Text>
							&nbsp;
							{titleSuffix && (
								<Text size="xxlarge" weight="strong">
									({titleSuffix})
								</Text>
							)}
						</Box>
						{(helpTitle || help) && (
							<PopoverRoot>
								<PopoverTrigger asChild>
									<Box marginBottom="xxsmall">
										<Button styleVariant="ghost" sizeVariant="xsmall" iconOnly aria-label="TODO">
											<InformationIcon />
										</Button>
									</Box>
								</PopoverTrigger>
								<PopoverPortal>
									<PopoverContent align="start" sideOffset={2} style={{ maxWidth: '300px' }}>
										<Box padding="medium" display="flex" flexDirection="column" gap="small">
											<Text size="xsmall" color="strong" weight="medium">
												{helpTitle}
											</Text>
											<Text size="xsmall">{help}</Text>
										</Box>
									</PopoverContent>
								</PopoverPortal>
							</PopoverRoot>
						)}
					</Box>
					{description && (
						<Box>
							<Text size="small">{description}</Text>
						</Box>
					)}
					{children}
				</Box>
			</Box>
		</ScrollPanel>
	)
}

export default TransferWrapper
