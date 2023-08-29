import clsx from 'clsx'
import { t } from 'i18next'
import React, { useEffect, useRef } from 'react'
import { z } from 'zod'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Form } from 'ui/src/components/form'
import { FieldsGroup } from 'ui/src/components/form/fields-group'
import { AccountSelectField } from 'ui/src/components/form/fields/account-select-field'
import { AddressBookSelectField } from 'ui/src/components/form/fields/address-book-select-field'
import { CheckboxField } from 'ui/src/components/form/fields/checkbox-field'
import { NumberField } from 'ui/src/components/form/fields/number-field'
import { SelectField } from 'ui/src/components/form/fields/select-field'
import { TextAreaField } from 'ui/src/components/form/fields/text-area-field'
import { TextField } from 'ui/src/components/form/fields/text-field'
import { TokenSelectField } from 'ui/src/components/form/fields/token-select-field'
import { CirclePlusIcon, TrashIcon, UsersPlusIcon } from 'ui/src/components/icons'
import { Link } from 'ui/src/components/router-link'
import { SelectSimple, SelectTrigger, SelectValue } from 'ui/src/components/select'
import { Tabs, TabsContent } from 'ui/src/components/tabs'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { capitalizeFirstLetter } from 'ui/src/utils/capitalize-first-letter'

import { TransferWrapper } from '../components/transfer-wrapper'
import * as styles from './styles.css'

const TOKENS = 'tokens'
const NFTS = 'nfts'

const initialValues = {
	from: '',
	to: '',
	message: '',
	actions: [{ to: '', nfts: [], tokens: [] }],
}

const validationSchema = z.object({
	from: z.string().min(1, 'Please select account'),
	to: z.string().min(1, 'Please enter recipient'),
})

export const Demo: React.FC = () => {
	const inputRef = useRef(null)

	useEffect(() => {
		inputRef?.current?.focus()
	}, [])

	const handleSubmit = async (values: typeof initialValues) => {
		// if (values.nfts) values.nfts = Object.values(values.nfts).map(nft => ({ ...nft, ids: nft.ids.map(({ id }) => id) }))
		// @TODO: parse form values into manifest
		// @TODO: call api and handle request error (toast?)
	}

	const handleValidate = (values: typeof initialValues) => {
		const result = validationSchema.safeParse(values)
		if (result.success === false) return result.error
		return undefined
	}

	return (
		<TransferWrapper transaction={null} title={<Translation capitalizeFirstLetter text="transfer.tokensNfts.title" />}>
			<Box className={styles.transferFormOuterWrapper}>
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
							<AccountSelectField name="from" />
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
								<CheckboxField styleVariant="primary" sizeVariant="small" />
							</Box>
						</Box>
					</Box>
					<FieldsGroup
						name="actions"
						defaultKeys={1}
						trashTrigger={
							<Button
								styleVariant="ghost"
								sizeVariant="small"
								iconOnly
								className={styles.transferActionTrashButtonWrapper}
							>
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
								<AddressBookSelectField
									name="to"
									toolTipMessageKnownAddress="transfer.tokensNfts.submitFormKnownAddress"
								/>
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
												<NumberField
													name="resource"
													placeholder={capitalizeFirstLetter(`${t('transfer.tokensNfts.tokenInputValuePlaceholder')}`)}
													sizeVariant="large"
												/>
												<TokenSelectField />
												<Box
													display="flex"
													alignItems="center"
													gap="xsmall"
													paddingTop="small"
													justifyContent="space-between"
												>
													<Box display="flex" alignItems="center">
														<Box display="flex">
															<Box display="flex" alignItems="center" flexGrow={1} gap="xsmall">
																<Box display="flex" alignItems="center">
																	<Text size="xsmall" truncate>
																		1 XRD =
																	</Text>
																</Box>
																{/* <SelectField value="usd" data={[{ id: 'usd', title: 'USD' }]} /> */}
																<SelectSimple
																	value="usd"
																	data={[{ id: 'usd', title: 'USD' }]}
																	trigger={
																		<SelectTrigger asChild aria-label="currency">
																			<Box>
																				<Text size="xsmall" underline="always">
																					<SelectValue />
																				</Text>
																			</Box>
																		</SelectTrigger>
																	}
																/>
															</Box>
														</Box>
													</Box>
													<Box display="flex" alignItems="center">
														<Text inheritColor component="span" size="xsmall" truncate>
															<Translation capitalizeFirstLetter text="transfer.tokensNfts.tokenAvailableLabel" />
															:&nbsp;
														</Text>
														<Link
															to="/accounts/"
															underline="hover"
															// className={plainButtonStyles.plainButtonHoverWrapper}
														>
															<Text inheritColor component="span" size="xsmall" underline="always" truncate>
																1000.000
															</Text>
														</Link>
													</Box>
												</Box>
											</Box>
										</FieldsGroup>
									</TabsContent>
									<TabsContent value={NFTS} className={styles.transferActionTabsContentWrapper}>
										<Text>nfts field group</Text>
									</TabsContent>
								</Tabs>
							</Box>
						</Box>
					</FieldsGroup>
				</Form>
			</Box>
		</TransferWrapper>
	)
}

export default Demo
