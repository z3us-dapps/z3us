import React from 'react'

import { FallbackLoading } from 'ui/src/components/fallback-renderer'

import { useIsUnlocked } from '@src/hooks/use-is-unlocked'

import Pairing from './paring'
import Unlock from './unlock'

const Layout: React.FC = () => {
	const { isUnlocked, isLoading, reload } = useIsUnlocked()

	if (isLoading) return <FallbackLoading />
	if (!isUnlocked) return <Unlock onUnlock={reload} />

	return <Pairing />
}

export default Layout
