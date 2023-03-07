/* eslint-disable */
import clsx from 'clsx'
import { AnimatePresence } from 'framer-motion'
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Virtuoso } from 'react-virtuoso'
import { useIntersectionObserver } from 'usehooks-ts'

import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'

import Translation from '@src/components/translation'
import { AnimatedPage } from '@src/containers/playground/components/animated-route'
import { ScrollPanel } from '@src/containers/playground/components/scroll-panel'
import { Z3usLoading } from '@src/containers/playground/components/z3us-loading'
import { routes } from '@src/containers/playground/config'
import { useAccountParams } from '@src/containers/playground/hooks/use-account-params'

import * as styles from './accounts-home-mobile.css'

const items = [
	{ id: 'df', title: 'geebs' },
	{ id: 'asdfasdf', title: 'geebs' },
	{ id: 'adfdhfuh', title: 'geebs' },
	{ id: 'as773hf', title: 'Another geebs' },
	{ id: '88833', title: 'Aasdfahghgngn geebs' },
	{ id: '884848', title: 'djfjfj884' },
	{ id: '7d7fhdf', title: 'djfjfj884' },
	{ id: 'djfhdjhf', title: 'djfjfj884' },
	{ id: 'dfdfj', title: 'djfjfj884' },
	{ id: '88', title: 'djfjfj884' },
	{ id: '8djfahksdhf', title: 'djfjfj884' },
	{ id: '8iiudf7f7fhfh', title: 'djfjfj884' },
	{ id: 'ifjf2111', title: 'what' },
	{ id: '12455', title: 'what' },
	{ id: 'ifjf49', title: 'what' },
	{ id: 'ifj7575hg', title: 'what' },
	{ id: 'ifff7hghgjgjgg90g0g', title: 'what' },
	{ id: 'ifjfuhdfuhfuh', title: 'what' },
]

const ListContainer = React.forwardRef<HTMLDivElement>((props, ref) => <Box ref={ref} {...props} />)

const ItemContainer = props => <Box {...props} />

const ItemWrapper = props => {
	const { user, selected, hovered, setHovered } = props

	// const { account, assetType, asset } = useAccountParams()
	const { pathname } = useLocation()

	const isSelected = selected === user.id
	const isHovered = hovered === user.id

	// const handleClickItem = () => {
	// 	setSelected(isSelected ? null : user.id)
	// }

	return (
		<Box height="xxxlarge" background="backgroundSecondary">
			<Box>Items - {user.id}</Box>
		</Box>
	)
}

interface IAccountTransactionRequiredProps {
	customScrollParent: HTMLElement
}

interface IAccountTransactionOptionalProps {
	className?: number
}

interface IAccountTransactionProps extends IAccountTransactionRequiredProps, IAccountTransactionOptionalProps {}

const defaultProps: IAccountTransactionOptionalProps = {
	className: undefined,
}

export const AccountsHomeMobileList = forwardRef<HTMLElement, IAccountTransactionProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { customScrollParent } = props

		return (
			<Box ref={ref}>
				<Virtuoso
					customScrollParent={customScrollParent}
					data={items}
					// eslint-disable-next-line
					itemContent={(index, user) => (
						<ItemWrapper
							idx={index}
							user={user}
							// selected={selected}
							// setSelected={setSelected}
							// hovered={hovered}
							// setHovered={setHovered}
						/>
					)}
					components={{
						List: ListContainer,
						Item: ItemContainer,
					}}
				/>
			</Box>
		)
	},
)

AccountsHomeMobileList.defaultProps = defaultProps
