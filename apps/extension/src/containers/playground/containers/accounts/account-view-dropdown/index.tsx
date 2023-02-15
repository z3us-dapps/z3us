/* eslint-disable */
import React, { forwardRef, useEffect, useState } from 'react'
import { Box } from 'ui/src/components-v2/box'
import { MixerHorizontalIcon, DashboardIcon } from '@radix-ui/react-icons'
import { CheckIcon, PlusIcon, MagnifyingGlassIcon } from 'ui/src/components/icons'
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

import * as SelectPrim from '@radix-ui/react-select'

import { Text } from 'ui/src/components-v2/typography'
import { Link } from '@src/components/link'

import clsx from 'clsx'

import * as styles from './account-view-dropdown.css'
import { SelectIcon, SelectValue } from 'ui/src/components/select'

interface IAccountViewDropdownRequiredProps {
	onChange: (view: string) => void
	view: 'list' | 'two-col' | 'three-col'
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
		const { onChange, className, view } = props

		const handleChangeView = (_view: string) => {
			onChange(_view)
		}

		return (
			<Box ref={ref} className={clsx(styles.transactionWrapper, className)}>
				<Select onValueChange={handleChangeView}>
					<SelectTrigger asChild iconOnly>
						<Button styleVariant="secondary" sizeVariant="medium" iconOnly>
							<SelectValue className="test" />
							<DashboardIcon />
						</Button>
					</SelectTrigger>
					<SelectPortal>
						<SelectContent>
							<SelectScrollUpButton />
							<SelectViewport>
								<SelectItem value="1">Single column</SelectItem>
								<SelectItem value="2">Two column</SelectItem>
								<SelectItem value="3">Three column</SelectItem>
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
