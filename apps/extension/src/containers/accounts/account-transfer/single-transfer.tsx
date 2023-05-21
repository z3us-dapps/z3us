/* eslint-disable  @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'

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
import { Text } from 'ui/src/components-v2/typography'
import {
	ArrowLeftIcon,
	AtSignIcon,
	Check2Icon,
	CheckCircleIcon,
	ChevronDown2Icon,
	CirclePlusIcon,
	CoinsIcon,
	LoadingBarsIcon,
	PlusIcon,
	TrashIcon,
	WriteNoteIcon,
} from 'ui/src/components/icons'

import { Link } from '@src/components/link'
import * as plainButtonStyles from '@src/components/styles/plain-button-styles.css'
import { TokenImageIcon } from '@src/components/token-image-icon'
import Translation from '@src/components/translation'
import { accountMenuSlugs } from '@src/constants'
import { TokenSelectorDialog } from '@src/containers/accounts/token-selector-dialog'

import * as styles from './account-transfer.css'
import { SearchableInput } from './searchable-input'
import { TransferMessage } from './transfer-message'
import { TransferTokenSelector } from './transfer-token-selector'

interface ISingleTransferRequiredProps {
	isMessageUiVisible: boolean
	onToggleMessageUi: () => void
}

interface ISingleTransferOptionalProps {}

interface ISingleTransferProps extends ISingleTransferRequiredProps, ISingleTransferOptionalProps {}

const defaultProps: ISingleTransferOptionalProps = {}

export const SingleTransfer: React.FC<ISingleTransferProps> = props => {
	const { isMessageUiVisible, onToggleMessageUi } = props

	return (
		<Box>
			<Box display="flex" paddingBottom="medium" alignItems="center">
				<Box flexGrow={1} alignItems="center">
					<Text size="medium" color="strong">
						From
					</Text>
				</Box>
			</Box>
			<Box width="full">
				<DropdownMenuVirtuoso
					value="light"
					onValueChange={(value: string) => {
						// eslint-disable-next-line
						console.log('onValueChange', value)
					}}
					data={Array.from({ length: 500 }).map((_, i, a) => ({
						id: i === 0 ? 'light' : `v1.2.0-beta.${a.length - i}`,
						title: `v1.2.0-beta.${a.length - i}`,
						test: 'heheh',
					}))}
					// eslint-disable-next-line react/no-unstable-nested-components
					itemContentRenderer={(index, { id, title }) => (
						<DropdownMenuRadioItem value={id} key={index}>
							<Box display="flex" alignItems="center" gap="medium">
								<Box flexShrink={0}>
									<TokenImageIcon
										imgSrc="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
										imgAlt="btc token image"
										fallbackText="btc"
									/>
								</Box>
								<Box flexGrow={1} minWidth={0}>
									<Text truncate>
										{title}
										Quisque felis sapien, sed purus sed tristique eros felis ante porttitor et, semper metus nisl ut
										pellentesque euismod. Purus bibendum posuere donec eget, ac imperdiet rhoncus nunc nisi
									</Text>
								</Box>
							</Box>
							<DropdownMenuItemIndicator>
								<Check2Icon />
							</DropdownMenuItemIndicator>
						</DropdownMenuRadioItem>
					)}
					trigger={
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
							rightIcon={<ChevronDown2Icon />}
						>
							<Box display="flex" alignItems="center" width="full" textAlign="left" paddingLeft="xsmall">
								<Text size="large" color="strong">
									Savings 765x...75jf
								</Text>
							</Box>
						</Button>
					}
				/>
			</Box>
			<Box display="flex" paddingBottom="medium" paddingTop="large">
				<Box display="flex" alignItems="center" width="full">
					<Box display="flex" alignItems="center" flexGrow={1}>
						<Text size="medium" color="strong">
							To:
						</Text>
						<Box display="flex" alignItems="center" color="green500" marginLeft="xxsmall">
							<Text size="medium">(known address)</Text>
							<CheckCircleIcon />
						</Box>
					</Box>
					<Box display="flex" alignItems="center" gap="medium">
						<Box
							component="button"
							type="button"
							className={plainButtonStyles.plainButtonHoverWrapper}
							onClick={onToggleMessageUi}
							display="flex"
							alignItems="center"
						>
							<Box component="span" display="flex" alignItems="center" marginRight="xxsmall">
								<WriteNoteIcon />
							</Box>
							<Text inheritColor component="span" size="medium" underline="always" truncate>
								{isMessageUiVisible ? 'Hide message' : 'Add message'}
							</Text>
						</Box>
					</Box>
				</Box>
			</Box>
			<Box width="full">
				<SearchableInput
					value="light"
					placeholder="SearchableInput1"
					styleVariant="secondary"
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
			<TransferMessage isVisible={isMessageUiVisible} />
			<TransferTokenSelector styleVariant="secondary" />
		</Box>
	)
}

SingleTransfer.defaultProps = defaultProps
