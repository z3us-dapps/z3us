export function buildPersonaDerivationPath(networkId: number, idx: number) {
	return `m/44H/1022H/${networkId}H/618H/1460H/${idx}H`
}

export function buildAccountDerivationPath(networkId: number, idx: number) {
	return `m/44H/1022H/${networkId}H/525H/1460H/${idx}H`
}
