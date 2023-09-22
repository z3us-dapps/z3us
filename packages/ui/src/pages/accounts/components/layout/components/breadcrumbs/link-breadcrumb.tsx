import React, { PropsWithChildren } from 'react'

import { Link } from 'ui/src/components/router-link'
import { Text } from 'ui/src/components/typography'

interface IProps {
	isLast?: boolean
	to: string
}
export const LinkBreadcrumb: React.FC<PropsWithChildren<IProps>> = ({ isLast, to, children }) =>
	isLast ? <Text>{children}</Text> : <Link to={to}>{children}</Link>
