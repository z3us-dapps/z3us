export const isValidAddress = (value: string): boolean =>
	value.startsWith('package_') ||
	value.startsWith('resource_') ||
	value.startsWith('component_') ||
	value.startsWith('account_') ||
	value.startsWith('identity_') ||
	value.startsWith('consensus_manager_') ||
	value.startsWith('validator_') ||
	value.startsWith('access_controller_') ||
	value.startsWith('pool_') ||
	value.startsWith('transaction_tracker_') ||
	value.startsWith('internal_vault_') ||
	value.startsWith('internal_component_') ||
	value.startsWith('internal_key_value_store_')
