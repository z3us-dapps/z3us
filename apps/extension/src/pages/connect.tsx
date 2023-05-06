import React from 'react'

import { Box } from 'ui/src/components-v2/box'

import { AnimatedPage } from '@src/components/animated-route'
import { useAccounts } from '@src/hooks/dapp/use-accounts'
import { useConnected } from '@src/hooks/dapp/use-connected'
import { usePersona } from '@src/hooks/dapp/use-persona'
import { useRequestData } from '@src/hooks/dapp/use-request-data'
import { useSendTransaction } from '@src/hooks/dapp/use-send-transaction'

declare global {
	namespace JSX {
		interface IntrinsicElements {
			'radix-connect-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
		}
	}
}

const Connect: React.FC = () => {
	const accounts = useAccounts()
	const persona = usePersona()
	const requestData = useRequestData()
	const sendTransaction = useSendTransaction()
	const connected = useConnected()

	return (
		<AnimatedPage>
			<Box padding="xxxlarge">
				<Box>
					<radix-connect-button />
				</Box>
				<Box marginTop="large">
					{connected && (
						<Box style={{ marginBottom: 25 }}>
							<h2>Persona: {persona?.label}</h2>
						</Box>
					)}
					{connected && (
						<Box style={{ marginBottom: 25 }}>
							<h2>Accounts:</h2>
							{accounts.map(account => (
								<Box key={account.appearanceId}>{account.label}</Box>
							))}
						</Box>
					)}
					<Box
						style={{
							textAlign: 'center',
							display: 'inline-block',
							width: 200,
						}}
					>
						<Box
							component="button"
							style={{ display: 'block', marginBottom: 10, width: '100%' }}
							onClick={() =>
								requestData({
									accounts: { quantifier: 'exactly', quantity: 2, oneTime: true },
								}).map(({ accounts: requestedAccounts }) => {
									alert(`Got wallet response!
            ${JSON.stringify(requestedAccounts, null, 2)}`)
								})
							}
						>
							Request data
						</Box>

						{connected && (
							<Box
								style={{ display: 'block', marginBottom: 10, width: '100%' }}
								onClick={() =>
									sendTransaction(`
CREATE_FUNGIBLE_RESOURCE
    18u8
    Map<String, String>(
        "name", "MyResource",                                        # Resource Name
        "symbol", "RSRC",                                            # Resource Symbol
        "description", "A very innovative and important resource"    # Resource Description
    ) 
    Map<Enum, Tuple>(
        Enum("ResourceMethodAuthKey::Withdraw"), Tuple(Enum("AccessRule::AllowAll"), Enum("AccessRule::DenyAll")),
        Enum("ResourceMethodAuthKey::Deposit"), Tuple(Enum("AccessRule::AllowAll"), Enum("AccessRule::DenyAll"))
    )
    Some(Decimal("500000"));

  CALL_METHOD
    ComponentAddress("${accounts[0].address}") 
    "deposit_batch"
    Expression("ENTIRE_WORKTOP");
`)
								}
							>
								Send transaction
							</Box>
						)}
					</Box>
				</Box>
			</Box>
		</AnimatedPage>
	)
}

export default Connect
