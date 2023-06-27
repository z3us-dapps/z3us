/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ClassValue } from 'clsx'
import clsx from 'clsx'
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, Route, Routes, useLocation, useMatch } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { DialogContent, DialogOverlay, DialogPortal, DialogRoot } from 'ui/src/components/dialog'
import { InformationIcon, LoadingBarsIcon } from 'ui/src/components/icons'
import { type FormElement, Input } from 'ui/src/components/input'
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'ui/src/components/popover'
import * as dialogStyles from 'ui/src/components/styles/dialog-styles.css'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { Z3usLoading } from 'ui/src/components/z3us-loading'

import * as styles from './account-transfer.css'

const rawPlaceholder = {
	glossary: {
		title: 'example glossary',
		GlossDiv: {
			title: 'S',
			GlossList: {
				GlossEntry: {
					ID: 'SGML',
					SortAs: 'SGML',
					GlossTerm: 'Standard Generalized Markup Language',
					Acronym: 'SGML',
					Abbrev: 'ISO 8879:1986',
					GlossDef: {
						para: 'A meta-markup language, used to create markup languages such as DocBook.',
						GlossSeeAlso: ['GML', 'XML'],
					},
					GlossSee: 'markup',
				},
			},
		},
	},
}

const pretty = JSON.stringify(rawPlaceholder, undefined, 2)

interface IAccountTransferRawProps {
	className?: ClassValue
}

export const AccountTransferRaw = forwardRef<HTMLElement, IAccountTransferRawProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className } = props

		const inputRef = useRef(null)
		const [isOpen, setIsOpen] = useState<boolean>(false)
		const [inputValue, setInputValue] = useState<string>(pretty)

		const location = useLocation()
		// const { t } = useTranslation()

		const handleOnChange = (event: React.ChangeEvent<FormElement>) => {
			const { value } = event.target

			setInputValue(value)
		}

		const handleOpenSendingDialog = () => {
			setIsOpen(true)

			// const fungibles = transaction.sends.map(({ to, tokens }) =>
			// 	tokens.map(token => ({ amount: token.amount, resource: token.address, to })),
			// )

			// const transactionManifest = sendTokens(transaction.from).fungible(fungibles.flat())

			// sendTransaction({
			// 	version: 0,
			// 	transactionManifest,
			// })
			// 	.andThen(response => {
			// 		console.log(response)
			// 		setIsOpen(false)
			// 	})
			// 	.mapErr(error => {
			// 		console.error(error)
			// 		setIsOpen(false)
			// 	})
		}

		useEffect(() => {
			// if (query) {
			// 	setInputValue(query)
			// }
			// if (!query) {
			// 	setIsScrolled(false)
			// }

			inputRef?.current?.focus()
		}, [])

		return (
			<>
				<Box ref={ref} className={clsx(styles.transferDesktopWrapper, className)}>
					<Box width="full">
						<Box display="flex" alignItems="flex-end" paddingBottom="small" gap="xsmall">
							<Box paddingTop="xxsmall">
								<Text size="xxxlarge" weight="strong" color="strong">
									Transfer raw
								</Text>
							</Box>
							<PopoverRoot>
								<PopoverTrigger asChild>
									<Box marginBottom="xsmall" marginLeft="xsmall">
										<Button styleVariant="ghost" sizeVariant="xsmall" iconOnly aria-label="TODO">
											<InformationIcon />
										</Button>
									</Box>
								</PopoverTrigger>
								<PopoverPortal>
									<PopoverContent align="start" sideOffset={2} style={{ maxWidth: '300px' }}>
										<Box padding="medium" display="flex" flexDirection="column" gap="small">
											<Text size="small" color="strong">
												Raw transaction
											</Text>
											<Text>
												Sed ac tempor ex
												<br />
												Sed ac tempor ex arcu suscipit vel nulla convallis suspendisse mi magna, vivamus aliquet
												pellentesque pellentesque facilisis amet et neque ligula aliquet, porttitor vestibulum tortor
												lectus iaculis lacus. Tempor consectetur dui in quisque faucibus hac morbi faucibus magnis
												posuere odio.
											</Text>
										</Box>
									</PopoverContent>
								</PopoverPortal>
							</PopoverRoot>
						</Box>
						<Box>
							<Text size="small">In eiusmod cupidatat elit irure enim amet ad qui.</Text>
						</Box>
						<Box marginTop="large">
							<Input
								value={inputValue}
								ref={inputRef}
								elementType="textarea"
								sizeVariant="medium"
								// placeholder={capitalizeFirstLetter(`${t('global.search')}`)}
								placeholder="Enter raw"
								onChange={handleOnChange}
							/>
						</Box>
						<Box display="flex" paddingTop="xlarge" width="full">
							<Button
								styleVariant="primary"
								sizeVariant="xlarge"
								fullWidth
								onClick={handleOpenSendingDialog}
								// disabled
								rightIcon={
									<Box marginLeft="small">
										<LoadingBarsIcon />
									</Box>
								}
							>
								<Translation capitalizeFirstLetter text="global.send" />
							</Button>
						</Box>
					</Box>
				</Box>

				<DialogRoot open={isOpen}>
					<DialogPortal>
						<DialogOverlay className={dialogStyles.dialogOverlay} />
						<DialogContent
							className={clsx(
								dialogStyles.dialogContent,
								dialogStyles.dialogContentFixedHeight,
								styles.transferSendingDialog,
							)}
						>
							<Box width="full" height="full" display="flex" alignItems="center" justifyContent="center">
								<Box display="flex" flexDirection="column" gap="medium" alignItems="center">
									<Z3usLoading message="Sending" />
									<Text>confirm transaction on your device</Text>
								</Box>
							</Box>
						</DialogContent>
					</DialogPortal>
				</DialogRoot>
			</>
		)
	},
)
