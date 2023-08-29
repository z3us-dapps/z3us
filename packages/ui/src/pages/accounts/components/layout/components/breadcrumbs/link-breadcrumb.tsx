import React from 'react'

import { Link } from 'ui/src/components/router-link'
import Translation from 'ui/src/components/translation'

interface IProps {
	to: string
	translationKey: string
}
export const LinkBreadcrumb: React.FC<IProps> = ({ to, translationKey }) => (
	<Link to={to}>
		<Translation text={translationKey} />
	</Link>
)
