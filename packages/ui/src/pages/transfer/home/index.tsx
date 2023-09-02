import { ManifestBuilder } from '@radixdlt/radix-engine-toolkit'
import clsx from 'clsx'
import { t } from 'i18next'
import { TokenAmountSelect } from 'packages/ui/src/components/form/fields/token-amount-field'
import { sendFungibleTokens, sendNftTokens } from 'packages/ui/src/manifests/transfer'
import React, { useEffect, useRef } from 'react'
import { z } from 'zod'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Form } from 'ui/src/components/form'
import { FieldsGroup } from 'ui/src/components/form/fields-group'
import { AccountSelect } from 'ui/src/components/form/fields/account-select'
import { AddressBookSelect } from 'ui/src/components/form/fields/address-book-select'
import { CheckboxField } from 'ui/src/components/form/fields/checkbox-field'
import { TextAreaField } from 'ui/src/components/form/fields/text-area-field'
import { CirclePlusIcon, TrashIcon, UsersPlusIcon } from 'ui/src/components/icons'
import { Tabs, TabsContent } from 'ui/src/components/tabs'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { capitalizeFirstLetter } from 'ui/src/utils/capitalize-first-letter'

import { useTransferContext } from '../components/transfer-wrapper/use-context'
import * as styles from './styles.css'

const TOKENS = 'tokens'
const NFTS = 'nfts'

const positiveNumberValidator = (value: number): boolean => value > 0

const tokenSchema = z.object({
	address: z.string().min(1, 'Please select token'),
	amount: z.number().refine(positiveNumberValidator, { message: 'Please enter a valid amount' }),
})

const nftSchema = z.object({
	address: z.string().min(1, 'Please select NFT collection'),
	ids: z.array(z.string().min(1, 'NFT id can not be empty')).min(1, 'Please select NFT items'),
})

const actionsSchema = z.object({
	to: z.string().min(1, 'Please enter recipient'),
	nfts: z.array(nftSchema),
	tokens: z.array(tokenSchema),
})

const validationSchema = z.object({
	message: z.string(),
	messageEncrypted: z.boolean(),
	from: z.string().min(1, 'Please select account'),
	actions: z.array(actionsSchema),
})

const initialValues = {
	from: '',
	message: '',
	messageEncrypted: false,
	actions: [{ to: '', nfts: [], tokens: [] }],
}

