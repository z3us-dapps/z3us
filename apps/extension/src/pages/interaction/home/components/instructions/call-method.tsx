/* eslint-disable no-case-declarations */
import type { KnownAddresses, Instruction as ManifestInstruction } from '@radixdlt/radix-engine-toolkit'
import {
	castValue,
	destructManifestValueTuple,
	isAccountDepositCallMethod,
	isAccountWithdrawCallMethod,
	isLockFeeCallMethod,
} from '@radixdlt/radix-engine-toolkit'
import React, { useEffect, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { ResourceSnippet } from 'ui/src/components/resource-snippet'
import FieldValue from 'ui/src/pages/accounts/components/resource-details/field-value'

import { resolveManifestAddress } from '@src/radix/manifest'

const messages = defineMessages({
	lock_fee: {
		id: 'interaction.manifest.instructions.call_method.lock_fee',
		defaultMessage: `Lock {amount} fee using {account}`,
	},
	deposit: {
		id: 'interaction.manifest.instructions.call_method.deposit',
		defaultMessage: `Deposit {bucket} into {account}`,
	},
	withdraw: {
		id: 'interaction.manifest.instructions.call_method.withdraw',
		defaultMessage: `Withdraw {amount} of {resource} from {account}`,
	},
	unknown: {
		id: 'interaction.manifest.instructions.call_method.unknown',
		defaultMessage: `{resource} -> {method} with values: {values}`,
	},
})

interface IProps {
	knownAddresses: KnownAddresses
	instruction: Extract<ManifestInstruction, { kind: 'CallMethod' }>
}

export const CallMethod: React.FC<IProps> = ({ instruction, knownAddresses }) => {
	const intl = useIntl()

	const [method, setMethod] = useState<'withdraw' | 'deposit' | 'lock_fee' | 'unknown'>()

	useEffect(() => {
		const init = async () => {
			const faucetComponentAddress = knownAddresses.componentAddresses.faucet
			if (await isLockFeeCallMethod(instruction, faucetComponentAddress)) {
				isAccountWithdrawCallMethod(instruction).then(() => setMethod('lock_fee'))
			} else if (await isAccountWithdrawCallMethod(instruction)) {
				isAccountWithdrawCallMethod(instruction).then(() => setMethod('withdraw'))
			} else if (await isAccountDepositCallMethod(instruction)) {
				isAccountWithdrawCallMethod(instruction).then(() => setMethod('deposit'))
			} else {
				setMethod('unknown')
			}
		}
		init()
	}, [instruction, knownAddresses])

	if (instruction.kind !== 'CallMethod') return null
	if (!method) return null

	const address = resolveManifestAddress(instruction.address).value

	switch (method) {
		case 'lock_fee':
			const [feeValue] = destructManifestValueTuple(instruction.args)
			const feeAmount = castValue<'Decimal'>(feeValue, 'Decimal').value
			return (
				<React.Fragment key="lock_fee">
					{intl.formatMessage(messages.lock_fee, {
						account: <ResourceSnippet address={address} />,
						amount: feeAmount.toString(),
					})}
				</React.Fragment>
			)
		case 'withdraw':
			const [resourceAddressValue, amountValue] = destructManifestValueTuple(instruction.args)
			const resourceAddress = resolveManifestAddress(castValue<'Address'>(resourceAddressValue, 'Address').value).value
			const amount = castValue<'Decimal'>(amountValue, 'Decimal').value

			return (
				<React.Fragment key="withdraw">
					{intl.formatMessage(messages.withdraw, {
						account: <ResourceSnippet address={address} />,
						resource: <ResourceSnippet address={resourceAddress} />,
						amount: amount.toString(),
					})}
				</React.Fragment>
			)
		case 'deposit':
			const [bucketValue] = destructManifestValueTuple(instruction.args)
			const accountAddress = resolveManifestAddress(instruction.address).value
			const bucket = castValue<'Bucket'>(bucketValue, 'Bucket').value
			return (
				<React.Fragment key="deposit">
					{intl.formatMessage(messages.deposit, {
						account: <ResourceSnippet address={accountAddress} />,
						bucket,
					})}
				</React.Fragment>
			)
		default:
			return (
				<React.Fragment key="default">
					{intl.formatMessage(messages.unknown, {
						method: instruction.methodName,
						resource: <ResourceSnippet address={address} />,
						values: <FieldValue field={instruction.args} />,
					})}
				</React.Fragment>
			)
	}
}
