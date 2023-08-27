import clsx from 'clsx'
import React, { useEffect, useRef } from 'react'
import { z } from 'zod'

import { Box } from 'ui/src/components/box'
import { Form } from 'ui/src/components/form'
import { FieldsGroup } from 'ui/src/components/form/fields-group'
import { AccountSelectField } from 'ui/src/components/form/fields/account-select-field'
import { AddressBookSelectField } from 'ui/src/components/form/fields/address-book-select-field'
import { CheckboxField } from 'ui/src/components/form/fields/checkbox-field'
import { NumberField } from 'ui/src/components/form/fields/number-field'
import { SelectField } from 'ui/src/components/form/fields/select-field'
import { TextAreaField } from 'ui/src/components/form/fields/text-area-field'
import { TextField } from 'ui/src/components/form/fields/text-field'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'

import { TransferWrapper } from '../components/transfer-wrapper'
import * as styles from './styles.css'

const initialValues = {
	from: '',
	test: '5',
	to: '',
	message: '',
	tokens: [],
	nfts: [],
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
		if (values.nfts) values.nfts = Object.values(values.nfts).map(nft => ({ ...nft, ids: nft.ids.map(({ id }) => id) }))

		// @TODO: parse form values into manifest
		// @TODO: call api and handle request error (toast?)
	}

	const handleValidate = (values: typeof initialValues) => {
		const result = validationSchema.safeParse(values)
		if (result.success === false) return result.error
		return undefined
	}

	return (
		<TransferWrapper
			transaction={null}
			title="Transfer Tokens and Nfts"
			description="Move tokens and nfts to another account"
			// title={<Translation capitalizeFirstLetter text="transfer.demo.title" />}
			// description={<Translation capitalizeFirstLetter text="transfer.demo.description" />}
		>
			<Box className={styles.transferFormOuterWrapper}>
				<Form
					onSubmit={handleSubmit}
					validate={handleValidate}
					initialValues={initialValues}
					submitButtonTitle={<Translation capitalizeFirstLetter text="transfer.demo.description" />}
					className={styles.transferFormWrapper}
				>
					<Box className={clsx(styles.transferFormGridBoxWrapper, styles.transferFormGridBoxWrapperBorder)}>
						<Box className={styles.transferFormGridBoxWrapperLeft}>
							<Text color="strong" size="xlarge" weight="strong">
								From account
							</Text>
							<Text size="xxsmall">Select the account, you wish to send tokens and NFT&apos;s from</Text>
						</Box>
						<Box>
							<AccountSelectField name="from" />
						</Box>
					</Box>
					<Box className={clsx(styles.transferFormGridBoxWrapper, styles.transferFormGridBoxWrapperBorder)}>
						<Box className={styles.transferFormGridBoxWrapperLeft}>
							<Text color="strong" size="xlarge" weight="strong">
								Message
							</Text>
							<Text size="xxsmall">Send an optional message assiociated with your transaction</Text>
						</Box>
						<Box>
							<TextAreaField
								name="message"
								placeholder="Enter transaction message"
								className={styles.transferFormMessageTextArea}
							/>
							<Box className={styles.transferFormEncryptWrapper}>
								<Text size="xxsmall">Encrypt message</Text>
								<CheckboxField styleVariant="primary" sizeVariant="small" />
							</Box>
						</Box>
					</Box>

					<Box className={clsx(styles.transferFormGridBoxWrapper, styles.transferFormGridBoxWrapperBorder)}>
						<Box className={styles.transferFormGridBoxWrapperLeft}>
							<Text color="strong" size="xlarge" weight="strong">
								To account
							</Text>
							<Text size="xxsmall">Select account to send tokens or nfts</Text>
						</Box>
						<Box>
							<AddressBookSelectField name="from" />
						</Box>
					</Box>

					{/* <TextField label="from" name="from" ref={inputRef} /> */}
					{/* <TextField label="message" name="message" validate={() => {}} /> */}

					{/* <FieldsGroup name="tokens">
					<TextField label="resource" name="resource" />
					<NumberField label="amount" name="amount" />

					<TextArea />
					<Select option={[]} name="xxx"/>
					<ToggleField />

					<AccountSelect name="from" />
					<AddressBookSelect name="to" />
					<FungibleAmountField />
					<NonFungibleIdsSelect />
				</FieldsGroup> */}

					{/* <FieldsGroup name="nfts">
					<TextField label="resource" name="resource" />
					<FieldsGroup name="ids">
						<TextField label="id" name="id" />
					</FieldsGroup>
				</FieldsGroup> */}
				</Form>
			</Box>
		</TransferWrapper>
	)
}

export default Demo
