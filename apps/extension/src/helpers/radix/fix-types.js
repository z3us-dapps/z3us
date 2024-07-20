import fs from 'fs'

const content = fs.readFileSync(
	'../../node_modules/@radixdlt/connector-extension/src/chrome/background/create-gateway-module.ts',
	'utf8',
)

const newContent = content.replace(
	'createGatewayModule = (networkId: number) =>',
	'createGatewayModule = (networkId: number): GatewayModule =>',
)

fs.writeFileSync(
	'../../node_modules/@radixdlt/connector-extension/src/chrome/background/create-gateway-module.ts',
	newContent,
)
