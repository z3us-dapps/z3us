import clsx from 'clsx'
import { useGlobalResourceBalances } from 'packages/ui/src/hooks/dapp/use-balances'
import { useNoneSharedStore } from 'packages/ui/src/hooks/use-store'
import { formatBigNumber } from 'packages/ui/src/utils/formatters'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { ArrowUpIcon, ChevronRightIcon, EyeIcon, EyeOffIcon, SearchIcon } from 'ui/src/components/icons'
import { Button } from 'ui/src/components/router-button'
import { Link } from 'ui/src/components/router-link'
import { TextScramble } from 'ui/src/components/text-scramble'
import { ToolTip } from 'ui/src/components/tool-tip'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { useAccountParams } from 'ui/src/hooks/use-account-params'

import * as styles from './assets-header.css'

interface IAccountRoutesProps {
	scrollableNode: HTMLElement
	isScrolledTop: boolean
}

export const AssetsHeader: React.FC<IAccountRoutesProps> = props => {
	const { isScrolledTop, scrollableNode } = props

	const { account, assetType, asset } = useAccountParams()

	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))
	const { pathname } = useLocation()
	const { totalValue, isLoading } = useGlobalResourceBalances()
	const [hidden, setHidden] = useState<boolean>(false)

	const isBreadCrumbVisible = !!assetType

	const handleUpClick = () => {
		if (!scrollableNode) return
		scrollableNode.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const handleToggleHidden = () => {
		setHidden(!hidden)
	}

	return (
		<Box className={styles.assetsHeaderWrapper}>
			<Box display="flex" width="full">
				<Box flexGrow={1}>
					<Box className={styles.accountBreadCrumbWrapper}>
						{isBreadCrumbVisible ? (
							<Box display="flex" alignItems="center" color="colorNeutral">
								<Link size="large" to="/accounts/all" underline="hover">
									Overview
								</Link>
								<ChevronRightIcon />
								<Link size="large" to="/accounts/xrd" color="strong" underline="hover">
									Token
								</Link>
								{asset && (
									<>
										<ChevronRightIcon />
										<Link size="large" to="/accounts/settings" color="strong">
											Overview
										</Link>
									</>
								)}
							</Box>
						) : (
							<Box>
								<Text size="large">
									<Translation capitalizeFirstLetter text="accounts.home.accountBalanceTitle" />
								</Text>
							</Box>
						)}
					</Box>
					<Box display="flex" alignItems="center" gap="small">
						<Box flexGrow={1} display="flex" flexDirection="column" gap="xxsmall">
							<Box display="flex" alignItems="center" gap="medium">
								<TextScramble scramble={hidden}>
									<Text weight="medium" size="xxxlarge" color="strong" truncate blur={hidden}>
										{isLoading ? 'Loading...' : `${formatBigNumber(totalValue, currency, 2)}`}
									</Text>
								</TextScramble>
								<ToolTip
									theme="backgroundPrimary"
									message={hidden ? 'accounts.home.accountShowBalance' : 'accounts.home.accountHideBalance'}
								>
									<Button onClick={handleToggleHidden} styleVariant="ghost" sizeVariant="small" iconOnly>
										{hidden ? <EyeIcon /> : <EyeOffIcon />}
									</Button>
								</ToolTip>
							</Box>
							<TextScramble scramble={hidden}>
								<Text size="xxsmall" color="green" weight="medium">
									+$0.39 (+0.29%)
								</Text>
							</TextScramble>
						</Box>
						<Box className={clsx(styles.assetsHeaderUpWrapper, !isScrolledTop && styles.assetsHeaderUpVisibleWrapper)}>
							<ToolTip theme="backgroundPrimary" message="global.up">
								<Button onClick={handleUpClick} styleVariant="ghost" sizeVariant="small" iconOnly>
									<ArrowUpIcon />
								</Button>
							</ToolTip>
						</Box>
						<ToolTip theme="backgroundPrimary" message="global.search">
							<Button to={`${pathname}?query=hello`} styleVariant="ghost" sizeVariant="small" iconOnly>
								<SearchIcon />
							</Button>
						</ToolTip>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}
