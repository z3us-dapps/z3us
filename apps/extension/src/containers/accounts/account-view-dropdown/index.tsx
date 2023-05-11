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
	DropdownMenuPortal,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from 'ui/src/components-v2/dropdown-menu'
import SimpleBar from 'ui/src/components-v2/simple-bar'
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
	isLeftButtonIconVisible?: boolean
}

interface IAccountViewDropdownProps extends IAccountViewDropdownRequiredProps, IAccountViewDropdownOptionalProps {}

const defaultProps: IAccountViewDropdownOptionalProps = {
	className: undefined,
	styleVariant: 'tertiary',
	isLeftButtonIconVisible: true,
}

export const AccountViewDropdown = forwardRef<HTMLElement, IAccountViewDropdownProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className, styleVariant, isLeftButtonIconVisible } = props

		const isMobile = useIsMobileWidth()

		return (
			<Box ref={ref} className={clsx(styles.accountViewDropdownWrapper, className)}>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							styleVariant={styleVariant}
							sizeVariant="small"
							rounded
							leftIcon={
								isLeftButtonIconVisible ? (
									<Box borderRadius="full" width="large" height="large" style={{ background: 'purple' }} />
								) : null
							}
							rightIcon={<ChevronDownIcon />}
						>
							Savings
						</Button>
					</DropdownMenuTrigger>

					<DropdownMenuPortal>
						<DropdownMenuContent
							align={isMobile ? 'start' : 'end'}
							sideOffset={2}
							className={styles.accountViewContentWrapper}
						>
							<SimpleBar className={styles.accountViewSimpleBarWrapper}>
								<Box className={styles.accountViewScrollAreaWrapper}>
									<DropdownMenuRadioGroup value="light" onValueChange={() => {}}>
										<DropdownMenuRadioItem value="light">
											<DropdownMenuLeftSlot>
												<Box
													style={{ width: '60px', height: '40px' }}
													borderRadius="small"
													flexShrink={0}
													background="backgroundPrimary"
													marginRight="small"
												/>
											</DropdownMenuLeftSlot>
											<Box flexGrow={1} style={{ maxWidth: '98px' }}>
												<Text size="xsmall" truncate>
													Savings Savings Savings Savings Savings
												</Text>
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
							</SimpleBar>
							<DropdownMenuArrow />
						</DropdownMenuContent>
					</DropdownMenuPortal>
				</DropdownMenu>
			</Box>
		)
	},
)

AccountViewDropdown.defaultProps = defaultProps
