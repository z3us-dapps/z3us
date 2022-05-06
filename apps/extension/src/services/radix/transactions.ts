import { RadixService } from '@src/services/radix'
import { Message } from '@radixdlt/crypto'
import {
	AccountT,
	Network,
	ResourceIdentifier,
	ValidatorAddress,
	Amount,
	AccountAddress,
	IntendedTransferTokens,
	IntendedStakeTokens,
	IntendedUnstakeTokens,
	AmountT,
} from '@radixdlt/application'
import BigNumber from 'bignumber.js'
import { createEncryptedMessage, createPlaintextMessage } from './message'
import { parseAccountAddress } from './serializer'
import { ExtendedActionType, NewTokenDefinition } from '../types'

const buildAmount = (value: string): AmountT => {
	const bigAmount = new BigNumber(value)
	const amountInput = bigAmount.shiftedBy(18) // Atto
	const amountResult = Amount.fromUnsafe(amountInput.toFixed())
	if (!amountResult) {
		throw new Error(`Failed to parse amount value ${value}`)
	}
	if (amountResult.isErr()) {
		throw amountResult.error
	}

	return amountResult.value
}

export const BuildTransaction = async (nodeURL: URL, payload: any) => {
	const service = new RadixService(nodeURL)
	return service.buildRawTransaction(payload)
}

export const SubmitSignedTransaction = async (nodeURL: URL, account: AccountT, signedTransaction: string) => {
	const service = new RadixService(nodeURL)
	return service.submitSignedTransaction(account.network, signedTransaction)
}

export const FinalizeTransaction = async (
	nodeURL: URL,
	account: AccountT,
	rriName: string,
	transaction: {
		blob: string
		hashOfBlobToSign: string
	},
) => {
	const service = new RadixService(nodeURL)

	const nonXrdHRP = rriName !== 'xrd' ? rriName : undefined
	const sign = (account as AccountT).sign(transaction, nonXrdHRP)
	const signature = await sign.toPromise()

	return service.finalizeTransaction(account?.network as Network, {
		transaction,
		signature,
		publicKeyOfSigner: (account as AccountT).publicKey,
	})
}

export const TransferTokens = async (
	nodeURL: URL,
	account: AccountT,
	rri: string,
	from: string,
	to: string,
	amount: string,
	message?: string,
	encryptMessage = false,
) => {
	const service = new RadixService(nodeURL)

	const rriResult = ResourceIdentifier.fromUnsafe(rri)
	if (rriResult.isErr()) {
		throw rriResult.error
	}
	const fromResult = AccountAddress.fromUnsafe(from)
	if (fromResult.isErr()) {
		throw fromResult.error
	}
	const toResult = AccountAddress.fromUnsafe(to)
	if (toResult.isErr()) {
		throw toResult.error
	}
	const actionResult = IntendedTransferTokens.create(
		{
			to_account: toResult.value,
			amount: buildAmount(amount),
			tokenIdentifier: rriResult.value,
		},
		fromResult.value,
	)
	if (actionResult.isErr()) {
		throw actionResult.error
	}
	let messageBuffer
	if (message) {
		if (encryptMessage) {
			const ecnrypted = await createEncryptedMessage(message, account, toResult.value)
			messageBuffer = ecnrypted.combined()
		} else {
			const plain = await createPlaintextMessage(message)
			messageBuffer = plain.bytes
		}
	}
	return service.buildTransaction(from, [actionResult.value], messageBuffer)
}

export const StakeTokens = async (nodeURL: URL, rri: string, from: string, validator: string, amount: string) => {
	const service = new RadixService(nodeURL)

	const rriResult = ResourceIdentifier.fromUnsafe(rri)
	if (rriResult.isErr()) {
		throw rriResult.error
	}
	const fromResult = AccountAddress.fromUnsafe(from)
	if (fromResult.isErr()) {
		throw fromResult.error
	}
	const validatorResult = ValidatorAddress.fromUnsafe(validator)
	if (validatorResult.isErr()) {
		throw validatorResult.error
	}
	const actionResult = IntendedStakeTokens.create(
		{
			to_validator: validatorResult.value,
			amount: buildAmount(amount),
			tokenIdentifier: rriResult.value,
		},
		fromResult.value,
	)
	if (actionResult.isErr()) {
		throw actionResult.error
	}
	return service.buildTransaction(from, [actionResult.value])
}

