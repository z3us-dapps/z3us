import React from 'react'

import { PageMenu } from 'ui/src/components/navigation/page-menu'

import { useMenuItems } from './use-menu-items'

export const DesktopNavigation: React.FC = () => {
	const menuItems = useMenuItems()

	return <PageMenu id="settings-menu" menu={menuItems} />
}
