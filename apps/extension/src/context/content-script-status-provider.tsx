import { ContentScriptStatusContext } from 'packages/ui/src/context/content-script'
import React, { type PropsWithChildren } from 'react'

import { config } from '@src/config'

const useContentScriptStatus = config.isExtensionContext
	? (await import('@src/hooks/use-content-script-status')).useContentScriptStatus
	: () => null

export const ContentScriptStatusProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const status = useContentScriptStatus()
	return <ContentScriptStatusContext.Provider value={status}>{children}</ContentScriptStatusContext.Provider>
}
