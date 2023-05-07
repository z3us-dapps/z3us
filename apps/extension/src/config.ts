import { config as radixCfg } from '@radixdlt/connector-extension/src/config'

radixCfg.version = process.env.APP_VERSION

export const config = { ...radixCfg, version: process.env.APP_VERSION }
