import { useDashboardUrl } from 'packages/ui/src/hooks/dapp/use-network'
import { useZdtState } from 'packages/ui/src/hooks/zdt/use-zdt'
import React, { useMemo } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { RadixIcon, Z3usIcon } from 'ui/src/components/icons'
import { SlideOutDialog } from 'ui/src/components/layout/slide-out-dialog'
import ResourceDetails from 'ui/src/components/resource/resource'
import { Button } from 'ui/src/components/router-button'
import { ToolTip } from 'ui/src/components/tool-tip'

const messages = defineMessages({
	open_radix_dashboard: {
		id: 'xxuT0a',
		defaultMessage: 'Open in Radix Dashboard',
	},
	open_z3us: {
		id: 'WAHvBA',
		defaultMessage: 'Open in Z3US.com',
	},
})

export const QueryResult = () => {
	const intl = useIntl()
	const location = useLocation()
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	const dashboardUrl = useDashboardUrl()
	const { isWallet } = useZdtState()

	const resourceId = searchParams.get('query')
	const isVisible = !!resourceId

	const navigateBack = () => {
		searchParams.delete('query')
		navigate(`${location.pathname}?${searchParams}`)
	}

	const dashboardTo = useMemo(
		() => `${dashboardUrl}/${resourceId?.split('_')?.[0] || 'component'}/${resourceId}`,
		[resourceId],
	)

	return (
		<SlideOutDialog
			open={isVisible}
			onClose={navigateBack}
			headerButtons={
				<Box>
					<ToolTip message={intl.formatMessage(messages.open_radix_dashboard)}>
						<Button sizeVariant="small" styleVariant="ghost" iconOnly to={dashboardTo} target="_blank">
							<RadixIcon />
						</Button>
					</ToolTip>
					{isWallet && (
						<ToolTip message={intl.formatMessage(messages.open_z3us)}>
							<Button
								sizeVariant="small"
								styleVariant="ghost"
								iconOnly
								to={`https://z3us.com/#${location.pathname}`}
								target="_blank"
							>
								<Z3usIcon />
							</Button>
						</ToolTip>
					)}
				</Box>
			}
		>
			<ResourceDetails resourceId={resourceId} hideButtons />
		</SlideOutDialog>
	)
}
