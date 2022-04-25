import React from 'react'

const withDefaults = <P, DP>(component: React.ComponentType<P>, defaultProps: DP) => {
	type Props = Partial<DP> & Omit<P, keyof DP>
	const c = component
	c.defaultProps = defaultProps
	return c as React.ComponentType<Props>
}

export default withDefaults
