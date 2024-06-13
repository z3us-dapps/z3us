import type { ResponseError } from '@radixdlt/babylon-gateway-api-sdk'

export const limitRetries = failureCount => failureCount < 3

export const doNotRetryRadix4xx = (failureCount, error) => {
	if ((error as ResponseError)?.errorResponse?.code === 400) return false
	if ((error as Error)?.message === 'Invalid request: 429 received') return false
	if ((error as Error)?.message === 'Invalid request: sql: no rows in result set') return false
	return true
}

type RetryFn = (failureCount: number, error: any) => boolean

export const applyMiddleware =
	(middlewares: RetryFn[]): RetryFn =>
	(failureCount: number, error: any): boolean =>
		middlewares.every(middleware => middleware(failureCount, error) === true)

export default applyMiddleware([limitRetries, doNotRetryRadix4xx])
