import React, { forwardRef, useEffect, useState } from 'react'
import { Box } from 'ui/src/components-v2/box'
import { PlusIcon, MagnifyingGlassIcon } from 'ui/src/components/icons'
import { Text } from 'ui/src/components-v2/typography'
import clsx from 'clsx'

import * as styles from './account-activity.css'

interface IAccountActivityRequiredProps {}

interface IAccountActivityOptionalProps {
	className?: number
	onClick?: () => void
	iconOnly?: boolean
}

interface IAccountSwitcherProps extends IAccountActivityRequiredProps, IAccountActivityOptionalProps {}

const defaultProps: IAccountActivityOptionalProps = {
	className: undefined,
	onClick: undefined,
	iconOnly: false,
}

export const AccountActivity = forwardRef<HTMLButtonElement, IAccountSwitcherProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { disabled, iconOnly, onClick, className, sizeVariant, styleVariant } = props

		return (
			<Box ref={ref} className={styles.activityWrapper}>
				{[
					{ id: 'df', title: 'geebs' },
					{ id: 'asdfasdf', title: 'geebs' },
					{ id: 'adfdhfuh', title: 'geebs' },
					{ id: 'as773hf', title: 'Another geebs' },
					{ id: '88833', title: 'Aasdfahghgngn geebs' },
					{ id: '884848', title: 'djfjfj884' },
				].map(({ id }) => (
					<Box key={id} className={styles.activtyItem}>
						<Box className={styles.activtyItemInner}>
							<Box className={styles.indicatorCircle}>
								<PlusIcon />
							</Box>
							<Box display="flex" flexDirection="column" flexGrow={1}>
								<Text weight="strong" size="medium" color="strong">
									$40,452
								</Text>
								<Text size="small">$40,452</Text>
							</Box>
							<Box display="flex" flexDirection="column">
								<Text weight="strong" size="small" color="red">
									$40,452
								</Text>
								<Text weight="strong" size="small" color="green">
									$40,452
								</Text>
							</Box>
						</Box>
					</Box>
				))}
			</Box>
		)
	},
)

AccountActivity.defaultProps = defaultProps
