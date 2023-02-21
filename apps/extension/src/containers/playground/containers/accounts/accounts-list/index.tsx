/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect, useCallback, useContext } from 'react'
import { useTimeout } from 'usehooks-ts'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { useAccountParams } from '@src/containers/playground/hooks/use-account-params'

import { AccountSearch } from '@src/containers/playground/containers/accounts/account-search'
import { Virtuoso, VirtuosoGrid, VirtuosoGridHandle } from 'react-virtuoso'
import { motion, AnimatePresence, usePresence } from 'framer-motion'
import { ChevronDown2Icon, ChevronRightIcon } from 'ui/src/components/icons'
import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'
import clsx from 'clsx'
import { Link } from '@src/components/link'

import * as styles from './accounts-list.css'

const hash = () => Math.random().toString(36).substring(7)

const Context = React.createContext<{ isScrolling: boolean; isLoading: boolean; setItems: any }>({
	isScrolling: true,
	isLoading: true,
	setItems: () => {},
})

const ListContainer = React.forwardRef<HTMLDivElement>((props, ref) => {
	return <div ref={ref} {...props} className={styles.listContainer} />
})

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
	const { isLoading, isScrolling, setItems } = useContext(Context)
	const { account, assetType, asset } = useAccountParams()

	const getAnimateState = () => {
		if (!user.loaded) {
			return 'loading'
		}

		// if (isLoading && !isScrolling) {
		// 	return 'loading'
		// }

		return 'loaded'
	}

	const generateTempLink = () => {
		if (asset) {
			return `/accounts/${account}/tokens/xrd`
			// return `/accounts/${account}/tokens/xrd/b707388613169bf701d533e143d8f698c9090f605e677a967eaf70a4c69250ce`
		} else {
			return `/accounts/${account}/tokens/xrd`
		}
	}

	useTimeout(() => {
		setItems(items => {
			return items.map(item => {
				if (item.id === user.id) {
					item.loaded = true
				}
				return item
			})
		})
	}, 1000)

	return (
		<Box className={clsx(styles.itemWrapper, { [styles.itemWrapperLoading]: !user.loaded })}>
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
										<Box className={clsx(styles.tokenListSkeleton, styles.tokenListGridCircle)} />
										<Box
											className={styles.tokenListSkeleton}
											style={{ width: idx % 2 === 0 ? '45%' : '65%', height: '50%' }}
										/>
									</Box>
									<Box display="flex" alignItems="center">
										<Box className={styles.tokenListSkeleton} style={{ width: '50%', height: '50%' }} />
									</Box>
									<Box display="flex" alignItems="center">
										<Box className={styles.tokenListSkeleton} style={{ width: '40%', height: '50%' }} />
									</Box>
									<Box display="flex" alignItems="center">
										<Box className={styles.tokenListSkeleton} style={{ width: '70%', height: '50%' }} />
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
}

interface IAccountListOptionalProps {
	className?: number
	onClick?: () => void
	iconOnly?: boolean
}

interface IAccountListProps extends IAccountListRequiredProps, IAccountListOptionalProps {}

const defaultProps: IAccountListOptionalProps = {
	className: undefined,
	onClick: undefined,
	iconOnly: false,
}

