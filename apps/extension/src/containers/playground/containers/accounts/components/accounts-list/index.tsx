import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import './accounts-list.css'

const cvaAccountsListVariants = cva('z3-c-account-list', {
	variants: {
		view: {
			list: ['z3-c-account-list--list'],
			tileThree: ['z3-c-account-list--tile-three'],
		},
	},
	defaultVariants: {
		view: 'list',
	},
})


// interface IProps {
// 	href?: string | undefined
// }
// export interface AccountsListProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cvaAccountsList> {}

// const defaultProps = {
// 	children: undefined,
// 	href: undefined,
// 	type: 'button',
// }

type AccountListProps = React.ComponentProps<'div'> & VariantProps<typeof cvaAccountsListVariants>

export const AccountsList = React.forwardRef<React.ElementRef<'div'>, AccountListProps>((props, forwardedRef) => {
		const { className, view, ...rest } = props

	return (
		<div
			ref={forwardedRef}
			className={cvaAccountsListVariants({ view, className })}
			{...rest}
		>


{[...Array(50)].map((x, i) => (
<div key={i} className="z3-c-account-list__element">geebs {i}</div>
))}


		</div>
	)
})

AccountsList.displayName = 'AccountsList'
