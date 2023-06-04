import React from 'react'
import type { BaseLocationHook} from 'wouter';
import { Router, useLocation, useRouter } from 'wouter'

export const RouterScope = ({
	children,
	base,
	hook,
}: {
	children: any
	base: string
	hook: BaseLocationHook
}): JSX.Element => {
	const router = useRouter()
	const [parentLocation] = useLocation()

	const nestedBase = `${router.base}${base}`

	// don't render anything outside of the scope
	if (!parentLocation.startsWith(nestedBase)) return <div />

	// we need key to make sure the router will remount if the base changes
	return (
		<Router base={nestedBase} key={nestedBase} hook={hook}>
			{children}
		</Router>
	)
}
