/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	Expression,
	type ManifestBuilder,
	ValueKind,
	bool,
	decimal,
	enumeration,
	expression,
	map,
	tuple,
	u8,
} from '@radixdlt/radix-engine-toolkit'

interface CreateFungibleToken {
	initialSupply: number
	name: string
	symbol: string
	description: string
	icon_url?: string
}

interface CreateNftToken {
	icon_url?: string
	name: string
	description: string
	initialSupply: number
	items: string[]
}

export const createToken = (manifest: ManifestBuilder, address: string) => ({
	fungible: (tokens: CreateFungibleToken[]) =>
		tokens
			.reduce(
				(group, { initialSupply, ...details }) =>
					// group.createNonFungibleResourceWithInitialSupply(
					// 	bool(true),
					// 	u8(18),
					// 	map(ValueKind.String, ValueKind.String, Object.entries(details)),
					// 	map(ValueKind.Enum, ValueKind.Tuple, []),
					// 	decimal(initialSupply),
					// ),
					group,
				manifest,
			)
			.callMethod(address, 'deposit_batch', [expression(Expression.EntireWorktop)]),
	nft: (nfts: CreateNftToken[]) =>
		nfts
			.reduce(
				(group, { items, initialSupply, ...details }) =>
					// group.createNonFungibleResourceWithInitialSupply(
					// 	bool(true),
					// 	enumeration(0),
					// 	tuple([
					// 		map(ValueKind.Tuple, ValueKind.Enum, []),
					// 		map(ValueKind.String, ValueKind.Enum, []),
					// 		enumeration(0),
					// 		map(ValueKind.Tuple, ValueKind.Enum, []),
					// 		map(ValueKind.String, ValueKind.Enum, []),
					// 		enumeration(0),
					// 	]),
					// 	map(
					// 		ValueKind.String,
					// 		ValueKind.String,
					// 		Object.entries(details),
					// 	),
					// 	map(ValueKind.Enum, ValueKind.Tuple, []),
					// 	decimal(initialSupply),
					// ),
					group,
				manifest,
			)
			.callMethod(address, 'deposit_batch', [expression(Expression.EntireWorktop)]),
})
