import type React from 'react'

const withDefaults = <
	P extends React.ComponentType<React.ComponentProps<P>>,
	DP extends Partial<React.ComponentProps<P>>,
>(
	WrappedComponent: P,
	defaultProps: DP,
) => {
	WrappedComponent.defaultProps = defaultProps
	// type ResolvedProps = JSX.LibraryManagedAttributes<P, Omit<React.ComponentProps<P>, keyof DP>>
	return WrappedComponent as React.ComponentType<P>
}

export default withDefaults
