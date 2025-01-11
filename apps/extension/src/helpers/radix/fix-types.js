import fs from 'fs'

fs.writeFileSync(
	'../../node_modules/@radixdlt/connector-extension/src/chrome/background/create-gateway-module.ts',
	fs
		.readFileSync(
			'../../node_modules/@radixdlt/connector-extension/src/chrome/background/create-gateway-module.ts',
			'utf8',
		)
		.replace(
			'createGatewayModule = (networkId: number) =>',
			'createGatewayModule = (networkId: number): GatewayModule =>',
		),
)

fs.writeFileSync(
	'../../node_modules/@radixdlt/connector-extension/src/chrome/offscreen/create-offscreen.ts',
	fs
		.readFileSync('../../node_modules/@radixdlt/connector-extension/src/chrome/offscreen/create-offscreen.ts', 'utf8')
		.replace('async function createOffscreen() {', 'async function createOffscreen(): Promise<void> {'),
)
