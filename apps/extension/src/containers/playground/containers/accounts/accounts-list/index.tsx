import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useCallback, useContext, useState } from 'react'
import { VirtuosoGrid } from 'react-virtuoso'
import { useTimeout } from 'usehooks-ts'

import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'

import { Link } from '@src/components/link'
import * as skeletonStyles from '@src/containers/playground/components/styles/skeleton-loading.css'
import { useAccountParams } from '@src/hooks/use-account-params'

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

const variants = {
	visible: {
		opacity: 1,
		transition: {
			type: 'spring',
			stiffness: 200,
			damping: 20,
		},
	},
	hidden: {
		opacity: 0,
		transition: {
			type: 'spring',
			stiffness: 200,
			damping: 20,
		},
	},
}

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
	}, 3000)

	return (
		<Box className={clsx(styles.itemWrapper)}>
			<AnimatePresence initial={false}>
				{!user.loaded && (
					<motion.div
						initial="hidden"
						animate="visible"
						variants={variants}
						className={styles.itemWrapperMotion}
						style={{ position: 'absolute', top: '0', left: '0' }}
					>
						<Box paddingX="xlarge">
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
					<Link to={`/accounts/${account}/tokens/${user.id}`}>
						<motion.div initial="hidden" animate="visible" variants={variants} className={styles.itemWrapperMotion}>
							<Box
								className={clsx(
									styles.itemWrapperInner,
									styles.itemWrapperInnerHover,
									asset && idx === 0 && styles.itemWrapperInnerSelected,
								)}
							>
								<Box width="full" className={styles.tokenListGridWrapper}>
									<Box display="flex" alignItems="center" justifyContent="flex-start" gap="medium">
										<Box className={styles.tokenListGridCircle} style={{ backgroundColor: '#ea983d' }} />
										<Text size="medium" weight="medium" color="strong">
											{user.id}
										</Text>
									</Box>
									<Box display="flex" alignItems="center">
										<Text size="small" color="strong">
											Amount
										</Text>
									</Box>
									<Box display="flex" alignItems="center">
										<Text size="small" color="strong">
											Value
										</Text>
									</Box>
									<Box display="flex" alignItems="center">
										<Text size="small" color="strong">
											Category
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

interface IAccountListRequiredProps {
	scrollTop: number
	scrollableNode: HTMLElement
}

interface IAccountListOptionalProps {
	className?: number
}

interface IAccountListProps extends IAccountListRequiredProps, IAccountListOptionalProps {}

const defaultProps: IAccountListOptionalProps = {
	className: undefined,
}

export const AccountsList = React.forwardRef<HTMLElement, IAccountListProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className, scrollTop, scrollableNode } = props

		// eslint-disable-next-line
		const [items, setItems] = useState(Array.from({ length: 20 }, _ => ({ id: hash(), name: hash(), loaded: false })))

		const isScrolled = scrollTop > 0

		// computeItemKey is necessary for animation to ensure Virtuoso reuses the same elements
		const computeItemKey = useCallback(index => items[index].id, [items])

		return (
			<Box ref={ref} className={clsx(styles.tokenListWrapper, className)} style={{ minHeight: '200px' }}>
				<AccountListHeader isScrolled={isScrolled} />
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
	},
)

AccountsList.defaultProps = defaultProps
