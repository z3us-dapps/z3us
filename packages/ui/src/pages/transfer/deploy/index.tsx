import { Buffer } from 'buffer'
import React, { useEffect, useRef, useState } from 'react'
import type { ZodError } from 'zod'
import { z } from 'zod'

import { Form } from 'ui/src/components/form'
import Translation from 'ui/src/components/translation'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useSendTransaction } from 'ui/src/hooks/dapp/use-send-transaction'
import type { DeployPackage } from 'ui/src/manifests/deploy-package'
import { getDeployPackageManifest } from 'ui/src/manifests/deploy-package'

import DeployFormFields from './components/form-fields'
import * as styles from './styles.css'

const MAX_FILE_SIZE = 5010 * 1024 * 10240000
const ALLOWED_FILE_TYPES = ['application/wasm', 'application/rdp']

const initialValues = {
	from: '',
	badge: '',
	id: '',
	files: undefined,
	rpd: undefined,
}

const validationSchema = z.object({
	from: z.string().min(1, 'Please select account'),
	badge: z.string().min(1, 'Please select NFT collection'),
	id: z.string().min(1, 'Please select NFT item'),
	files: z
		.custom<FileList>()
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

const loadFile = (file: File) =>
	file
		.arrayBuffer()
		.then(buffer => Buffer.from(buffer))
		.then(buffer => buffer.toString('hex'))

export const Deploy: React.FC = () => {
	const inputRef = useRef(null)
	const networkId = useNetworkId()
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

		const input = {
			networkId,
			account: values.from,
			nftCollection: values.badge,
			nftId: values.id,
			wasm: '',
			rpd: '',
		} as DeployPackage

		values.files.forEach(async file => {
			if (file.type === 'application/wasm') {
				input.wasm = await loadFile(file)
			} else {
				input.rpd = await loadFile(file)
			}
		})

		const transactionManifest = await getDeployPackageManifest(input)

		await sendTransaction({
			version: 1,
			transactionManifest,
			blobs: [input.wasm],
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
