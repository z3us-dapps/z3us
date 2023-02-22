import React from 'react'
import { Box } from 'ui/src/components-v2/box'
import { useAccountParams } from '@src/containers/playground/hooks/use-account-params'
import { Link } from '@src/components/link'
import { ChevronDown2Icon, ChevronRightIcon } from 'ui/src/components/icons'
import { AccountSearch } from '@src/containers/playground/containers/accounts/account-search'
import { Text } from 'ui/src/components-v2/typography'
import clsx from 'clsx'

import * as styles from './accounts-list.css'

interface IAccountListHeaderRequiredProps {
	isScrolled: boolean
}

interface IAccountListHeaderOptionalProps {
	className?: string
}

interface IAccountListHeaderProps extends IAccountListHeaderRequiredProps, IAccountListHeaderOptionalProps {}

const defaultProps: IAccountListHeaderOptionalProps = {
	className: undefined,
}

export const AccountListHeader: React.FC<IAccountListHeaderProps> = props => {
	const { className, isScrolled } = props

	const { account, assetType, asset } = useAccountParams()

	return (
		<Box
			className={clsx(className, styles.accountListHeaderWrapper, isScrolled && styles.accountListHeaderWrapperShadow)}
		>
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
					<Text weight="medium" size="xxxlarge" color="strong">
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
	)
}

AccountListHeader.defaultProps = defaultProps
