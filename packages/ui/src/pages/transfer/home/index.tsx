import { ManifestBuilder } from '@radixdlt/radix-engine-toolkit'
import clsx from 'clsx'
import { t } from 'i18next'
import React, { useEffect, useRef, useState } from 'react'
import type { ZodError } from 'zod'
import { z } from 'zod'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Form } from 'ui/src/components/form'
import { FieldsGroup } from 'ui/src/components/form/fields-group'
import { AccountSelect } from 'ui/src/components/form/fields/account-select'
import { AddressBookSelect } from 'ui/src/components/form/fields/address-book-select'
import { CheckboxField } from 'ui/src/components/form/fields/checkbox-field'
import { TextAreaField } from 'ui/src/components/form/fields/text-area-field'
import { TokenAmountSelect } from 'ui/src/components/form/fields/token-amount-field'
import { CirclePlusIcon, TrashIcon, UsersPlusIcon } from 'ui/src/components/icons'
import { Tabs, TabsContent } from 'ui/src/components/tabs'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { useSendTransaction } from 'ui/src/hooks/dapp/use-send-transaction'
import { sendFungibleTokens, sendNftTokens } from 'ui/src/manifests/transfer'
import { capitalizeFirstLetter } from 'ui/src/utils/capitalize-first-letter'

import * as styles from './styles.css'

const TOKENS = 'tokens'
const NFTS = 'nfts'

const positiveNumberValidator = (value: number): boolean => value > 0

const resourcesSchema = z.object({
	address: z.string().min(1, 'Please select token'),
	amount: z.number().refine(positiveNumberValidator, { message: 'Please enter a valid amount' }),
	ids: z.array(z.string().min(1, 'NFT id can not be empty')).min(1, 'Please select NFT items'),
})

const actionsSchema = z.object({
	to: z.string().min(1, 'Please enter recipient'),
	resources: z.array(resourcesSchema),
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
	actions: [{ to: '', resources: [] }],
}

export const Home: React.FC = () => {
	const inputRef = useRef(null)
	const [validation, setValidation] = useState<ZodError>()
	const sendTransaction = useSendTransaction()

	useEffect(() => {
		inputRef?.current?.focus()
	}, [])

	const handleSubmit = (values: typeof initialValues) => {
		const result = validationSchema.safeParse(values)
		if (result.success === false) {
			setValidation(result.error)
			return
		}

		let manifest = new ManifestBuilder()
		values.actions.forEach(action => {
			if (action.resources?.length > 0) {
				const nfts = []
				const tokens = []
				action.resources.forEach(resource => {
					if (resource.ids?.length > 0) {
						nfts.push(resource)
					} else {
						tokens.push(resource)
					}
				})

				manifest = sendNftTokens(new ManifestBuilder(), [{ from: values.from, to: action.to, nfts }])
				manifest = sendFungibleTokens(new ManifestBuilder(), [{ from: values.from, to: action.to, tokens }])
			}
		})

		sendTransaction({
			version: 1,
			transactionManifest: manifest.build().toString(),
			message: values.message,
		})
	}

	return (
		<Form
			onSubmit={handleSubmit}
			initialValues={initialValues}
			errors={validation?.format()}
			submitButtonTitle={<Translation capitalizeFirstLetter text="transfer.tokensNfts.submitFormButtonTitle" />}
			className={styles.transferFormWrapper}
		>
			{validation && (
				<Box>
					<Text color="red">{validation.flatten().formErrors[0] || ''}</Text>
				</Box>
			)}
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
						<FieldsGroup
							name="resources"
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
								<Tabs
									list={[
										{ label: capitalizeFirstLetter(`${t('transfer.tokensNfts.tokensTabTitle')}`), value: TOKENS },
										{ label: capitalizeFirstLetter(`${t('transfer.tokensNfts.nftsTabTitle')}`), value: NFTS },
									]}
									defaultValue={TOKENS}
									className={styles.transferActionTabsWrapper}
								>
									<TabsContent value={TOKENS} className={styles.transferActionTabsContentWrapper}>
										<Box className={styles.transferActionToAssetWrapper}>
											<TokenAmountSelect accountKey="from" />
										</Box>
									</TabsContent>
									<TabsContent value={NFTS} className={styles.transferActionTabsContentWrapper}>
										<Box className={styles.transferActionToAssetWrapper}>
											<Text>nft select</Text>
										</Box>
									</TabsContent>
								</Tabs>
							</Box>
						</FieldsGroup>
					</Box>
				</Box>
			</FieldsGroup>
		</Form>
	)
}

export default Home
