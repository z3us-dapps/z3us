import { Buffer } from 'buffer'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import type { ZodError } from 'zod'
import { z } from 'zod'

import { Form } from 'ui/src/components/form'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useSendTransaction } from 'ui/src/hooks/use-send-transaction'
import type { DeployPackage } from 'ui/src/manifests/deploy-package'
import { getDeployPackageManifest } from 'ui/src/manifests/deploy-package'

import DeployFormFields from './components/form-fields'
import * as styles from './styles.css'

const messages = defineMessages({
	submit_button: {
		id: 'transfer.deploy.form.submit_button',
		defaultMessage: 'Deploy',
	},
	validation_from: {
		id: 'transfer.deploy.form.validation.from',
		defaultMessage: 'Please select account',
	},
	validation_badge: {
		id: 'transfer.deploy.form.validation.badge',
		defaultMessage: 'Please select NFT collection',
	},
	validation_badge_id: {
		id: 'transfer.deploy.form.validation.badge_id',
		defaultMessage: 'Please select NFT item',
	},
	validation_files_amount: {
		id: 'transfer.deploy.form.validation.files.amount',
		defaultMessage: 'Both WASM and RPD files are required',
	},
	validation_files_size: {
		id: 'transfer.deploy.form.validation.files.size',
		defaultMessage: 'Each file must be a maximum of 10MB',
	},
	validation_files_type: {
		id: 'transfer.deploy.form.validation.files.type',
		defaultMessage: 'Invalid files, please upload both WASM and RPD file with correct types',
	},
})

const MAX_FILE_SIZE = 5010 * 1024 * 10240000
const ALLOWED_FILE_TYPES = ['application/wasm', 'application/rdp']

const initialValues = {
	from: '',
	badge: '',
	id: '',
	files: undefined,
	rpd: undefined,
}

const loadFile = (file: File) =>
	file
		.arrayBuffer()
		.then(buffer => Buffer.from(buffer))
		.then(buffer => buffer.toString('hex'))

export const Deploy: React.FC = () => {
	const intl = useIntl()
	const inputRef = useRef(null)
	const networkId = useNetworkId()
	const sendTransaction = useSendTransaction()

	const validationSchema = useMemo(
		() =>
			z.object({
				from: z.string().min(1, intl.formatMessage(messages.validation_from)),
				badge: z.string().min(1, intl.formatMessage(messages.validation_badge)),
				id: z.string().min(1, intl.formatMessage(messages.validation_badge_id)),
				files: z
					.custom<FileList>()
					.refine(files => files?.length === 2, {
						message: intl.formatMessage(messages.validation_files_amount),
					})
					.refine(
						files => files?.[0]?.size <= MAX_FILE_SIZE || files?.[1]?.size <= MAX_FILE_SIZE,
						intl.formatMessage(messages.validation_files_size),
					)
					.refine(
						files => ALLOWED_FILE_TYPES.includes(files?.[0]?.type) || ALLOWED_FILE_TYPES.includes(files?.[1]?.type),
						intl.formatMessage(messages.validation_files_type),
					),
			}),
		[],
	)

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
			submitButtonTitle={intl.formatMessage(messages.submit_button)}
			className={styles.transferFormWrapper}
		>
			<ValidationErrorMessage message={validation?.flatten().formErrors[0]} />
			<DeployFormFields />
		</Form>
	)
}

export default Deploy
