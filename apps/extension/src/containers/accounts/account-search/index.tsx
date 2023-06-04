/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx, { type ClassValue } from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import { Box } from 'ui/src/components-v2/box'
import { Dialog, DialogContent, DialogOverlay, DialogPortal } from 'ui/src/components-v2/dialog'
import type { FormElement} from 'ui/src/components-v2/input';
import { Input } from 'ui/src/components-v2/input'
import { ScrollArea } from 'ui/src/components-v2/scroll-area'
import { ToolTip } from 'ui/src/components-v2/tool-tip'
import { Text } from 'ui/src/components-v2/typography'
import { Close2Icon, ShareIcon } from 'ui/src/components/icons'
import { capitalizeFirstLetter } from 'ui/src/utils/capitalize-first-letter'

import { Button } from '@src/components/button'
import { CopyAddressButton } from '@src/components/copy-address-button'
import { TransactionIcon } from '@src/components/transaction-icon'
import Translation from '@src/components/translation'
import {
	ACCOUNT_PARAM_ACTIVITY,
	ACCOUNT_PARAM_ASSET,
	ACCOUNT_PARAM_QUERY,
	ACCOUNT_PARAM_TRANSACTION_ID,
} from '@src/constants'
import { getShortAddress } from '@src/utils/string-utils'

import * as styles from './account-search.css'

interface IAccountSearchRequiredProps {}

interface IAccountSearchOptionalProps {}

interface IAccountSearchProps extends IAccountSearchRequiredProps, IAccountSearchOptionalProps {}

const defaultProps: IAccountSearchOptionalProps = {}

export const AccountSearch = forwardRef<HTMLElement, IAccountSearchProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { t } = useTranslation()
		const [searchParams] = useSearchParams()
		const navigate = useNavigate()
		const { pathname } = useLocation()
		const inputRef = useRef(null)

		const query = searchParams.get(ACCOUNT_PARAM_QUERY)

		const [isScrolled, setIsScrolled] = useState<boolean>(false)
		const [inputValue, setInputValue] = useState<string>('')

		// https://www.algolia.com/search/?query=hello&tab=&website%5Bquery%5D=hello
		// http://localhost:8003/#/accounts/all?asset=xrd&transactionId=1eaf53c4256c384d76ca72c0f18ef37a2e4441d4e6bae450e2b8507f42faa5b6

		// TODO: temp
		const accountAddress =
			'ardx1qspt0lthflcd45zhwvrxkqdrv5ne5avsgarjcpfatyw7n7n93v38dhcdtlag0sdfalksjdhf7d8f78d7f8d7f8d7f8d7f'

		const navigateBack = () => {
			// eslint-disable-next-line
			console.log('navigate')
			// navigate(`${pathname}${isActivityLink ? `?${ACCOUNT_PARAM_ACTIVITY}=true` : ''}`)
			navigate(pathname)
		}

		const handleScroll = (event: Event) => {
			const target = event.target as Element
			const { scrollTop } = target

			setIsScrolled(scrollTop > 0)
		}

		const handleOnChange = (event: React.ChangeEvent<FormElement>) => {
			const { value } = event.target

			setInputValue(value)
		}

		useEffect(() => {
			if (query) {
				setInputValue(query)
			}
			if (!query) {
				setIsScrolled(false)
			}

			inputRef?.current?.focus()
		}, [query])

		return (
			<Dialog open={!!query}>
				<DialogPortal>
					<DialogOverlay className={styles.searchOverlay} />
					<DialogContent className={clsx(styles.searchContent)} onEscapeKeyDown={navigateBack}>
						<ScrollArea isTopShadowVisible={false} onScroll={handleScroll}>
							<Box className={clsx(styles.searchHeaderWrapper, isScrolled && styles.searchHeaderWrapperShadow)}>
								<Box display="flex" width="full" alignItems="center" gap="medium">
									<Box flexGrow={1}>
										<Input
											value={inputValue}
											ref={inputRef}
											className={styles.searchElement}
											placeholder={capitalizeFirstLetter(`${t('global.search')}`)}
											onChange={handleOnChange}
										/>
									</Box>
									<Box flexShrink={0} display="flex" justifyContent="flex-end" gap="small">
										<ToolTip message={<Translation capitalizeFirstLetter text="global.close" />}>
											<Button styleVariant="ghost" sizeVariant="small" iconOnly onClick={navigateBack}>
												<Close2Icon />
											</Button>
										</ToolTip>
									</Box>
								</Box>
								<Box display="flex" width="full">
									<Box flexGrow={1}>
										<Text size="xsmall">Lorem Ipsum</Text>
									</Box>
								</Box>
							</Box>
							<Box ref={ref} className={styles.searchBodyScrollWrapper}>
								<Box className={styles.searchDetailsWrapper}>
									<Box display="flex" flexDirection="column" gap="medium" width="full">
										{/* message */}
										<Box position="relative" width="full">
											<Box display="flex" alignItems="center" gap="xsmall">
												<Text size="small" color="strong">
													Message (encryped)
												</Text>
												<CopyAddressButton
													styleVariant="ghost"
													address="Copy message"
													iconOnly
													rounded={false}
													tickColor="colorStrong"
												/>
											</Box>
										</Box>
										<Box position="relative" width="full">
											<Text size="large">
												Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
												thes standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
												scrambled it to make a type specimen book. It has survived not only five centuries, but also the
												leap into electronic typesetting, remaining essentially unchanged. It was popularised in the
												1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
												with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu
											</Text>
											<Text size="large">
												Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
												thes standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
												scrambled it to make a type specimen book. It has survived not only five centuries, but also the
												leap into electronic typesetting, remaining essentially unchanged. It was popularised in the
												1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
												with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu
											</Text>
											<Text size="large">
												Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
												thes standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
												scrambled it to make a type specimen book. It has survived not only five centuries, but also the
												leap into electronic typesetting, remaining essentially unchanged. It was popularised in the
												1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
												with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu
											</Text>
											<Text size="large">
												Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
												thes standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
												scrambled it to make a type specimen book. It has survived not only five centuries, but also the
												leap into electronic typesetting, remaining essentially unchanged. It was popularised in the
												1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
												with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu
											</Text>
											<Text size="xsmall">
												Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
												thes standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
												scrambled it to make a type specimen book. It has survived not only five centuries, but also the
												leap into electronic typesetting, remaining essentially unchanged. It was popularised in the
												1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
												with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu
											</Text>
										</Box>
									</Box>
								</Box>
							</Box>
						</ScrollArea>
					</DialogContent>
				</DialogPortal>
			</Dialog>
		)
	},
)

AccountSearch.defaultProps = defaultProps
