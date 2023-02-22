import React, { forwardRef } from 'react'
import Translation from '@src/components/translation'
import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'
import clsx from 'clsx'

import * as styles from './account-index-header.css'

interface IAccountIndexHeaderRequiredProps {
	scrollTop: number
}

interface IAccountIndexHeaderOptionalProps {
	className?: string
}

interface IAccountIndexHeaderProps extends IAccountIndexHeaderRequiredProps, IAccountIndexHeaderOptionalProps {}

const defaultProps: IAccountIndexHeaderOptionalProps = {
	className: undefined,
}

export const AccountIndexHeader = forwardRef<HTMLElement, IAccountIndexHeaderProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className, scrollTop } = props

		const isScrolled = scrollTop > 0

		return (
			<Box
				ref={ref}
				className={clsx(className, styles.accountIndexWrapper, isScrolled && styles.accountIndexWrapperShadow)}
			>
				<Box display="flex" width="full">
					<Box flexGrow={1}>
						<Box display="flex" alignItems="center" paddingBottom="xsmall" flexGrow={0}>
							<Box>
								<Text size="large">
									<Translation text="accounts.home.accountBalanceTitle" />
								</Text>
							</Box>
						</Box>
						<Text weight="medium" size="xxxlarge" color="strong">
							$4,440,206.25
						</Text>
					</Box>
				</Box>
			</Box>
		)
	},
)

AccountIndexHeader.defaultProps = defaultProps
