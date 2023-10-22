import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { DialogContent, DialogOverlay, DialogPortal, DialogRoot } from 'ui/src/components/dialog'
import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import { Close2Icon, LockIcon } from 'ui/src/components/icons'
import { AccountsTransactionInfo } from 'ui/src/components/layout/account-transaction-info'
import MetadataValue from 'ui/src/components/metadata-value'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { Button } from 'ui/src/components/router-button'
import { ScrollArea } from 'ui/src/components/scroll-area'
import * as dialogStyles from 'ui/src/components/styles/dialog-styles.css'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'
import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'
import { getStringMetadata } from 'ui/src/services/metadata'

import * as styles from '../transaction/styles.css'

const messages = defineMessages({
	metadata: {
		defaultMessage: 'Metadata',
		id: '8Q504V',
	},
	close: {
		defaultMessage: 'Close',
		id: 'rbrahO',
	},
})

export const QueryResult = () => {
	const intl = useIntl()
	const location = useLocation()
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	const isMobile = useIsMobileWidth()

	const resourceId = searchParams.get('query')
	const isTransactionVisible = !!resourceId

	const { data, isLoading } = useEntityDetails(resourceId)

	const name = getStringMetadata('name', data?.metadata?.items)
	const description = getStringMetadata('description', data?.metadata?.items)

	const [isScrolled, setIsScrolled] = useState<boolean>(false)

	const navigateBack = () => {
		const [, params] = location.search.split('?')
		const query = new URLSearchParams(params)
		query.delete('query')
		navigate(`${location.pathname}?${query}`)
	}

	const handleEscapeKeyDown = () => {
		navigateBack()
	}

	const handleOnInteractOutside = () => {
		if (isMobile) {
			navigateBack()
		}
	}

	const handleScroll = (event: Event) => {
		const target = event.target as Element
		const { scrollTop } = target

		setIsScrolled(scrollTop > 0)
	}

	useEffect(() => {
		if (!resourceId) {
			setIsScrolled(false)
		}
	}, [resourceId])

	if (!resourceId) return null
	if (isLoading) return <FallbackLoading />

	return (
		<DialogRoot open={isTransactionVisible} modal={isMobile}>
			<DialogPortal>
				{isMobile ? <DialogOverlay className={dialogStyles.dialogOverlay} /> : null}
				<DialogContent
					className={clsx(
						isMobile && dialogStyles.dialogContent,
						isMobile && styles.transactionContent,
						!isMobile && styles.transactionContentSlideOutDialogContent,
					)}
					onEscapeKeyDown={handleEscapeKeyDown}
					onInteractOutside={handleOnInteractOutside}
				>
					<ScrollArea onScroll={handleScroll}>
						<Box className={styles.transactionBodyScrollWrapper}>
							<Box display="flex" flexDirection="column" alignItems="center">
								<Box paddingBottom="small">
									<ResourceImageIcon address={resourceId} />
								</Box>
								<Text size="xlarge" weight="strong" color="strong" align="center">
									{name}
								</Text>
								<Text size="xxsmall">{description}</Text>
							</Box>
							<Box className={styles.transactionDetailsWrapper}>
								<Box display="flex" flexDirection="column">
									<Box paddingTop="xlarge">
										<Text size="large" weight="medium" color="strong">
											{intl.formatMessage(messages.metadata)}
										</Text>
									</Box>

									{data?.metadata.items.map(item => (
										<AccountsTransactionInfo
											key={item.key}
											leftTitle={
												<Box display="flex" alignItems="flex-end" gap="xsmall">
													<Box>
														<Box>{item.is_locked === true && <LockIcon />}</Box>
													</Box>
													<Text size="xxsmall" color="strong" weight="medium">
														{(item.key as string).toUpperCase()}
													</Text>
												</Box>
											}
											rightData={
												<Box display="flex" alignItems="flex-end">
													<MetadataValue value={item} />
												</Box>
											}
										/>
									))}
								</Box>
							</Box>
						</Box>
					</ScrollArea>
					<Box className={clsx(styles.transactionHeaderWrapper, isScrolled && styles.transactionHeaderWrapperShadow)}>
						<Box flexGrow={1} />
						<Box flexGrow={1} display="flex" justifyContent="flex-end" gap="small">
							<ToolTip message={intl.formatMessage(messages.close)}>
								<Button styleVariant="ghost" sizeVariant="small" iconOnly onClick={navigateBack}>
									<Close2Icon />
								</Button>
							</ToolTip>
						</Box>
					</Box>
				</DialogContent>
			</DialogPortal>
		</DialogRoot>
	)
}
