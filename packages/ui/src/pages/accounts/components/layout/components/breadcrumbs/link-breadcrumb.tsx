import React, { PropsWithChildren } from 'react'

import { Link } from 'ui/src/components/router-link'

interface IProps {
	to: string
}
export const LinkBreadcrumb: React.FC<PropsWithChildren<IProps>> = ({ to, children }) => <Link to={to}>{children}</Link>
