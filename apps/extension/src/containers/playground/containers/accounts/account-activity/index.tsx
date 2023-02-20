/* eslint-disable */
import React, { forwardRef, useEffect, useState } from 'react'
import { Box } from 'ui/src/components-v2/box'
import { Virtuoso, VirtuosoGrid, VirtuosoGridHandle } from 'react-virtuoso'
import { ScrollArea } from 'ui/src/components/scroll-area'
import { PlusIcon, MagnifyingGlassIcon } from 'ui/src/components/icons'
import { Text } from 'ui/src/components-v2/typography'
import clsx from 'clsx'

import * as styles from './account-activity.css'

interface IAccountActivityRequiredProps {}

interface IAccountActivityOptionalProps {
	className?: number
	onClick?: () => void
	iconOnly?: boolean
	flexGrowWrapper?: boolean
}

interface IAccountSwitcherProps extends IAccountActivityRequiredProps, IAccountActivityOptionalProps {}

const defaultProps: IAccountActivityOptionalProps = {
	className: undefined,
	onClick: undefined,
	iconOnly: false,
	flexGrowWrapper: false,
}

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
]

const ListContainer = React.forwardRef<HTMLDivElement>((props, ref) => <div ref={ref} {...props} />)

const ItemContainer = props => <Box {...props} className={styles.activtyItem} />

const ItemWrapper = props => {
	const { idx, user } = props

	return (
		<Box className={styles.activtyItemInner}>
			<Box className={styles.indicatorCircle}>
				<PlusIcon />
			</Box>
			<Box display="flex" flexDirection="column" flexGrow={1}>
				<Text weight="stronger" size="small" color="strong">
					1.249 XRD
				</Text>
				<Text size="xsmall">rdx1...746x</Text>
			</Box>
			<Box display="flex" flexDirection="column">
				<Text weight="strong" size="xsmall" color="red">
					$40,452
				</Text>
				<Text weight="strong" size="xsmall" color="green">
					$40,452
				</Text>
			</Box>
		</Box>
	)
}

export const AccountActivity = forwardRef<HTMLElement, IAccountSwitcherProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { iconOnly, onClick, className, flexGrowWrapper } = props

		return (
			<Box className={clsx(styles.activityWrapper)} style={{ minHeight: `40px` }}>
				<Virtuoso
					// className={clsx(
					// 	{ [styles.virtuosoGridList]: view === 'list' },
					// 	{ [styles.virtuosoGridTwo]: view === 'tileTwo' },
					// )}
					customScrollParent={ref as any}
					data={items}
					itemContent={(index, user) => <ItemWrapper idx={index} user={user} />}
					components={{
						List: ListContainer,
						Item: ItemContainer,
					}}
					// computeItemKey={computeItemKey}
					// isScrolling={onScrollingStateChange}
				/>
			</Box>
		)
	},
)

AccountActivity.defaultProps = defaultProps
