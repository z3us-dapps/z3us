import React from 'react'

import Loader from 'ui/src/components/loader'

import { useIsUnlocked } from '@src/hooks/use-is-unlocked'

import Pairing from './paring'
import Unlock from './unlock'

const Layout: React.FC = () => {
	const { isUnlocked, isLoading, reload } = useIsUnlocked()

	if (isLoading) return <Loader />
	if (!isUnlocked) return <Unlock onUnlock={reload} />

	return <Pairing />
}

export default Layout
