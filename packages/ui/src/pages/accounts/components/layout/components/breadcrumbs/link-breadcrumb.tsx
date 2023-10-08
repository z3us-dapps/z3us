import type { PropsWithChildren } from 'react'
import React from 'react'

import { ChevronRightIcon } from 'ui/src/components/icons'
import { Link } from 'ui/src/components/router-link'
import { Text } from 'ui/src/components/typography'

interface IProps {
	isLast?: boolean
	isFirst?: boolean
	to: string
}
export const LinkBreadcrumb: React.FC<PropsWithChildren<IProps>> = ({ isFirst, isLast, to, children }) => (
	<>
		{!isFirst && <ChevronRightIcon />}
		{isLast ? <Text>{children}</Text> : <Link to={to}>{children}</Link>}
	</>
)
