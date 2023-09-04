import clsx from 'clsx'
import { t } from 'i18next'
import React, { useEffect, useRef } from 'react'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { FieldsGroup } from 'ui/src/components/form/fields-group'
import { AccountSelect } from 'ui/src/components/form/fields/account-select'
import { AddressBookSelect } from 'ui/src/components/form/fields/address-book-select'
import { CheckboxField } from 'ui/src/components/form/fields/checkbox-field'
import { TextAreaField } from 'ui/src/components/form/fields/text-area-field'
import { TokenAmountSelect } from 'ui/src/components/form/fields/token-amount-field'
import { useFieldValue } from 'ui/src/components/form/use-field-value'
import { CirclePlusIcon, TrashIcon, UsersPlusIcon } from 'ui/src/components/icons'
import { Tabs, TabsContent } from 'ui/src/components/tabs'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { capitalizeFirstLetter } from 'ui/src/utils/capitalize-first-letter'

import * as styles from './styles.css'

const TOKENS = 'tokens'
const NFTS = 'nfts'

export const TransferFormFields: React.FC = () => {
	const inputRef = useRef(null)
	const from = useFieldValue('from') || ''

	useEffect(() => {
		inputRef?.current?.focus()
	}, [])

	return (
		<>
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
					<AccountSelect ref={inputRef} name="from" />
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
											<TokenAmountSelect fromAccount={from} />
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
		</>
	)
}

export default TransferFormFields
