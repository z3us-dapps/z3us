import clsx from 'clsx'
import React, { forwardRef } from 'react'

import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'

import Translation from '@src/components/translation'

import * as styles from './account-index-header.css'

interface IAccountIndexHeaderRequiredProps {}

interface IAccountIndexHeaderOptionalProps {
	className?: string
}

interface IAccountIndexHeaderProps extends IAccountIndexHeaderRequiredProps, IAccountIndexHeaderOptionalProps {}

const defaultProps: IAccountIndexHeaderOptionalProps = {
	className: undefined,
}

export const AccountIndexHeader = forwardRef<HTMLElement, IAccountIndexHeaderProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className } = props

		return (
			<Box ref={ref} className={clsx(className, styles.accountIndexWrapper)}>
				<Box display="flex" width="full">
					<Box flexGrow={1}>
						<Box display="flex" alignItems="center" paddingBottom="xsmall" flexGrow={0}>
							<Box>
								<Text size="large">
									<Translation capitalizeFirstLetter text="accounts.home.accountBalanceTitle" />
								</Text>
							</Box>
						</Box>
						<Text weight="medium" size="xxxlarge" color="strong" truncate>
							$4,440,206.254,440,206.254,440,206.254,440,206.254,440,206.254,440,206.254,440,206.25
						</Text>
					</Box>
				</Box>
			</Box>
		)
	},
)

AccountIndexHeader.defaultProps = defaultProps
