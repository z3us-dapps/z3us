import clsx from 'clsx'
import React, { forwardRef, useState } from 'react'
// import { useAccountParams } from '@src/containers/playground/hooks/use-account-params'
import { useLocation } from 'react-router-dom'
import { Virtuoso } from 'react-virtuoso'

import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'
import { ShareIcon } from 'ui/src/components/icons'

import { Button } from '@src/components/button'
import { Link } from '@src/components/link'
import { TransactionIcon } from '@src/containers/playground/components/transaction-icon'

import * as styles from './account-activity.css'

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

const ListContainer = React.forwardRef<HTMLDivElement>((props, ref) => <div ref={ref} {...props} />)

const ItemContainer = props => <Box {...props} className={styles.activtyItem} />

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
		<Box className={styles.activtyItemOuter}>
			<Box className={clsx(styles.activtyItemInner, (isSelected || isHovered) && styles.activtyItemInnerSelected)}>
				<Link
					underline="never"
					to={`${pathname}?asset=xrd&transactionId=1eaf53c4256c384d76ca72c0f18ef37a2e4441d4e6bae450e2b8507f42faa5b6`}
					// to={`/accounts/transactions/btc/1eaf53c4256c384d76ca72c0f18ef37a2e4441d4e6bae450e2b8507f42faa5b6`}
					className={styles.activtyItemInnerBtn}
					// onClick={handleClickItem}
					onMouseOver={() => setHovered(user.id)}
					onMouseLeave={() => setHovered(null)}
				>
					<>
						<Box className={styles.indicatorCircle}>
							<TransactionIcon transactionType="deposit" />
						</Box>
						<Box display="flex" flexDirection="column" flexGrow={1}>
							<Text weight="stronger" size="small" color="strong">
								+1.249 XRD
							</Text>
							<Text size="xsmall">29 Aug, 10est, 2023</Text>
						</Box>
					</>
				</Link>
			</Box>
			<Box
				className={clsx(
					styles.activtyItemExternalLinkWrapper,
					(isSelected || isHovered) && styles.activtyItemExternalLinkWrapperActive,
				)}
			>
				<Button
					sizeVariant="small"
					styleVariant="ghost"
					iconOnly
					to="https://explorer.radixdlt.com/"
					target="_blank"
					onMouseOver={() => setHovered(user.id)}
					onMouseLeave={() => setHovered(null)}
				>
					<ShareIcon />
				</Button>
			</Box>
		</Box>
	)
}

interface IAccountActivityRequiredProps {
	scrollableNode: HTMLElement
}

interface IAccountActivityOptionalProps {}

interface IAccountActivityProps extends IAccountActivityRequiredProps, IAccountActivityOptionalProps {}

const defaultProps: IAccountActivityOptionalProps = {}

export const AccountActivity = forwardRef<HTMLElement, IAccountActivityProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { scrollableNode } = props
		const [selected, setSelected] = useState<string | null>(null)
		const [hovered, setHovered] = useState<string | null>(null)

		return (
			<Box ref={ref} className={clsx(styles.activityWrapper)} style={{ minHeight: '100px' }}>
				<Virtuoso
					customScrollParent={scrollableNode}
					data={items}
					// todo fix lint issue
					// eslint-disable-next-line
					itemContent={(index, user) => (
						<ItemWrapper
							idx={index}
							user={user}
							selected={selected}
							setSelected={setSelected}
							hovered={hovered}
							setHovered={setHovered}
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

AccountActivity.defaultProps = defaultProps