export const AccountsList = React.forwardRef<HTMLElement, IAccountListProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className, scrollTop, ...rest } = props

		const { account, assetType, asset } = useAccountParams()
		const [items, setItems] = useState(Array.from({ length: 20 }, _ => ({ id: hash(), name: hash(), loaded: false })))
		const [isLoading, setIsLoading] = useState(false)
		const [isScrolling, setIsScrolling] = useState(false)
		const isScrolled = scrollTop > 0

		// Disable animation on scroll or Virtuoso will break while scrolling
		const onScrollingStateChange = useCallback(value => {
			setIsScrolling(value)
		}, [])

		// computeItemKey is necessary for animation to ensure Virtuoso reuses the same elements
		const computeItemKey = useCallback(
			index => {
				return items[index].id
			},
			[items],
		)

		return (
			<Box style={{ minHeight: '200px' }}>
				<Box className={clsx(styles.accountListHeaderWrapper, isScrolled && styles.accountListHeaderWrapperShadow)}>
					<Box width="full" display="flex" alignItems="flex-start" paddingBottom="medium">
						<Box flexGrow={1}>
							<Box display="flex" paddingBottom="xsmall">
								{assetType ? (
									<Box>
										<Link to={`/accounts/${account}`}>
											<Text size="large">Overview{account ? `: ${account}` : ''}</Text>
										</Link>
									</Box>
								) : (
									<Box>
										<Text size="large">Account balance</Text>
										{/* <Text size="large">Accounts{account ? `: ${account}` : ''}</Text> */}
									</Box>
								)}
								{assetType ? (
									<Box display="flex" alignItems="center">
										<Box paddingX="xsmall" display="flex" alignItems="center">
											<ChevronRightIcon />
										</Box>
										{asset ? (
											<Link to={`/accounts/${account}/${assetType}`}>
												<Text size="large">{assetType}</Text>
											</Link>
										) : (
											<Text size="large" color="strong">
												{assetType}
											</Text>
										)}
									</Box>
								) : null}
								{/* asset  */}
								{asset ? (
									<Box display="flex" alignItems="center">
										<Box paddingX="xsmall" display="flex" alignItems="center">
											<ChevronRightIcon />
										</Box>
										<Text size="large" color="strong">
											{asset}
										</Text>
									</Box>
								) : null}
							</Box>
							<Text
								weight="medium"
								// size={isScrolled ? 'xxlarge' : 'xxxlarge'}
								size="xxxlarge"
								color="strong"
								// className={styles.pricingText}
							>
								$4,440,206.25
							</Text>
						</Box>
						<Box display="flex" flexGrow={1}>
							<AccountSearch
								placeholder="Search"
								onChange={_value => {
									console.log(_value)
								}}
							/>
						</Box>
					</Box>
					<Box width="full">
						<Box position="relative" paddingBottom="medium" className={styles.tokenListGridWrapper}>
							<Box component="button" className={styles.tokenListHeaderButton}>
								<Text size="xsmall" weight="medium">
									Asset
								</Text>
							</Box>
							<Box component="button" className={styles.tokenListHeaderButton}>
								<Text size="xsmall" weight="medium">
									Amount
								</Text>
							</Box>
							<Box component="button" className={styles.tokenListHeaderButton}>
								<Text size="xsmall" weight="medium">
									Category
								</Text>
								<ChevronDown2Icon />
							</Box>
							<Box component="button" className={styles.tokenListHeaderButton}>
								<Text size="xsmall" weight="medium">
									Account
								</Text>
							</Box>
						</Box>
					</Box>
				</Box>

				<Context.Provider value={{ isScrolling, isLoading, setItems }}>
					<VirtuosoGrid
						customScrollParent={ref as any}
						data={items}
						itemContent={(index, user) => (
							<ItemWrapper idx={index} user={user} isLoading={isLoading} isScrolling={isScrolling} />
						)}
						components={{
							List: ListContainer,
							Item: ItemContainer,
							// ScrollSeekPlaceholder: ({ height, width, index }) => (
							// 	<ItemContainer>
							// 		<ItemWrapper>
							// 			{'--'} - {index}
							// 		</ItemWrapper>
							// 	</ItemContainer>
							// ),
						}}
						computeItemKey={computeItemKey}
						isScrolling={onScrollingStateChange}
						// overscan={200}
						// scrollSeekConfiguration={{
						// 	enter: velocity => Math.abs(velocity) > 200,
						// 	exit: velocity => Math.abs(velocity) < 30,
						// 	// change: (_, range) => console.log({ range }),
						// }}
					/>
				</Context.Provider>
			</Box>
		)
	},
)

AccountsList.defaultProps = defaultProps
