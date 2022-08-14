import { Message } from '@radixdlt/crypto'
import { TokenNativeResponse, TokenResponse, TokenAmount, Validator, TransactionInfo } from '@radixdlt/networking'
import {
	AccountAddress,
	ValidatorAddress,
	Amount,
	ResourceIdentifier,
	TransactionIdentifier,
	ResourceIdentifierT,
	TransactionIdentifierT,
	AccountAddressT,
	ValidatorAddressT,
	AmountT,
} from '@radixdlt/application'
import { defaultToken, defaultTokenSettings } from '@src/config'
import {
	Token,
	Transaction,
	Action,
	Validator as InternalValidator,
	TokenAmount as InternalTokenAmount,
} from '@src/types'

export const parseTransactionIdentifier = (hash: string): TransactionIdentifierT => {
	const result = TransactionIdentifier.create(hash)
	if (result.isErr()) {
		throw result.error
	}
	return result.value
}

export const parseResourceIdentifier = (rri: string): ResourceIdentifierT => {
	const result = ResourceIdentifier.fromUnsafe(rri)
	if (result.isErr()) {
		throw result.error
	}
	return result.value
}

export const parseAccountAddress = (address: string): AccountAddressT => {
	const result = AccountAddress.fromUnsafe(address)
	if (result.isErr()) {
		throw result.error
	}
	return result.value
}

export const parseValidatorAddress = (address: string): ValidatorAddressT => {
	const result = ValidatorAddress.fromUnsafe(address)
	if (result.isErr()) {
		throw result.error
	}
	return result.value
}

export const parseAmount = (amount: string | number): AmountT => {
	const result = Amount.fromUnsafe(amount)
	if (result.isErr()) {
		throw result.error
	}
	return result.value
}

export const parseMessage = (message?: string) => {
	if (!message) return undefined

	const FAILED_MSG = '<Failed to interpret message>'

	// Check format
	if (!/^(00|01|30)[0-9a-fA-F]+$/.test(message)) return FAILED_MSG

	try {
		if (Message.isHexEncoded(message)) {
			const decoded = Message.plaintextToString(Buffer.from(message, 'hex'), 0)
			return Message.isPlaintext(decoded) ? Message.plaintextToString(Buffer.from(decoded, 'hex')) : decoded
		}

		return Message.isPlaintext(message) ? Message.plaintextToString(Buffer.from(message, 'hex')) : message
	} catch (error) {
		return FAILED_MSG
	}
}

export const parseValidator = (validator: Validator): InternalValidator => ({
	address: validator.validator_identifier.address,
	ownerAddress: validator.properties.owner_account_identifier.address,
	name: validator.properties.name,
	infoURL: validator.properties.url,
	totalDelegatedStake: validator.stake.value,
	rri: validator.stake.token_identifier.rri,
	ownerDelegation: validator.info.owner_stake.value,
	validatorFee: validator.properties.validator_fee_percentage,
	registered: validator.properties.registered,
	isExternalStakeAccepted: validator.properties.external_stake_accepted,
	uptimePercentage: validator.info.uptime.uptime_percentage,
	proposalsMissed: validator.info.uptime.proposals_missed,
	proposalsCompleted: validator.info.uptime.proposals_completed,
})

export const parseToken = (response: TokenNativeResponse | TokenResponse): Token => {
	const rri = parseResourceIdentifier(response.token.token_identifier.rri)
	return {
		...defaultToken,
		...defaultTokenSettings[rri.name],
		rri: response.token.token_identifier.rri,
		name: response.token.token_properties.name ?? '',
		symbol: response.token.token_properties.symbol,
		description: response.token.token_properties.description,
		granularity: response.token.token_properties.granularity,
		isSupplyMutable: response.token.token_properties.is_supply_mutable,
		currentSupply: response.token.token_supply.value,
		tokenInfoURL: response.token.token_properties.url,
		iconURL: response.token.token_properties.icon_url,
	}
}

export const parseTokenAmount = ({ value, token_identifier }: TokenAmount): InternalTokenAmount => {
	const rri = parseResourceIdentifier(token_identifier.rri)

	return {
		...defaultToken,
		...defaultTokenSettings[rri.name],
		amount: value,
		rri: token_identifier.rri,
		symbol: rri.name,
	}
}

export const parseAction = (action: any): Action => ({
	...action,
	type: action.type,
	amount: action?.amount?.value,
	rri: action?.amount?.token_identifier.rri,
	from_account: action?.from_account?.address,
	to_account: action?.to_account?.address,
	from_validator: action?.from_validator?.address,
	to_validator: action?.to_validator?.address,
	unstake_percentage: action?.unstake_percentage,
})

export const parseTx = (transaction: TransactionInfo): Transaction => ({
	id: transaction.transaction_identifier.hash,
	sentAt: transaction.transaction_status.confirmed_time
		? new Date(transaction.transaction_status.confirmed_time)
		: null,
	fee: transaction.fee_paid.value,
	message: transaction.metadata.message ?? '',
	actions: transaction.actions.map(parseAction),
	status: transaction.transaction_status.status,
})
