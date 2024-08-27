/* eslint-disable no-case-declarations */
import type { KnownAddresses, Instruction as ManifestInstruction } from '@radixdlt/radix-engine-toolkit'
import { castValue, destructManifestValueTuple } from '@radixdlt/radix-engine-toolkit'
import React, { useEffect, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import FieldValue from 'ui/src/components/field-value'
import { AccountSnippet } from 'ui/src/components/snippet/account'

import { resolveManifestAddress } from '@src/networks/radix/manifest'

const messages = defineMessages({
	lock_fee: {
		id: 'drHvoB',
		defaultMessage: `Lock {amount}`,
	},
	deposit: {
		id: 'dIgBOz',
		defaultMessage: `Deposit`,
	},
	withdraw: {
		id: '4sMcwA',
		defaultMessage: `Withdraw {amount}`,
	},
})

enum Method {
	WITHDRAW = 'withdraw',
	DEPOSIT = 'deposit',
	LOCK_FEE = 'lock_fee',
	UNKNOWN = 'unknown',
}

const knownMethods: Map<string, Method> = new Map([
	['try_deposit_or_abort', Method.DEPOSIT],
	['deposit', Method.DEPOSIT],
	['deposit_batch', Method.DEPOSIT],
	['withdraw', Method.WITHDRAW],
	['lock_fee', Method.LOCK_FEE],
])

interface IProps {
	knownAddresses: KnownAddresses
	instruction: Extract<ManifestInstruction, { kind: 'CallMethod' }>
}

export const CallMethod: React.FC<IProps> = ({ instruction, knownAddresses }) => {
	const intl = useIntl()

	const [method, setMethod] = useState<Method>()

	useEffect(() => {
		const faucetComponentAddress = knownAddresses.componentAddresses.faucet
		if (instruction.address.kind === 'Static') {
			const possibleMethod = knownMethods[instruction.methodName] || Method.UNKNOWN
			if (possibleMethod !== Method.LOCK_FEE || instruction.address.value === faucetComponentAddress) {
				setMethod(possibleMethod)
				return
			}
		}
		setMethod(Method.UNKNOWN)
	}, [instruction, knownAddresses])

	if (instruction.kind !== 'CallMethod') return null
	if (!method) return null

	const address = resolveManifestAddress(instruction.address).value

	switch (method) {
		case 'lock_fee':
			const [feeValue] = destructManifestValueTuple(instruction.args)
			const feeAmount = castValue<'Decimal'>(feeValue, 'Decimal').value
			return (
				<Box display="flex" flexDirection="row" gap="small">
					<AccountSnippet address={address} />
					{intl.formatMessage(messages.lock_fee, {
						amount: feeAmount.toString(),
					})}
				</Box>
			)
		case 'withdraw':
			const [resourceAddressValue, amountValue] = destructManifestValueTuple(instruction.args)
			const resourceAddress = resolveManifestAddress(castValue<'Address'>(resourceAddressValue, 'Address').value).value
			const amount = castValue<'Decimal'>(amountValue, 'Decimal').value

			return (
				<Box display="flex" flexDirection="row" gap="small">
					<AccountSnippet address={address} />
					<AccountSnippet address={resourceAddress} />
					{intl.formatMessage(messages.withdraw, {
						amount: amount.toString(),
					})}
				</Box>
			)
		case 'deposit':
			const [bucketValue] = destructManifestValueTuple(instruction.args)
			const accountAddress = resolveManifestAddress(instruction.address).value
			const bucket = castValue<'Bucket'>(bucketValue, 'Bucket').value
			return (
				<Box display="flex" flexDirection="row" gap="small">
					<AccountSnippet address={accountAddress} />
					{intl.formatMessage(messages.deposit, { bucket })}
				</Box>
			)
		default:
			return (
				<Box display="flex" flexDirection="row" gap="small">
					<AccountSnippet address={address} />
					{instruction.methodName}
					<FieldValue field={instruction.args} />
				</Box>
			)
	}
}
