import {
	MetadataBoolArrayValueTypeEnum,
	MetadataBoolValueTypeEnum,
	MetadataDecimalArrayValueTypeEnum,
	MetadataDecimalValueTypeEnum,
	MetadataGlobalAddressArrayValueTypeEnum,
	MetadataGlobalAddressValueTypeEnum,
	MetadataI32ArrayValueTypeEnum,
	MetadataI32ValueTypeEnum,
	MetadataI64ArrayValueTypeEnum,
	MetadataI64ValueTypeEnum,
	MetadataInstantArrayValueTypeEnum,
	MetadataInstantValueTypeEnum,
	MetadataNonFungibleGlobalIdArrayValueTypeEnum,
	MetadataNonFungibleGlobalIdValueTypeEnum,
	MetadataNonFungibleLocalIdArrayValueTypeEnum,
	MetadataNonFungibleLocalIdValueTypeEnum,
	MetadataOriginArrayValueTypeEnum,
	MetadataOriginValueTypeEnum,
	MetadataPublicKeyArrayValueTypeEnum,
	MetadataPublicKeyHashArrayValueTypeEnum,
	MetadataPublicKeyHashValueTypeEnum,
	MetadataPublicKeyValueTypeEnum,
	MetadataStringArrayValueTypeEnum,
	MetadataStringValueTypeEnum,
	MetadataTypedValueFromJSON,
	MetadataU8ArrayValueTypeEnum,
	MetadataU8ValueTypeEnum,
	MetadataU32ArrayValueTypeEnum,
	MetadataU32ValueTypeEnum,
	MetadataU64ArrayValueTypeEnum,
	MetadataU64ValueTypeEnum,
	MetadataUrlArrayValueTypeEnum,
	MetadataUrlValueTypeEnum,
} from '@radixdlt/babylon-gateway-api-sdk'
import type { EntityMetadataItem } from '@radixdlt/babylon-gateway-api-sdk'
import BigNumber from 'bignumber.js'

import type { Token } from 'ui/src/services/swap/oci'
import type { ResourceBalance, ResourceBalanceType } from 'ui/src/types/types'

export const getEntityMetadataItemValue = (item?: EntityMetadataItem): any => {
	if (!item) {
		return null
	}
	if (!item.value.typed) {
		item.value.typed = MetadataTypedValueFromJSON(item.value.programmatic_json)
	}
	switch (item.value.typed.type) {
		case MetadataBoolValueTypeEnum.Bool:
		case MetadataDecimalValueTypeEnum.Decimal:
		case MetadataGlobalAddressValueTypeEnum.GlobalAddress:
		case MetadataI32ValueTypeEnum.I32:
		case MetadataI64ValueTypeEnum.I64:
		case MetadataInstantValueTypeEnum.Instant:
		case MetadataNonFungibleLocalIdValueTypeEnum.NonFungibleLocalId:
		case MetadataOriginValueTypeEnum.Origin:
		case MetadataPublicKeyValueTypeEnum.PublicKey:
		case MetadataPublicKeyHashValueTypeEnum.PublicKeyHash:
		case MetadataStringValueTypeEnum.String:
		case MetadataU32ValueTypeEnum.U32:
		case MetadataU64ValueTypeEnum.U64:
		case MetadataU8ValueTypeEnum.U8:
		case MetadataUrlValueTypeEnum.Url:
			return item.value.typed.value
		case MetadataBoolArrayValueTypeEnum.BoolArray:
		case MetadataDecimalArrayValueTypeEnum.DecimalArray:
		case MetadataGlobalAddressArrayValueTypeEnum.GlobalAddressArray:
		case MetadataI32ArrayValueTypeEnum.I32Array:
		case MetadataI64ArrayValueTypeEnum.I64Array:
		case MetadataInstantArrayValueTypeEnum.InstantArray:
		case MetadataNonFungibleGlobalIdArrayValueTypeEnum.NonFungibleGlobalIdArray:
		case MetadataNonFungibleLocalIdArrayValueTypeEnum.NonFungibleLocalIdArray:
		case MetadataOriginArrayValueTypeEnum.OriginArray:
		case MetadataPublicKeyArrayValueTypeEnum.PublicKeyArray:
		case MetadataPublicKeyHashArrayValueTypeEnum.PublicKeyHashArray:
		case MetadataStringArrayValueTypeEnum.StringArray:
		case MetadataU32ArrayValueTypeEnum.U32Array:
		case MetadataU64ArrayValueTypeEnum.U64Array:
		case MetadataUrlArrayValueTypeEnum.UrlArray:
			return item.value.typed.values
		case MetadataNonFungibleGlobalIdValueTypeEnum.NonFungibleGlobalId:
			return item.value.typed.non_fungible_id
		case MetadataU8ArrayValueTypeEnum.U8Array:
			return item.value.typed.value_hex
		default:
			// eslint-disable-next-line no-console
			console.error(`Unhandled metadata type: ${JSON.parse(item.value.typed)}`)
			return null
	}
}

export const resourceBalanceFromEntityMetadataItems = (
	address: string,
	type: ResourceBalanceType,
	amount: BigNumber,
	xrdPrice: BigNumber,
	metadata: EntityMetadataItem[],
	tokens: { [key: string]: Token },
): ResourceBalance => {
	const name = getEntityMetadataItemValue(metadata?.find(detail => detail.key === 'name'))
	const symbol = getEntityMetadataItemValue(metadata?.find(detail => detail.key === 'symbol'))
	const description = getEntityMetadataItemValue(metadata?.find(detail => detail.key === 'description'))
	const imageUrl = getEntityMetadataItemValue(metadata?.find(detail => detail.key === 'icon_url'))
	const url = getEntityMetadataItemValue(metadata?.find(detail => detail.key === 'info_url'))
	const validator = getEntityMetadataItemValue(metadata?.find(detail => detail.key === 'validator'))

	let tokenKey = symbol?.toUpperCase()
	if (!tokenKey && validator) tokenKey = 'XRD'
	const token = tokens[tokenKey] || null

	return {
		address,
		validator,
		amount: amount as BigNumber,
		value: (amount as BigNumber).multipliedBy(new BigNumber(token?.price.xrd || 0)).multipliedBy(xrdPrice),
		symbol,
		name,
		description,
		url,
		imageUrl,
		change: new BigNumber(token ? +(token.price.usd || 0) / +(token.price.usd_24h || 0) : 0),
		type,
	}
}
