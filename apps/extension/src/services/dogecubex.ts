export type Config = {
	minOrderSize: number
	maxOrderSize: number
	stakingMaxOrders: {
		'1000': string
		'10000': string
		'100000': string
		'1000000': string
	}
	stakingOrderLimits: {
		'1000': number
		'10000': number
		'100000': number
		'1000000': number
	}
	stakerMaxOrderSize: number
	swapTransferFeeXrd: number
	swapRefundFeeXrd: number
	exchangeFee: number
}

export type QuoteQuery = {
	from: string
	to: string
	maxSlippage: string
	amountFrom: string | null
	amountTo: string | null
}

export type Quote = {
	sentAmount: string
	receivedAmount: string
	minAmount: string
	price: string
	priceImpact: string
	resultingPrice: string
	error: null | string
}

export type Pool = {
	wallet: string
	rri: string
}

export const PoolName = 'DogeCubeX'

const supportedTokens = [
	{
		rri: 'oci_rr1qws04shqrz3cdjljdp5kczgv7wd3jxytagk95qlk7ecquzq8e7',
		wallet: 'rdx1qspd0ge3x32v9an07c660lhd7mal99rsyn4k9glnwf84z5a99tef59g904j5e',
	},
	{
		rri: 'dgc_rr1qvnre767vp607yr9pqzqhlprg72q2ny5pj4agn53k0pqy6huxw',
		wallet: 'rdx1qspd0ge3xef9qp80phgckn4hxlgyxnjtgskphld9y94pffelmh6hqhq7waky7',
	},
	// {rri: 'spunks_rr1qvrlq59ll3h7cercrv7vacxv9xefralues7lumkhpvjsaplxhs', wallet: ''},
	{
		rri: 'inu_rr1qw9zhy7tzs85jhsm0y3jrlggfkjku673h4aze6836g8qslavfy',
		wallet: 'rdx1qspd0ge3xq43kurjuvgxx20czc47ngy86ja9csqld95eamshhapeu5g83ved8',
	},
	{
		rri: 'smk_rr1qd0rlezadc6304qu2qnalst6fkx7526h8hjn73ku42ysljew6r',
		wallet: 'rdx1qspd0ge3xh0alqwqafg2c5rmvrgwh3vrp2tmvmqnun3hd0pc46uhj2qat7ep7',
	},
	{
		rri: 'xse_rr1qw2j8vccv7qvswjunudae67aj8ev2tku08ry2jaufedsnnvxzu',
		wallet: 'rdx1qspd0ge3xl5926rd7eucrqm7u6tg8spuhrg7e26ww6slvtzurk9vnwgd7rz3t',
	},
	{
		rri: 'foton_rr1qwsqw647kcykj562vzvgekfqthjyt4txmqljqv90mp6s74glca',
		wallet: 'rdx1qspd0ge3xewa6nrlnjfj5ylptgqz6vl64z46wq08e75d53z0rdn70fqnfm677',
	},
	{
		rri: 'gnrd_rr1qv0jw6lf83d5q55plnkfcyj8yr3n2epns0zdveudwzyqtm749w',
		wallet: 'rdx1qspd0ge3xd9tqzhgqw9rf23nkyra50rfvcht7hluqdh8x9kyefntxuqgzll4z',
	},
	{
		rri: 'flipp_rr1qw8gpjky9hghmfztlw3qvrcjrn5un9t66js9ymvr58mqezewyh',
		wallet: 'rdx1qspd0ge3xykzl392ta0uht2vmusfdlaywelykcy0l0rs3lv90hl89hg5089z0',
	},
	{
		rri: 'shkl_rr1qdm3llhz6lx24zywqdersjzgtd2vs9wl7kqzfsezkdyqvpseeq',
		wallet: 'rdx1qspd0ge3x0a0lzdu8prsvqe84u9nrs6ddl6ftmsjdxkyk20kezxwstqc3v0gt',
	},
	{
		rri: 'vkc_rr1qd6uup3xpltj6rvt4tz4jwd6ljsl565fh7ycr94z6ccsxt66mv',
		wallet: 'rdx1qspd0ge3x6mvufwx2xjp2h6wgtpljzea5dy84zk2qssmv3wwe5u5j7qklvyfs',
	},
	{
		rri: 'planet_rr1qv69lwksa7hc4g5ygfsf00mhhxuyr23atqxx0ergyk3qgv0gd8',
		wallet: 'rdx1qspd0ge3xldpylhj60367mpayewwlmnj07y5uj8dptd288xh7a6prqq22c6tz',
	},
	{
		rri: 'ida_rr1q02f7qtfpaf0r2wgwuhqjnvpvxr8d6qu2ttef7hdjadq42ucqf',
		wallet: 'rdx1qspd0ge3xn0nax0wuf3rtdzz2cug22x7xt0uyc3gar3px0ug4ws0szgptu5tg',
	},
	// {rri: 'r95_rr1q0fxd9clp6hhtj96z69nwvj9wd5pxtgthsmt9tpkdyes2klhmd', wallet: ''},
	{
		rri: 'art_rr1qwqamfqx28xaj35apqulpy2luf6pdtm0ulsdh2xnj25qpscm93',
		wallet: 'rdx1qspd0ge3xxqckgh2850ms0stewm4vcahdndrctqkfzwaq90wjxf4v0qfn9gec',
	},
	{
		rri: 'dph_rr1q0u596jglfn5equqskmej2v55jheqlmvg0a3nk4dumfqafrk73',
		wallet: 'rdx1qspd0ge3xxw7ud70dy2p5jglmmjuc5e3rhgehdvl3h2ygu0phwf2ypcht6sxd',
	},
	{
		rri: 'luck_rr1qv8aqx2u6veqs06nzuzrchfms8fz3t33vrxx9mjgja8q6uze43',
		wallet: 'rdx1qspd0ge3xtr90xsswuzg0l08n432dklx5jc0hdf0cwugdsx969j3lkq3wcky2',
	},
]

export class DogeCubeXService {
	private baseURL: string = 'https://dogecubex.live'

	private options: RequestInit = {
		method: 'GET',
		mode: 'no-cors',
		headers: {
			'Content-Type': 'application/json',
		},
	}

	getConfig = async (): Promise<Config> => {
		const response = await fetch(`${this.baseURL}/config/get-config?q=${new Date().getTime()}`, this.options)
		if (response.status !== 200) {
			throw new Error(`Invalid request: ${response.status} recieved`)
		}

		return response.json()
	}

	getQuote = async (query: QuoteQuery): Promise<Quote> => {
		const response = await fetch(`${this.baseURL}/swap/quote?q=${new Date().getTime()}`, {
			...this.options,
			method: 'POST',
			body: JSON.stringify(query),
		})
		if (response.status !== 200) {
			throw new Error(`Invalid request: ${response.status} recieved`)
		}

		return response.json()
	}

	// eslint-disable-next-line class-methods-use-this
	getPools = async (): Promise<Pool[]> => supportedTokens
}

const service = new DogeCubeXService()
export default service
