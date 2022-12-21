import React from 'react'
import { useRouter, Router, useLocation, BaseLocationHook } from 'wouter'

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
	console.log('parentLocation:', parentLocation)

	const nestedBase = `${router.base}${base}`
	console.log('nestedBase:', nestedBase)

	// don't render anything outside of the scope
	if (!parentLocation.startsWith(nestedBase)) return <div />

	console.log('nestedBase: 222')

	// we need key to make sure the router will remount if the base changes
	return (
		<Router base={nestedBase} key={nestedBase} hook={hook}>
			{children}
		</Router>
	)
}
