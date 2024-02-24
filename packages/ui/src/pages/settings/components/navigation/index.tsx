import React from 'react'

import { PageMenu } from 'ui/src/components/navigation/page-menu'

import { useMenuItems } from './use-menu-items'

interface IProps {
	title: string | React.ReactElement
}

export const DesktopNavigation: React.FC<IProps> = props => {
	const { title } = props
	const menuItems = useMenuItems()

	return <PageMenu menu={menuItems} title={title} />
}
