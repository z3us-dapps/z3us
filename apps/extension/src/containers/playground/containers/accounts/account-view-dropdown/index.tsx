import React, { forwardRef } from 'react'
import { Box } from 'ui/src/components-v2/box'
import { CheckIcon, ChevronDown2Icon } from 'ui/src/components/icons'
import { Button } from 'ui/src/components-v2/button'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuArrow,
	DropdownMenuItemIndicator,
	DropdownMenuLeftSlot,
} from 'ui/src/components-v2/dropdown-menu'

import { Text } from 'ui/src/components-v2/typography'

import clsx from 'clsx'

import * as styles from './account-view-dropdown.css'

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

		return (
			<Box ref={ref} className={clsx(styles.transactionWrapper, className)}>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							styleVariant="tertiary"
							sizeVariant="small"
							rounded
							leftIcon={<Box borderRadius="full" width="large" height="large" style={{ background: 'purple' }} />}
							rightIcon={<ChevronDown2Icon />}
						>
							Savings
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent side="bottom" sideOffset={0} align="end" alignOffset={0}>
						{/* <DropdownMenuLabel> */}
						{/* 	<Text size="xsmall" weight="strong" color="strong"> */}
						{/* 		Accounts */}
						{/* 	</Text> */}
						{/* </DropdownMenuLabel> */}
						<DropdownMenuRadioGroup value="light" onValueChange={() => {}}>
							<DropdownMenuRadioItem value="light">
								<DropdownMenuLeftSlot>
									<Box
										style={{ width: '60px', height: '40px' }}
										borderRadius="small"
										background="backgroundPrimary"
										marginRight="small"
									/>
								</DropdownMenuLeftSlot>
								<Box flexGrow={1}>
									<Text size="xsmall">Savings</Text>
								</Box>
								<DropdownMenuItemIndicator>
									<CheckIcon />
								</DropdownMenuItemIndicator>
							</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="dark">
								<DropdownMenuLeftSlot>
									<Box
										style={{ width: '60px', height: '40px' }}
										borderRadius="small"
										background="backgroundPrimary"
										marginRight="small"
									/>
								</DropdownMenuLeftSlot>
								<Box flexGrow={1}>
									<Text size="xsmall">Degen account</Text>
								</Box>
								<DropdownMenuItemIndicator>
									<CheckIcon />
								</DropdownMenuItemIndicator>
							</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="dark">
								<DropdownMenuLeftSlot>
									<Box
										style={{ width: '60px', height: '40px' }}
										borderRadius="small"
										background="backgroundPrimary"
										marginRight="small"
									/>
								</DropdownMenuLeftSlot>
								<Box flexGrow={1}>
									<Text size="xsmall">Defi account</Text>
								</Box>
								<DropdownMenuItemIndicator>
									<CheckIcon />
								</DropdownMenuItemIndicator>
							</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="dark">
								<DropdownMenuLeftSlot>
									<Box
										style={{ width: '60px', height: '40px' }}
										borderRadius="small"
										background="backgroundPrimary"
										marginRight="small"
									/>
								</DropdownMenuLeftSlot>
								<Box flexGrow={1}>
									<Text size="xsmall">Payments account</Text>
								</Box>
								<DropdownMenuItemIndicator>
									<CheckIcon />
								</DropdownMenuItemIndicator>
							</DropdownMenuRadioItem>
						</DropdownMenuRadioGroup>
						<DropdownMenuArrow />
					</DropdownMenuContent>
				</DropdownMenu>
			</Box>
		)
	},
)

AccountViewDropdown.defaultProps = defaultProps
