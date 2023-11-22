import type { Intent } from '@radixdlt/radix-engine-toolkit'
import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { Tabs, TabsContent } from 'ui/src/components/tabs'

import type { TransactionMeta, TransactionSettings } from '@src/types/transaction'

import { Manifest } from './manifest'
import { Preview } from './preview'
import * as styles from './styles.css'

const messages = defineMessages({
	tab_preview: {
		id: 'TJo5E6',
		defaultMessage: 'Preview',
	},
	tab_manifest: {
		id: 'c+Uxfa',
		defaultMessage: 'Transaction manifest',
	},
})

const PREVIEW = 'preview'
const MANIFEST = 'manifest'

interface IProps {
	intent: Intent
	settings: TransactionSettings
	meta: TransactionMeta
	onManifestChange?: (manifest: string) => void
	onSettingsChange: (settings: TransactionSettings) => void
	onPreviewStatusChange?: (status: string) => void
}

export const Transaction: React.FC<IProps> = ({
	intent,
	settings,
	meta,
	onManifestChange,
	onSettingsChange,
	onPreviewStatusChange,
}) => {
	const intl = useIntl()

	return (
		<Box className={styles.transactionManifestWrapper}>
			<Tabs
				list={[
					{ label: intl.formatMessage(messages.tab_preview), value: PREVIEW },
					{ label: intl.formatMessage(messages.tab_manifest), value: MANIFEST },
				]}
				defaultValue={PREVIEW}
				className={styles.transactionManifestTabsWrapper}
			>
				<TabsContent value={PREVIEW} className={styles.transactionManifestTabsContentWrapper}>
					<Preview
						intent={intent}
						settings={settings}
						meta={meta}
						onSettingsChange={onSettingsChange}
						onStatusChange={onPreviewStatusChange}
					/>
				</TabsContent>
				<TabsContent value={MANIFEST} className={styles.transactionManifestTabsContentWrapper}>
					<Manifest intent={intent} onChange={onManifestChange} />
				</TabsContent>
			</Tabs>
		</Box>
	)
}
