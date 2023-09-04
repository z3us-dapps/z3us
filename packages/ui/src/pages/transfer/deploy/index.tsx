import { ManifestBuilder } from '@radixdlt/radix-engine-toolkit'
import React, { useEffect, useRef, useState } from 'react'
import type { ZodError } from 'zod'
import { z } from 'zod'

import { Box } from 'ui/src/components/box'
import { Dropzone } from 'ui/src/components/dropzone'
import { Form } from 'ui/src/components/form'
import { AccountSelect } from 'ui/src/components/form/fields/account-select'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { useSendTransaction } from 'ui/src/hooks/dapp/use-send-transaction'
import { getDeployPackageManifest } from 'ui/src/manifests/deploy-package'

import * as styles from './styles.css'

const initialValues = {
	badge: '',
	wasm: undefined,
	schema: undefined,
}

const validationSchema = z.object({
	badge: z.string().min(1, 'Please select nft for an owner badge'),
	wasm: z
		.custom<FileList>()
		.transform(file => file?.length > 0 && file.item(0))
		.refine(file => !file || (!!file && file.size <= 10 * 1024 * 1024), {
			message: 'The WASM file must be a maximum of 10MB',
		})
		.refine(file => !file || (!!file && file.type?.startsWith('application/wasm')), {
			message: 'Only WASM files are allowed',
		}),
	schema: z
		.custom<FileList>()
		.transform(file => file?.length > 0 && file.item(0))
		.refine(file => !file || (!!file && file.size <= 10 * 1024 * 1024), {
			message: 'The RPD file must be a maximum of 10MB',
		})
		.refine(file => !file || (!!file && file.type?.startsWith('application/rdp')), {
			message: 'Only RPD files are allowed',
		}),
})

export const Deploy: React.FC = () => {
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

		const transactionManifest = getDeployPackageManifest(new ManifestBuilder(), values).build().toString()

		sendTransaction({
			version: 1,
			transactionManifest,
		})
	}

	return (
		<Form
			onSubmit={handleSubmit}
			initialValues={initialValues}
			errors={validation?.format()}
			submitButtonTitle={<Translation capitalizeFirstLetter text="transfer.raw.submitFormButtonTitle" />}
			className={styles.transferFormWrapper}
		>
			{validation && (
				<Box>
					<Text color="red">{validation.flatten().formErrors[0] || ''}</Text>
				</Box>
			)}
			<Box>
				<Box paddingTop="large">
					<Box paddingBottom="small">
						<Text size="small">
							<Translation capitalizeFirstLetter text="transfer.deploy.wasmFileTitle" />
						</Text>
					</Box>
					<Dropzone title={<Translation capitalizeFirstLetter text="transfer.raw.wasmFileTitle" />} />
				</Box>
				<Box paddingTop="large">
					<Box paddingBottom="small">
						<Text size="small">
							<Translation capitalizeFirstLetter text="transfer.deploy.rpdFileTitle" />
						</Text>
					</Box>
					<Dropzone title={<Translation capitalizeFirstLetter text="transfer.raw.rpdFileTitle" />} />
				</Box>
				<Box paddingTop="large">
					<Box paddingBottom="small">
						<Text size="small">
							<Translation capitalizeFirstLetter text="transfer.deploy.accountTitle" />
						</Text>
					</Box>
					<Box paddingTop="large">
						<Text>
							<Translation capitalizeFirstLetter text="transfer.deploy.badgeDescription" />
						</Text>
					</Box>
					<AccountSelect name="badge" />
				</Box>
			</Box>
		</Form>
	)
}

export default Deploy
