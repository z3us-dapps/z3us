import clsx from 'clsx'
import React from 'react'

import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'
import { ChevronDown2Icon, ChevronRightIcon } from 'ui/src/components/icons'

import { Link } from '@src/components/link'
import Translation from '@src/components/translation'
import { AccountSearch } from '@src/containers/playground/containers/accounts/account-search'
import { useAccountParams } from '@src/hooks/use-account-params'

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
								<Link underline="hover" to={`/accounts/${account}`}>
									<Text size="large">
										<Translation text="accounts.assetsList.overview" />
										{account ? `: ${account}` : ''}
									</Text>
								</Link>
							</Box>
						) : (
							<Box>
								<Text size="large">Account balance</Text>
							</Box>
						)}
						{assetType ? (
							<Box display="flex" alignItems="center">
								<Box display="flex" alignItems="center">
									<ChevronRightIcon />
								</Box>
								{asset ? (
									<Link underline="hover" to={`/accounts/${account}/${assetType}`}>
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
								<Box display="flex" alignItems="center">
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
							// eslint-disable-next-line
							console.log(_value)
						}}
					/>
				</Box>
			</Box>
			<Box width="full">
				<Box position="relative" paddingBottom="medium" className={styles.tokenListGridWrapper}>
					<Box component="button" className={styles.tokenListHeaderButton}>
						<Text size="xsmall" weight="medium">
							<Translation text="accounts.assetsList.listHeaderAsset" />
						</Text>
					</Box>
					<Box component="button" className={styles.tokenListHeaderButton}>
						<Text size="xsmall" weight="medium">
							<Translation text="accounts.assetsList.listHeaderAmount" />
						</Text>
					</Box>
					<Box component="button" className={styles.tokenListHeaderButton}>
						<Text size="xsmall" weight="medium">
							<Translation text="accounts.assetsList.listHeaderCategory" />
						</Text>
						<ChevronDown2Icon />
					</Box>
					<Box component="button" className={styles.tokenListHeaderButton}>
						<Text size="xsmall" weight="medium">
							<Translation text="accounts.assetsList.listHeaderAccount" />
						</Text>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

AccountListHeader.defaultProps = defaultProps
