import React, { useEffect, useRef, useState } from 'react'
import type { ZodError } from 'zod'
import { z } from 'zod'

import { Form } from 'ui/src/components/form'
import Translation from 'ui/src/components/translation'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'
import { useSendTransaction } from 'ui/src/hooks/dapp/use-send-transaction'
import type { DeployPackage } from 'ui/src/manifests/deploy-package'
import { getDeployPackageManifest } from 'ui/src/manifests/deploy-package'

import DeployFormFields from './components/form-fields'
import * as styles from './styles.css'

const MAX_FILE_SIZE = 5010 * 1024 * 10240000
const ALLOWED_FILE_TYPES = ['application/wasm', 'application/rdp']

const initialValues = {
	badge: '',
	files: undefined,
	schema: undefined,
}

const validationSchema = z.object({
	from: z.string().min(1, 'Please select account'),
	badge: z.string().min(1, 'Please select nft for an owner badge'),
	files: z
		.custom<FileList>()
		// .transform(files => files?.length > 0 && files[0])
		.refine(files => files?.length === 2, {
			message: 'Both WASM and RPD files are required',
		})
		.refine(
			files => files?.[0]?.size <= MAX_FILE_SIZE || files?.[1]?.size <= MAX_FILE_SIZE,
			`Each file must be a maximum of 10MB`,
		)
		.refine(
			files => ALLOWED_FILE_TYPES.includes(files?.[0]?.type) || ALLOWED_FILE_TYPES.includes(files?.[1]?.type),
			'Invalid files, please upload both WASM and RPD file with correct types.',
		),
})

export const Deploy: React.FC = () => {
	const inputRef = useRef(null)
	const sendTransaction = useSendTransaction()

	const [validation, setValidation] = useState<ZodError>()

	useEffect(() => {
		inputRef?.current?.focus()
	}, [])

	const handleSubmit = async (values: typeof initialValues) => {
		const result = validationSchema.safeParse(values)
		if (result.success === false) {
			setValidation(result.error)
			return
		}

		const input: DeployPackage = { badge: values.badge, wasm: undefined, schema: undefined }
		if (values.files?.[0]?.type === 'application/wasm') {
			input.wasm = values.files?.[0]
			input.schema = values.files?.[0]
		} else {
			input.schema = values.files?.[0]
			input.wasm = values.files?.[0]
		}

		const transactionManifest = await getDeployPackageManifest(input)

		console.log(transactionManifest)

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
			<ValidationErrorMessage message={validation?.flatten().formErrors[0]} />
			<DeployFormFields />
		</Form>
	)
}

export default Deploy
