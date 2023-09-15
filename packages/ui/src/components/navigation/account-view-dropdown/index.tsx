import clsx, { type ClassValue } from 'clsx'
import { useZdtState } from 'packages/ui/src/hooks/zdt/use-zdt'
import { Theme } from 'packages/ui/src/types/types'
import React, { forwardRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Box } from 'ui/src/components/box'
import type { TStyleVariant } from 'ui/src/components/button'
import { Button } from 'ui/src/components/button'
import {
	DropdownMenu,
	DropdownMenuArrow,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuItemIndicator,
	DropdownMenuLabel,
	DropdownMenuLeftSlot,
	DropdownMenuPortal,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuRightSlot,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from 'ui/src/components/dropdown-menu'
import {
	CheckIcon,
	ChevronRightIcon,
	HardwareWalletIcon,
	HomeIcon,
	LockIcon,
	MenuIcon,
	MoonIcon,
	ShareIcon,
	SunIcon,
	Z3usIcon,
} from 'ui/src/components/icons'
import { Link } from 'ui/src/components/router-link'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { useDappStatus } from 'ui/src/hooks/use-dapp-status'
import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'
import { useSharedStore } from 'ui/src/hooks/use-store'
import { useTheme } from 'ui/src/hooks/use-theme'
import { KeystoreType } from 'ui/src/store/types'

import { ToolTip } from '../../tool-tip'
import * as styles from './styles.css'

interface IAccountViewDropdownProps {
	className?: ClassValue
	styleVariant?: TStyleVariant
}

const weights = {
	[KeystoreType.RADIX_WALLET]: 1,
	[KeystoreType.HARDWARE]: 2,
	[KeystoreType.LOCAL]: 3,
}

export const AccountViewDropdown = forwardRef<HTMLElement, IAccountViewDropdownProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className, styleVariant = 'ghost' } = props

		const { t } = useTranslation()
		const { lock } = useZdtState()
		const dappStatus = useDappStatus()
		const isMobile = useIsMobileWidth()
		const { resolvedTheme, theme, setTheme } = useTheme()
		const { selectedKeystoreId, keystores, selectKeystore } = useSharedStore(state => ({
			selectedKeystoreId: state.selectedKeystoreId,
			keystores: state.keystores,
			selectKeystore: state.selectKeystoreAction,
		}))

		const [isSwitchingKeystore, setIsSwitchingKeystore] = useState<boolean>(false)

		const handleSelectKeystore = async (id: string) => {
			setIsSwitchingKeystore(true)
			try {
				await lock()
				selectKeystore(id)
			} catch (err) {
				console.error(err)
			} finally {
				setIsSwitchingKeystore(false)
			}
		}

		return (
			<Box ref={ref} className={clsx(styles.accountViewDropdownWrapper, className)}>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Box>
							<ToolTip message="global.menu">
								<Button styleVariant={styleVariant} sizeVariant="small" rounded iconOnly>
									<MenuIcon />
								</Button>
							</ToolTip>
						</Box>
					</DropdownMenuTrigger>
					<DropdownMenuPortal>
						<DropdownMenuContent
							align={isMobile ? 'start' : 'end'}
							sideOffset={2}
							className={styles.accountViewContentWrapper}
						>
							<Box className={styles.accountViewPaddingWrapper}>
								{dappStatus && (
									<DropdownMenuLabel>
										<Text size="xsmall" weight="strong" color="strong">
											<Translation capitalizeFirstLetter text="walletDropdown.contentScriptTitle" />{' '}
											<Link href="https://ociswap.com/">
												<Text size="xsmall" weight="strong" color="strong">
													{dappStatus.currentTabHost}
												</Text>
											</Link>
										</Text>
									</DropdownMenuLabel>
								)}
								<DropdownMenuLabel>
									<Text size="xsmall" weight="strong" color="strong">
										<Translation capitalizeFirstLetter text="walletDropdown.walletTitle" />
									</Text>
								</DropdownMenuLabel>
								<DropdownMenuRadioGroup
									disabled={isSwitchingKeystore}
									value={selectedKeystoreId}
									onValueChange={handleSelectKeystore}
								>
									{[...keystores]
										.sort((a, b) => weights[a.type] - weights[b.type])
										.map(keystore => (
											<DropdownMenuRadioItem key={keystore.id} value={keystore.id}>
												<DropdownMenuLeftSlot>
													{keystore.type === KeystoreType.RADIX_WALLET && <HomeIcon />}
													{keystore.type === KeystoreType.HARDWARE && <HardwareWalletIcon />}
													{keystore.type === KeystoreType.LOCAL && <Z3usIcon />}
												</DropdownMenuLeftSlot>
												<Box flexGrow={1} marginLeft="small">
													<Text size="xsmall"> {keystore.name}</Text>
												</Box>
												<DropdownMenuItemIndicator>
													<CheckIcon />
												</DropdownMenuItemIndicator>
											</DropdownMenuRadioItem>
										))}
								</DropdownMenuRadioGroup>
								<DropdownMenuSeparator />
							</Box>

							<Box className={styles.accountViewPaddingWrapper}>
								<DropdownMenuItem>
									<DropdownMenuLeftSlot>
										<LockIcon />
									</DropdownMenuLeftSlot>
									<Box display="flex" marginLeft="small">
										<Text size="xsmall" truncate>
											<Translation capitalizeFirstLetter text="walletDropdown.lockTitle" />
										</Text>
									</Box>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<DropdownMenuLeftSlot>
										<ShareIcon />
									</DropdownMenuLeftSlot>
									<Box display="flex" marginLeft="small">
										<Text size="xsmall" truncate>
											<Translation capitalizeFirstLetter text="walletDropdown.openInBrowserTitle" />
										</Text>
									</Box>
								</DropdownMenuItem>
								<DropdownMenuSub>
									<DropdownMenuSubTrigger>
										<DropdownMenuLeftSlot>
											{resolvedTheme === Theme.LIGHT && <SunIcon />}
											{resolvedTheme === Theme.DARK && <MoonIcon />}
										</DropdownMenuLeftSlot>
										<Box flexGrow={1} display="flex" marginLeft="small">
											<Text size="xsmall" truncate>
												<Translation capitalizeFirstLetter text="walletDropdown.theme" />
											</Text>
										</Box>
										<DropdownMenuRightSlot>
											<ChevronRightIcon />
										</DropdownMenuRightSlot>
									</DropdownMenuSubTrigger>
									<DropdownMenuPortal>
										<DropdownMenuSubContent>
											<DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
												{[
													{ id: Theme.LIGHT, title: t('settings.theme.options.light') },
													{ id: Theme.DARK, title: t('settings.theme.options.dark') },
													{ id: Theme.SYSTEM, title: t('settings.theme.options.system') },
												].map(({ id, title }) => (
													<DropdownMenuRadioItem key={id} value={id}>
														<Box flexGrow={1} marginLeft="small">
															<Text size="xsmall" capitalizeFirstLetter>
																{title}
															</Text>
														</Box>
														<DropdownMenuItemIndicator>
															<CheckIcon />
														</DropdownMenuItemIndicator>
													</DropdownMenuRadioItem>
												))}
											</DropdownMenuRadioGroup>
										</DropdownMenuSubContent>
									</DropdownMenuPortal>
								</DropdownMenuSub>
							</Box>
							<DropdownMenuArrow />
						</DropdownMenuContent>
					</DropdownMenuPortal>
				</DropdownMenu>
			</Box>
		)
	},
)
