import { Buffer } from 'buffer'
import React, { useMemo, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import type { ZodError } from 'zod'
import { z } from 'zod'

import { Button } from 'ui/src/components/button'
import { Form } from 'ui/src/components/form'
import { SubmitButton } from 'ui/src/components/form/fields/submit-button'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useSendTransaction } from 'ui/src/hooks/use-send-transaction'
import type { DeployPackage } from 'ui/src/manifests/deploy-package'
import { getDeployPackageManifest } from 'ui/src/manifests/deploy-package'

import DeployFormFields from './components/form-fields'
import * as styles from './styles.css'

const messages = defineMessages({
	submit_button: {
		id: '556JQK',
		defaultMessage: 'Deploy',
	},
	validation_from: {
		id: 'w2XWRt',
		defaultMessage: 'Please select account',
	},
	validation_badge: {
		id: 'jPKpFd',
		defaultMessage: 'Please select NFT collection',
	},
	validation_badge_id: {
		id: 'yTLHBR',
		defaultMessage: 'Please select NFT item',
	},
	validation_files_amount: {
		id: '1zTy41',
		defaultMessage: 'Both WASM and RPD files are required',
	},
	validation_files_size: {
		id: 'e64KO/',
		defaultMessage: 'Each file must be a maximum of 10MB',
	},
	validation_files_type: {
		id: 'oDLqAZ',
		defaultMessage: 'Invalid files, please upload both WASM and RPD file with correct types',
	},
	error_toast: {
		id: 'fjqZcw',
		defaultMessage: 'Failed submitting transaction to the network',
	},
	success_toast: {
		id: 'Gkt0d0',
		defaultMessage: 'Successfully submitted transaction to the network',
	},
	toast_action_label: {
		id: 'K7AkdL',
		defaultMessage: 'Show',
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
	const networkId = useNetworkId()
	const sendTransaction = useSendTransaction()
	const [searchParams, setSearchParams] = useSearchParams()

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

	const handleSubmit = async (values: typeof initialValues) => {
		setValidation(undefined)
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
		}).then(res => {
			if (res.isErr()) {
				toast.error(intl.formatMessage(messages.error_toast), { description: res.error.message || res.error.error })
			} else {
				toast.success(intl.formatMessage(messages.success_toast), {
					description: res.value.status,
					action: {
						label: intl.formatMessage(messages.toast_action_label),
						onClick: () => {
							searchParams.set('tx', `${res.value.transactionIntentHash}`)
							setSearchParams(searchParams)
						},
					},
				})
			}
		})
	}

	return (
		<Form
			onSubmit={handleSubmit}
			initialValues={initialValues}
			errors={validation?.format()}
			className={styles.transferFormWrapper}
		>
			<ValidationErrorMessage message={validation?.flatten().formErrors[0]} />
			<DeployFormFields />
			<SubmitButton>
				<Button sizeVariant="large">{intl.formatMessage(messages.submit_button)}</Button>
			</SubmitButton>
		</Form>
	)
}

export default Deploy