export const Home: React.FC = () => {
	const inputRef = useRef(null)
	const { onSubmit } = useTransferContext()

	useEffect(() => {
		inputRef?.current?.focus()
	}, [])

	const handleSubmit = async (values: typeof initialValues) => {
		const nfts = []
		const tokens = []
		values.actions.forEach(action => {
			if (action.nfts?.length > 0) {
				nfts.push({ from: values.from, to: action.to, nfts: action.nfts })
			}
			if (action.tokens?.length > 0) {
				tokens.push({
					from: values.from,
					to: action.to,
					tokens: action.tokens,
				})
			}
		})

		let manifest = new ManifestBuilder()
		manifest = sendNftTokens(new ManifestBuilder(), nfts)
		manifest = sendFungibleTokens(new ManifestBuilder(), tokens)

		onSubmit({
			version: 1,
			transactionManifest: manifest.build().toString(),
			message: values.message,
		})
	}

	const handleValidate = (values: typeof initialValues) => {
		const result = validationSchema.safeParse(values)
		if (result.success === false) return result.error
		return undefined
	}

	return (
		<Form
			onSubmit={handleSubmit}
			validate={handleValidate}
			initialValues={initialValues}
			submitButtonTitle={<Translation capitalizeFirstLetter text="transfer.tokensNfts.submitFormButtonTitle" />}
			className={styles.transferFormWrapper}
		>
			<Box className={styles.transferFormGridBoxWrapper}>
				<Box className={styles.transferFormGridBoxWrapperLeft}>
					<Text color="strong" size="xlarge" weight="strong">
						<Translation capitalizeFirstLetter text="transfer.tokensNfts.fromAccountTitle" />
					</Text>
					<Text size="xsmall">
						<Translation capitalizeFirstLetter text="transfer.tokensNfts.fromAccountSubTitle" />
					</Text>
				</Box>
				<Box>
					<AccountSelect name="from" />
				</Box>
			</Box>
			<Box className={clsx(styles.transferFormGridBoxWrapper, styles.transferFormGridBoxWrapperBorder)}>
				<Box className={styles.transferFormGridBoxWrapperLeft}>
					<Text color="strong" size="xlarge" weight="strong">
						<Translation capitalizeFirstLetter text="transfer.tokensNfts.messageTitle" />
					</Text>
					<Text size="xsmall">
						<Translation capitalizeFirstLetter text="transfer.tokensNfts.messageSubTitle" />
					</Text>
				</Box>
				<Box>
					<TextAreaField
						name="message"
						placeholder={capitalizeFirstLetter(`${t('transfer.tokensNfts.messagePlaceholder')}`)}
						sizeVariant="medium"
						className={styles.transferFormMessageTextArea}
					/>
					<Box className={styles.transferFormEncryptWrapper}>
						<Text size="xsmall">
							<Translation capitalizeFirstLetter text="transfer.tokensNfts.encryptMessageTitle" />
						</Text>
						<CheckboxField name="messageEncrypted" styleVariant="primary" sizeVariant="small" />
					</Box>
				</Box>
			</Box>
			<FieldsGroup
				name="actions"
				defaultKeys={1}
				trashTrigger={
					<Button styleVariant="ghost" sizeVariant="small" iconOnly className={styles.transferActionTrashButtonWrapper}>
						<TrashIcon />
					</Button>
				}
				addTrigger={
					<Button
						styleVariant="secondary"
						sizeVariant="xlarge"
						fullWidth
						leftIcon={
							<Box marginLeft="small">
								<UsersPlusIcon />
							</Box>
						}
						className={styles.transferActionAddButtonWrapper}
					>
						<Translation capitalizeFirstLetter text="transfer.tokensNfts.submitFormGroupToAccountAdd" />
					</Button>
				}
			>
				<Box className={clsx(styles.transferFormGridBoxWrapper, styles.transferFormGridBoxWrapperBorder)}>
					<Box className={styles.transferFormGridBoxWrapperLeft}>
						<Text color="strong" size="xlarge" weight="strong">
							<Translation capitalizeFirstLetter text="transfer.tokensNfts.toAccountTitle" />
						</Text>
						<Text size="xsmall">
							<Translation capitalizeFirstLetter text="transfer.tokensNfts.toAccountSubTitle" />
						</Text>
					</Box>
					<Box>
						<AddressBookSelect name="to" toolTipMessageKnownAddress="transfer.tokensNfts.submitFormKnownAddress" />
						<Tabs
							list={[
								{ label: capitalizeFirstLetter(`${t('transfer.tokensNfts.tokensTabTitle')}`), value: TOKENS },
								{ label: capitalizeFirstLetter(`${t('transfer.tokensNfts.tokensNftsTitle')}`), value: NFTS },
							]}
							defaultValue={TOKENS}
							className={styles.transferActionTabsWrapper}
						>
							<TabsContent value={TOKENS} className={styles.transferActionTabsContentWrapper}>
								<FieldsGroup
									name="tokens"
									defaultKeys={1}
									addTrigger={
										<Button
											styleVariant="secondary"
											sizeVariant="large"
											fullWidth
											leftIcon={
												<Box marginLeft="small">
													<CirclePlusIcon />
												</Box>
											}
											className={styles.transferActionTokensNftsAddButton}
										>
											<Translation capitalizeFirstLetter text="transfer.tokensNfts.submitFormGroupTokensAdd" />
										</Button>
									}
									trashTrigger={
										<Button
											styleVariant="ghost"
											sizeVariant="small"
											iconOnly
											className={styles.transferActionTrashTokensNftsButton}
										>
											<TrashIcon />
										</Button>
									}
								>
									<Box className={styles.transferActionToAssetWrapper}>
										<TokenAmountSelect accountKey="from" />
									</Box>
								</FieldsGroup>
							</TabsContent>
							<TabsContent value={NFTS} className={styles.transferActionTabsContentWrapper}>
								<FieldsGroup
									name="nfts"
									defaultKeys={1}
									addTrigger={
										<Button
											styleVariant="secondary"
											sizeVariant="large"
											fullWidth
											leftIcon={
												<Box marginLeft="small">
													<CirclePlusIcon />
												</Box>
											}
											className={styles.transferActionTokensNftsAddButton}
										>
											<Translation capitalizeFirstLetter text="transfer.tokensNfts.submitFormGroupNFTAdd" />
										</Button>
									}
									trashTrigger={
										<Button
											styleVariant="ghost"
											sizeVariant="small"
											iconOnly
											className={styles.transferActionTrashTokensNftsButton}
										>
											<TrashIcon />
										</Button>
									}
								>
									<Box className={styles.transferActionToAssetWrapper}>
										<Text>nfts field group</Text>
									</Box>
								</FieldsGroup>
							</TabsContent>
						</Tabs>
					</Box>
				</Box>
			</FieldsGroup>
		</Form>
	)
}

export default Home
