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
}

interface IAccountSwitcherProps extends IAccountActivityRequiredProps, IAccountActivityOptionalProps {}

const defaultProps: IAccountActivityOptionalProps = {
	className: undefined,
	onClick: undefined,
	iconOnly: false,
}

const items = [
	{ id: 'df', title: 'geebs' },
	{ id: 'asdfasdf', title: 'geebs' },
	{ id: 'adfdhfuh', title: 'geebs' },
	{ id: 'as773hf', title: 'Another geebs' },
	{ id: '88833', title: 'Aasdfahghgngn geebs' },
	{ id: '884848', title: 'djfjfj884' },
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
				<Text weight="strong" size="medium" color="strong">
					$40,452
				</Text>
				<Text size="small">$40,452</Text>
			</Box>
			<Box display="flex" flexDirection="column">
				<Text weight="strong" size="small" color="red">
					$40,452
				</Text>
				<Text weight="strong" size="small" color="green">
					$40,452
				</Text>
			</Box>
		</Box>
	)
}

export const AccountActivity = forwardRef<HTMLButtonElement, IAccountSwitcherProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { disabled, iconOnly, onClick, className, sizeVariant, styleVariant } = props

		const [customScrollParent, setCustomScrollParent] = useState<HTMLElement | null>(null)

		return (
			<Box ref={ref} className={styles.activityWrapper} style={{ height: `${20 * 100}px` }}>
				<ScrollArea
					scrollableNodeProps={{ ref: setCustomScrollParent }}
					// onScrollAreaSizeChange={setListSize}
					// enabled={!isLoading}
				>
					<Virtuoso
						// className={clsx(
						// 	{ [styles.virtuosoGridList]: view === 'list' },
						// 	{ [styles.virtuosoGridTwo]: view === 'tileTwo' },
						// )}
						customScrollParent={customScrollParent}
						data={items}
						itemContent={(index, user) => <ItemWrapper idx={index} user={user} />}
						components={{
							List: ListContainer,
							Item: ItemContainer,
						}}
						// computeItemKey={computeItemKey}
						// isScrolling={onScrollingStateChange}
					/>
				</ScrollArea>
			</Box>
		)
	},
)

AccountActivity.defaultProps = defaultProps
