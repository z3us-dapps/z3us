import React, { forwardRef, useState } from 'react'
import { Box } from 'ui/src/components-v2/box'
import { Virtuoso } from 'react-virtuoso'
import { ChevronDown2Icon, ShareIcon } from 'ui/src/components/icons'
import { motion, AnimatePresence } from 'framer-motion'
import { Text } from 'ui/src/components-v2/typography'
import { Button } from '@src/components/button'
import { TransactionIcon } from '@src/containers/playground/components/transaction-icon'
import clsx from 'clsx'

import * as styles from './account-activity.css'

interface IAccountActivityRequiredProps {}

interface IAccountActivityOptionalProps {}

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
	{ id: 'ifjf2111', title: 'what' },
]

const ListContainer = React.forwardRef<HTMLDivElement>((props, ref) => <div ref={ref} {...props} />)

const ItemContainer = props => <Box {...props} className={styles.activtyItem} />

const ItemWrapper = props => {
	const { user, selected, setSelected, hovered, setHovered } = props

	const isSelected = selected === user.id
	const isHovered = hovered === user.id

	const handleClickItem = () => {
		setSelected(isSelected ? null : user.id)
	}

	return (
		<Box className={styles.activtyItemOuter}>
			<Box className={clsx(styles.activtyItemInner, (isSelected || isHovered) && styles.activtyItemInnerSelected)}>
				<Box
					onClick={handleClickItem}
					className={styles.activtyItemInnerBtn}
					onMouseOver={() => setHovered(user.id)}
					onMouseLeave={() => setHovered(null)}
				>
					<Box className={styles.indicatorCircle}>
						<TransactionIcon transactionType="deposit" />
					</Box>
					<Box display="flex" flexDirection="column" flexGrow={1}>
						<Text weight="stronger" size="small" color="strong">
							+1.249 XRD
						</Text>
						<Text size="xsmall">29 Aug, 10est, 2023</Text>
					</Box>
					<Box
						opacity={isSelected ? 1 : 0}
						display="flex"
						alignItems="center"
						flexShrink={0}
						gap="xsmall"
						marginRight="xlarge"
						color="colorNeutral"
						pointerEvents="none"
						transition="fast"
					>
						<ChevronDown2Icon />
					</Box>
				</Box>
				<AnimatePresence initial={false}>
					{isSelected && (
						<motion.section
							key="content"
							initial="collapsed"
							animate="open"
							exit="collapsed"
							variants={{
								collapsed: {
									opacity: 0,
									height: 0,
									transition: { delay: 0.2, duration: 0.2 },
								},
								open: {
									opacity: 1,
									height: 'auto',
									transition: { delay: 0, duration: 0.2 },
								},
							}}
							className={styles.activtyItemInnerSelectedContent}
						>
							<motion.div
								initial="collapsed"
								animate="open"
								exit="collapsed"
								variants={{
									collapsed: {
										opacity: 0,
										transition: { delay: 0, duration: 0.2 },
									},
									open: {
										opacity: 1,
										transition: { delay: 0.2, duration: 0.2 },
									},
								}}
							>
								<Box
									display="flex"
									flexDirection="column"
									position="relative"
									width="full"
									gap="medium"
									marginTop="medium"
									paddingTop="medium"
									paddingBottom="large"
									borderTop={1}
									borderStyle="solid"
									borderColor="wax600"
								>
									<Box display="flex" gap="medium">
										<Box>
											<Text weight="stronger" size="xxsmall" color="strong">
												Type
											</Text>
										</Box>
										<Box className={styles.transactionDottedLine} />
										<Text size="xxsmall">Deposit</Text>
									</Box>
									<Box display="flex" gap="medium">
										<Box>
											<Text weight="stronger" size="xxsmall" color="strong">
												Transaction ID
											</Text>
										</Box>
										<Box className={styles.transactionDottedLine} />
										<Text size="xxsmall">Deposit</Text>
									</Box>
								</Box>
							</motion.div>
						</motion.section>
					)}
				</AnimatePresence>
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

export const AccountActivity = forwardRef<HTMLElement, IAccountSwitcherProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const [selected, setSelected] = useState<string | null>(null)
		const [hovered, setHovered] = useState<string | null>(null)

		return (
			<Box className={clsx(styles.activityWrapper)} style={{ minHeight: '100px' }}>
				<Virtuoso
					customScrollParent={ref as any}
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
