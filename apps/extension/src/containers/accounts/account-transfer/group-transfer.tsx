/* eslint-disable  @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'

import {
	AccordionContent,
	AccordionHeader,
	AccordionItem,
	AccordionRoot,
	AccordionTrigger,
} from 'ui/src/components-v2/accordion'
import { Box } from 'ui/src/components-v2/box'
import { Button } from 'ui/src/components-v2/button'
import { Checkbox } from 'ui/src/components-v2/checkbox'
import {
	DropdownMenuItemIndicator,
	DropdownMenuRadioItem,
	DropdownMenuVirtuoso,
} from 'ui/src/components-v2/dropdown-menu'
import { FormElement, Input } from 'ui/src/components-v2/input'
import { NumberInput } from 'ui/src/components-v2/number-input'
import { ToolTip } from 'ui/src/components-v2/tool-tip'
import { Text } from 'ui/src/components-v2/typography'
import { CheckCircleIcon, ChevronDown2Icon, CirclePlusIcon, TrashIcon, WriteNoteIcon } from 'ui/src/components/icons'

import * as plainButtonStyles from '@src/components/styles/plain-button-styles.css'
import { TokenImageIcon } from '@src/components/token-image-icon'
import Translation from '@src/components/translation'
import { TokenSelectorDialog } from '@src/containers/accounts/token-selector-dialog'

import * as styles from './account-transfer.css'
import { SearchableInput } from './searchable-input'
import { TransferTokenSelector } from './transfer-token-selector'

interface IGroupTransferRequiredProps {
	onRemoveGroupTransaction: () => void
}

interface IGroupTransferOptionalProps {}

interface IGroupTransferProps extends IGroupTransferRequiredProps, IGroupTransferOptionalProps {}

const defaultProps: IGroupTransferOptionalProps = {}

export const GroupTransfer: React.FC<IGroupTransferProps> = props => {
	const { onRemoveGroupTransaction } = props

	const handleRemoveGroup = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()

		onRemoveGroupTransaction()
	}

	return (
		<Box>
			<Box>
				<AccordionRoot type="single" defaultValue="item-1" collapsible>
					<AccordionItem value="item-1" className={styles.transferAccordionItemWrapper}>
						<AccordionHeader>
							<AccordionTrigger asChild>
								<Box className={styles.transferAccordionTriggerWrapper}>
									<Button
										styleVariant="secondary"
										sizeVariant="xlarge"
										fullWidth
										leftIcon={
											<TokenImageIcon
												imgSrc="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
												imgAlt="btc token image"
												fallbackText="btc"
											/>
										}
										rightIcon={<ChevronDown2Icon className={styles.transferAccordionChevron} />}
									>
										<Box display="flex" alignItems="center" width="full" textAlign="left" paddingLeft="xsmall">
											<Text size="large" color="strong">
												Savings 765x...75jf
											</Text>
										</Box>
									</Button>
									<ToolTip side="top" theme="backgroundPrimary" message="Remove group transaction">
										<Button
											className={styles.transferAccordionDeleteBtn}
											iconOnly
											styleVariant="ghost"
											sizeVariant="small"
											onClick={handleRemoveGroup}
										>
											<TrashIcon />
										</Button>
									</ToolTip>
								</Box>
							</AccordionTrigger>
						</AccordionHeader>
						<AccordionContent className={styles.transferAccordionContentWrapper}>
							<Box padding="large">
								<Box display="flex" paddingBottom="medium">
									<Box display="flex" alignItems="center" width="full">
										<Box display="flex" alignItems="center" flexGrow={1}>
											<Text size="medium" color="strong">
												To:
											</Text>
											<Box display="flex" alignItems="center" color="green500" marginLeft="xxsmall">
												<Text size="medium">(known address2)</Text>
												<CheckCircleIcon />
											</Box>
										</Box>
										<Box display="flex" alignItems="center" gap="medium">
											<Box
												component="button"
												type="button"
												className={plainButtonStyles.plainButtonHoverWrapper}
												// onClick={handleAddMessage}
												display="flex"
												alignItems="center"
											>
												<Box component="span" display="flex" alignItems="center" marginRight="xxsmall">
													<WriteNoteIcon />
												</Box>
												<Text inheritColor component="span" size="medium" underline="always" truncate>
													Add message
												</Text>
											</Box>
										</Box>
									</Box>
								</Box>
								<Box width="full">
									<SearchableInput
										value="light"
										placeholder="SearchableInput2"
										onValueChange={(value: string) => {
											// eslint-disable-next-line
											console.log('onValueChange', value)
										}}
										data={Array.from({ length: 500 }).map((_, i, a) => ({
											id: `v1.2.0-beta.${a.length - i}`,
											title: `v1.2.0-beta.${a.length - i}`,
											test: 'heheh',
										}))}
									/>
								</Box>

								<TransferTokenSelector />
								<TransferTokenSelector />
								<Box width="full" paddingTop="large">
									<Button
										styleVariant="tertiary"
										sizeVariant="xlarge"
										fullWidth
										// onClick={handleGroupTransaction}
										// disabled={state.isSubmittingReview}
										leftIcon={
											<Box marginLeft="small">
												<CirclePlusIcon />
											</Box>
										}
									>
										Add another token
									</Button>
								</Box>
							</Box>
						</AccordionContent>
					</AccordionItem>
				</AccordionRoot>
			</Box>
		</Box>
	)
}

GroupTransfer.defaultProps = defaultProps
