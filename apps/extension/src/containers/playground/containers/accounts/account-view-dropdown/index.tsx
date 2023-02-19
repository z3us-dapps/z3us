/* eslint-disable */
import React, { forwardRef, useEffect, useState } from 'react'
import { Box } from 'ui/src/components-v2/box'
import { MixerHorizontalIcon, DashboardIcon } from '@radix-ui/react-icons'
import { CheckIcon, PlusIcon, MagnifyingGlassIcon, ChevronDown2Icon } from 'ui/src/components/icons'
import { Button } from 'ui/src/components-v2/button'
import {
	Select,
	SelectTrigger,
	SelectPortal,
	SelectContent,
	SelectViewport,
	SelectGroup,
	SelectItem,
	SelectItemText,
	SelectItemIndicator,
	SelectScrollUpButton,
	SelectScrollDownButton,
} from 'ui/src/components-v2/select'

import { Text } from 'ui/src/components-v2/typography'
import { Link } from '@src/components/link'

import clsx from 'clsx'

import * as styles from './account-view-dropdown.css'
import { SelectIcon, SelectValue } from 'ui/src/components/select'

interface IAccountViewDropdownRequiredProps {
	// onChange: (view: string) => void
}

interface IAccountViewDropdownOptionalProps {
	className?: number
}

interface IAccountViewDropdownProps extends IAccountViewDropdownRequiredProps, IAccountViewDropdownOptionalProps {}

const defaultProps: IAccountViewDropdownOptionalProps = {
	className: undefined,
}

export const AccountViewDropdown = forwardRef<HTMLElement, IAccountViewDropdownProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className } = props

		const handleChangeView = (_view: string) => {}

		return (
			<Box ref={ref} className={clsx(styles.transactionWrapper, className)}>
				<Select onValueChange={handleChangeView} value="1">
					<SelectTrigger asChild>
						<Button
							styleVariant="tertiary"
							sizeVariant="small"
							rounded
							leftIcon={<Box borderRadius="full" width="large" height="large" style={{ background: 'purple' }}></Box>}
							rightIcon={<ChevronDown2Icon />}
						>
							<SelectValue />
						</Button>
					</SelectTrigger>
					<SelectPortal>
						<SelectContent>
							<SelectScrollUpButton />
							<SelectViewport>
								<SelectItem value="1">Savings</SelectItem>
								<SelectItem value="2">Degen</SelectItem>
								<SelectItem value="3">Nft's</SelectItem>
							</SelectViewport>
							<SelectScrollDownButton />
						</SelectContent>
					</SelectPortal>
				</Select>
			</Box>
		)
	},
)

AccountViewDropdown.defaultProps = defaultProps
