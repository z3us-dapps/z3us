import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { VirtuosoGrid } from 'react-virtuoso'
import { useTimeout } from 'usehooks-ts'

import { Box } from 'ui/src/components/box'
import { Link } from 'ui/src/components/router-link'
import * as skeletonStyles from 'ui/src/components/styles/skeleton-loading.css'
import { TransactionIcon } from 'ui/src/components/transaction-icon'
import { Text } from 'ui/src/components/typography'
import { animatePageVariants } from 'ui/src/constants/page'
import { useAccountParams } from 'ui/src/hooks/use-account-params'

import { AccountListHeader } from './account-list-header'
import * as styles from './accounts-list.css'

const hash = () => Math.random().toString(36).substring(7)

const Context = React.createContext<{ setItems: any }>({
	setItems: () => {},
})

const ListContainer = React.forwardRef<HTMLDivElement>((props, ref) => (
	<div ref={ref} {...props} className={styles.listContainer} />
))

const ItemContainer = props => <div {...props} className={styles.itemContainer} />

const ItemWrapper = props => {
	const { idx, user } = props
	const { setItems } = useContext(Context)

	const { account, asset } = useAccountParams()

	useTimeout(() => {
		setItems(items =>
			items.map(item => {
				if (item.id === user.id) {
					item.loaded = true
				}
				return item
			}),
		)
	}, 1000)

	return (
		<Box className={styles.itemWrapper}>
			<AnimatePresence initial={false}>
				{!user.loaded && (
					<motion.div
						initial="hidden"
						animate="visible"
						variants={animatePageVariants}
						className={styles.itemWrapperMotion}
						style={{ position: 'absolute', top: '0', left: '0' }}
					>
						<Box className={styles.itemLoadingWrapper}>
							<Box className={styles.itemWrapperInner}>
								<Box width="full" className={styles.tokenListGridWrapper}>
									<Box display="flex" alignItems="center" gap="medium">
										<Box className={clsx(skeletonStyles.tokenListSkeleton, skeletonStyles.tokenListGridCircle)} />
										<Box
											className={skeletonStyles.tokenListSkeleton}
											style={{ width: idx % 2 === 0 ? '45%' : '65%', height: '50%' }}
										/>
									</Box>
									<Box display="flex" alignItems="center">
										<Box className={skeletonStyles.tokenListSkeleton} style={{ width: '50%', height: '50%' }} />
									</Box>
									<Box display="flex" alignItems="center">
										<Box className={skeletonStyles.tokenListSkeleton} style={{ width: '40%', height: '50%' }} />
									</Box>
									<Box display="flex" alignItems="center">
										<Box className={skeletonStyles.tokenListSkeleton} style={{ width: '70%', height: '50%' }} />
									</Box>
								</Box>
							</Box>
						</Box>
					</motion.div>
				)}
			</AnimatePresence>
			<AnimatePresence initial={false}>
				{user.loaded && (
					<Link to={`/accounts/tokens?accounts${account}&user=${user.id}`}>
						<motion.div
							initial="hidden"
							animate="visible"
							variants={animatePageVariants}
							className={styles.itemWrapperMotion}
						>
							<Box
								className={clsx(
									styles.itemWrapperInner,
									styles.itemWrapperInnerHover,
									asset && idx === 0 && styles.itemWrapperInnerSelected,
								)}
							>
								<Box width="full" className={styles.tokenListGridWrapper}>
									<Box display="flex" alignItems="center" justifyContent="flex-start" gap="medium">
										<TransactionIcon transactionType="deposit" transactionIconSize="medium" />
										<Text size="medium" weight="medium" color="strong" truncate>
											{user.id} - {user.id} - {user.id} - {user.id} - {user.id}
										</Text>
									</Box>
									<Box display="flex" alignItems="center">
										<Text size="small" color="strong" truncate>
											Amount Amount Amount Amount Amount Amount
										</Text>
									</Box>
									<Box className={styles.itemCategoryWrapper}>
										<Text size="small" color="strong" truncate>
											Category Category CategoryCategory Category Category
										</Text>
									</Box>
									<Box className={styles.itemAccountWrapper}>
										<Text size="small" color="strong" truncate>
											ACcotoun asdf counte
										</Text>
									</Box>
								</Box>
							</Box>
						</motion.div>
					</Link>
				)}
			</AnimatePresence>
		</Box>
	)
}

interface IAccountListProps {
	scrollableNode: HTMLElement
}

export const AccountsList: React.FC<IAccountListProps> = props => {
	const { scrollableNode } = props

	// eslint-disable-next-line
	const [items, setItems] = useState(Array.from({ length: 20 }, _ => ({ id: hash(), name: hash(), loaded: false })))
	const { account, asset } = useAccountParams()

	// computeItemKey is necessary for animation to ensure Virtuoso reuses the same elements
	const computeItemKey = useCallback(index => items[index].id, [items])

	useEffect(() => {
		if (scrollableNode) {
			scrollableNode.scrollTo({ top: 0 })
		}
	}, [account, asset])

	return (
		<Box className={styles.tokenListWrapper} style={{ minHeight: '200px' }}>
			<AccountListHeader scrollableNode={scrollableNode} />
			{/* TODO: this context is temporary until we hook up proper state, just here for demo purposes */}
			{/* eslint-disable-next-line */}
			<Context.Provider value={{ setItems }}>
				<VirtuosoGrid
					customScrollParent={scrollableNode}
					data={items}
					// todo fix lint issue
					// eslint-disable-next-line
					itemContent={(index, user) => <ItemWrapper idx={index} user={user} />}
					components={{
						List: ListContainer,
						Item: ItemContainer,
					}}
					computeItemKey={computeItemKey}
				/>
			</Context.Provider>
		</Box>
	)
}
