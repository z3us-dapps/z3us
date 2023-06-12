import clsx, { type ClassValue } from 'clsx'
import React, { forwardRef } from 'react'
import { useLocation } from 'react-router-dom'

import { Box } from 'ui/src/components-v2/box'
import { ToolTip } from 'ui/src/components-v2/tool-tip'
import { Text } from 'ui/src/components-v2/typography'
import { SearchIcon } from 'ui/src/components/icons'

import { Button } from '@src/components/button'
import Translation from '@src/components/translation'

import * as styles from './account-index-header.css'

interface IAccountIndexHeaderRequiredProps {}

interface IAccountIndexHeaderOptionalProps {
	className?: ClassValue
}

interface IAccountIndexHeaderProps extends IAccountIndexHeaderRequiredProps, IAccountIndexHeaderOptionalProps {}

const defaultProps: IAccountIndexHeaderOptionalProps = {
	className: undefined,
}

export const AccountIndexHeader = forwardRef<HTMLElement, IAccountIndexHeaderProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className } = props
		const { pathname } = useLocation()

		return (
			<Box ref={ref} className={clsx(className, styles.accountIndexWrapper)}>
				<Box display="flex" width="full">
					<Box flexGrow={1}>
						<Box display="flex" alignItems="center" paddingBottom="medium" flexGrow={0}>
							<Box>
								<Text size="large">
									<Translation capitalizeFirstLetter text="accounts.home.accountBalanceTitle" />
								</Text>
							</Box>
						</Box>
						<Box display="flex" alignItems="center" gap="small">
							<Box flexGrow={1}>
								<Text weight="medium" size="xxxlarge" color="strong" truncate>
									$4,440,206.254,440,206.254,440,206.254,440,206.254,440,206.254,440,206.254,440,206.25
								</Text>
							</Box>
							<ToolTip theme="backgroundPrimary" message={<Translation capitalizeFirstLetter text="global.search" />}>
								<Button
									to={`${pathname}?query=hello`}
									styleVariant="ghost"
									sizeVariant="small"
									iconOnly
								>
									<SearchIcon />
								</Button>
							</ToolTip>
						</Box>
					</Box>
				</Box>
			</Box>
		)
	},
)

AccountIndexHeader.defaultProps = defaultProps
