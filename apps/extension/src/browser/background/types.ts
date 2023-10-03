export enum MessageAction {
	BACKGROUND_PING = 'v1-background-ping',

	BACKGROUND_VAULT_GET = 'v1-background-vault-get',
	BACKGROUND_VAULT_LOCK = 'v1-background-vault-lock',
	BACKGROUND_VAULT_UNLOCK = 'v1-background-vault-unlock',
	BACKGROUND_VAULT_SAVE = 'v1-background-vault-store',
	BACKGROUND_VAULT_REMOVE = 'v1-background-vault-remove',
	BACKGROUND_VAULT_IS_UNLOCKED = 'v1-background-vault-is-unlocked',
	BACKGROUND_VAULT_IS_SECRET_EMPTY = 'v1-background-vault-is-secret-empty',

	BACKGROUND_SIGN_TO_SIGNATURE = 'v1-background-sign-to-signature',
	BACKGROUND_SIGN_TO_SIGNATURE_WITH_PUBLIC_KEY = 'v1-background-sign-to-signature-with-public-key',
	BACKGROUND_GET_PUBLIC_KEY = 'v1-background-get-public-key',

	BACKGROUND_RADIX = 'v1-background-radix',
}