export const UnstakeTokens = async (nodeURL: URL, rri: string, to: string, validator: string, amount: string) => {
	const service = new RadixService(nodeURL)

	const rriResult = ResourceIdentifier.fromUnsafe(rri)
	if (rriResult.isErr()) {
		throw rriResult.error
	}
	const toResult = AccountAddress.fromUnsafe(to)
	if (toResult.isErr()) {
		throw toResult.error
	}
	const validatorResult = ValidatorAddress.fromUnsafe(validator)
	if (validatorResult.isErr()) {
		throw validatorResult.error
	}
	const actionResult = IntendedUnstakeTokens.create(
		{
			from_validator: validatorResult.value,
			amount: buildAmount(amount),
			tokenIdentifier: rriResult.value,
		},
		toResult.value,
	)
	if (actionResult.isErr()) {
		throw actionResult.error
	}
	return service.buildTransaction(to, [actionResult.value])
}

export const DeriveToken = async (nodeURL: URL, owner: string, symbol: string) => {
	const service = new RadixService(nodeURL)

	const ownerResult = AccountAddress.fromUnsafe(owner)
	if (ownerResult.isErr()) {
		throw ownerResult.error
	}

	const address = ownerResult.value

	return service.tokenDerive(address.network, symbol, address.publicKey.toString())
}

export const CreateToken = async (
	nodeURL: URL,
	rri: string,
	owner: string,
	amount: string,
	token: NewTokenDefinition,
) => {
	const service = new RadixService(nodeURL)

	const rriResult = ResourceIdentifier.fromUnsafe(rri)
	if (rriResult.isErr()) {
		throw rriResult.error
	}
	const ownerResult = AccountAddress.fromUnsafe(owner)
	if (ownerResult.isErr()) {
		throw ownerResult.error
	}

	return service.buildTransaction(owner, [
		{
			type: ExtendedActionType.CREATE_TOKEN,
			to_account: ownerResult.value,
			amount: buildAmount(token.is_supply_mutable ? '0' : amount),
			rri: rriResult.value,
			token,
		},
	])
}

export const MintToken = async (nodeURL: URL, rri: string, to: string, amount: string) => {
	const service = new RadixService(nodeURL)

	const rriResult = ResourceIdentifier.fromUnsafe(rri)
	if (rriResult.isErr()) {
		throw rriResult.error
	}
	const toResult = AccountAddress.fromUnsafe(to)
	if (toResult.isErr()) {
		throw toResult.error
	}

	return service.buildTransaction(to, [
		{
			type: ExtendedActionType.MINT_TOKENS,
			to_account: toResult.value,
			amount: buildAmount(amount),
			rri: rriResult.value,
		},
	])
}

export const BurnToken = async (nodeURL: URL, rri: string, from: string, amount: string) => {
	const service = new RadixService(nodeURL)

	const rriResult = ResourceIdentifier.fromUnsafe(rri)
	if (rriResult.isErr()) {
		throw rriResult.error
	}
	const fromResult = AccountAddress.fromUnsafe(from)
	if (fromResult.isErr()) {
		throw fromResult.error
	}

	return service.buildTransaction(from, [
		{
			type: ExtendedActionType.BURN_TOKENS,
			from_account: fromResult.value,
			amount: buildAmount(amount),
			rri: rriResult.value,
		},
	])
}

export const decryptTransaction = async (account: AccountT, from: string, msg: string): Promise<string> => {
	const messageBuffer = Buffer.from(msg, 'hex')
	const encryptedMessageResult = Message.fromBuffer(messageBuffer)
	if (!encryptedMessageResult.isOk()) {
		return msg
	}

	const encryptedMessage = encryptedMessageResult.value
	if (encryptedMessage.kind !== 'ENCRYPTED') return encryptedMessage.plaintext

	const fromAddress = parseAccountAddress(from)
	const publicKeyOfOtherParty = fromAddress.publicKey

	const message = await account.decrypt({ encryptedMessage, publicKeyOfOtherParty }).toPromise()

	if (!message) {
		throw new Error('Failed to decrypt message.')
	}

	return message
}
