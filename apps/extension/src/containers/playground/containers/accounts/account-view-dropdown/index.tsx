import clsx, { type ClassValue } from 'clsx'
import React, { forwardRef } from 'react'

import { Box } from 'ui/src/components-v2/box'
import { Button, TStyleVariant } from 'ui/src/components-v2/button'
import {
	DropdownMenu,
	DropdownMenuArrow,
	DropdownMenuContent,
	DropdownMenuItemIndicator,
	DropdownMenuLeftSlot,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from 'ui/src/components-v2/dropdown-menu'
import { ScrollArea } from 'ui/src/components-v2/scroll-area'
import { Text } from 'ui/src/components-v2/typography'
import { CheckIcon, ChevronDownIcon } from 'ui/src/components/icons'

import { useIsMobileWidth } from '@src/hooks/use-is-mobile'

import * as styles from './account-view-dropdown.css'

interface IAccountViewDropdownRequiredProps {
	// onChange: (view: string) => void
}

interface IAccountViewDropdownOptionalProps {
	className?: ClassValue
	styleVariant?: TStyleVariant
}

interface IAccountViewDropdownProps extends IAccountViewDropdownRequiredProps, IAccountViewDropdownOptionalProps {}

const defaultProps: IAccountViewDropdownOptionalProps = {
	className: undefined,
	styleVariant: 'tertiary',
}

export const AccountViewDropdown = forwardRef<HTMLElement, IAccountViewDropdownProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className, styleVariant } = props

		const isMobile = useIsMobileWidth()

		// TODO: count will come from store
		const MENU_ITEMS = 10

		return (
			<Box ref={ref} className={clsx(styles.accountViewDropdownWrapper, className)}>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							styleVariant={styleVariant}
							sizeVariant="small"
							rounded
							leftIcon={<Box borderRadius="full" width="large" height="large" style={{ background: 'purple' }} />}
							rightIcon={<ChevronDownIcon />}
						>
							Savings
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						align={isMobile ? 'start' : 'end'}
						sideOffset={2}
						className={styles.accountViewContentWrapper}
						style={{ height: `${MENU_ITEMS * 56}px` }}
					>
						<ScrollArea>
							<Box className={styles.accountViewScrollAreaWrapper}>
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
							</Box>
						</ScrollArea>
						<DropdownMenuArrow />
					</DropdownMenuContent>
				</DropdownMenu>
			</Box>
		)
	},
)

AccountViewDropdown.defaultProps = defaultProps
