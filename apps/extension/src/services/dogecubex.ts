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
	amountFrom?: string
	amountTo?: string
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
		wallet: 'rdx1qspd0ge3x32v9an07c660lhd7mal99rsyn4k9glnwf84z5a99tef59g904j5e',
		rri: 'oci_rr1qws04shqrz3cdjljdp5kczgv7wd3jxytagk95qlk7ecquzq8e7',
	},
	{
		wallet: 'dgc_rr1qvnre767vp607yr9pqzqhlprg72q2ny5pj4agn53k0pqy6huxw',
		rri: 'rdx1qspd0ge3xef9qp80phgckn4hxlgyxnjtgskphld9y94pffelmh6hqhq7waky7',
	},
	// {wallet: 'spunks_rr1qvrlq59ll3h7cercrv7vacxv9xefralues7lumkhpvjsaplxhs', rri: ''},
	{
		wallet: 'inu_rr1qw9zhy7tzs85jhsm0y3jrlggfkjku673h4aze6836g8qslavfy',
		rri: 'rdx1qspd0ge3xq43kurjuvgxx20czc47ngy86ja9csqld95eamshhapeu5g83ved8',
	},
	{
		wallet: 'smk_rr1qd0rlezadc6304qu2qnalst6fkx7526h8hjn73ku42ysljew6r',
		rri: 'rdx1qspd0ge3xh0alqwqafg2c5rmvrgwh3vrp2tmvmqnun3hd0pc46uhj2qat7ep7',
	},
	{
		wallet: 'xse_rr1qw2j8vccv7qvswjunudae67aj8ev2tku08ry2jaufedsnnvxzu',
		rri: 'rdx1qspd0ge3xl5926rd7eucrqm7u6tg8spuhrg7e26ww6slvtzurk9vnwgd7rz3t',
	},
	{
		wallet: 'foton_rr1qwsqw647kcykj562vzvgekfqthjyt4txmqljqv90mp6s74glca',
		rri: 'rdx1qspd0ge3xewa6nrlnjfj5ylptgqz6vl64z46wq08e75d53z0rdn70fqnfm677',
	},
	{
		wallet: 'gnrd_rr1qv0jw6lf83d5q55plnkfcyj8yr3n2epns0zdveudwzyqtm749w',
		rri: 'rdx1qspd0ge3xd9tqzhgqw9rf23nkyra50rfvcht7hluqdh8x9kyefntxuqgzll4z',
	},
	{
		wallet: 'flipp_rr1qw8gpjky9hghmfztlw3qvrcjrn5un9t66js9ymvr58mqezewyh',
		rri: 'rdx1qspd0ge3xykzl392ta0uht2vmusfdlaywelykcy0l0rs3lv90hl89hg5089z0',
	},
	{
		wallet: 'shkl_rr1qdm3llhz6lx24zywqdersjzgtd2vs9wl7kqzfsezkdyqvpseeq',
		rri: 'rdx1qspd0ge3x0a0lzdu8prsvqe84u9nrs6ddl6ftmsjdxkyk20kezxwstqc3v0gt',
	},
	{
		wallet: 'vkc_rr1qd6uup3xpltj6rvt4tz4jwd6ljsl565fh7ycr94z6ccsxt66mv',
		rri: 'rdx1qspd0ge3x6mvufwx2xjp2h6wgtpljzea5dy84zk2qssmv3wwe5u5j7qklvyfs',
	},
	{
		wallet: 'planet_rr1qv69lwksa7hc4g5ygfsf00mhhxuyr23atqxx0ergyk3qgv0gd8',
		rri: 'rdx1qspd0ge3xldpylhj60367mpayewwlmnj07y5uj8dptd288xh7a6prqq22c6tz',
	},
	{
		wallet: 'ida_rr1q02f7qtfpaf0r2wgwuhqjnvpvxr8d6qu2ttef7hdjadq42ucqf',
		rri: 'rdx1qspd0ge3xn0nax0wuf3rtdzz2cug22x7xt0uyc3gar3px0ug4ws0szgptu5tg',
	},
	// {wallet: 'r95_rr1q0fxd9clp6hhtj96z69nwvj9wd5pxtgthsmt9tpkdyes2klhmd', rri: ''},
	{
		wallet: 'art_rr1qwqamfqx28xaj35apqulpy2luf6pdtm0ulsdh2xnj25qpscm93',
		rri: 'rdx1qspd0ge3xxqckgh2850ms0stewm4vcahdndrctqkfzwaq90wjxf4v0qfn9gec',
	},
	{
		wallet: 'dph_rr1q0u596jglfn5equqskmej2v55jheqlmvg0a3nk4dumfqafrk73',
		rri: 'rdx1qspd0ge3xxw7ud70dy2p5jglmmjuc5e3rhgehdvl3h2ygu0phwf2ypcht6sxd',
	},
	{
		wallet: 'luck_rr1qv8aqx2u6veqs06nzuzrchfms8fz3t33vrxx9mjgja8q6uze43',
		rri: 'rdx1qspd0ge3xtr90xsswuzg0l08n432dklx5jc0hdf0cwugdsx969j3lkq3wcky2',
	},
]

export class DogeCubeXService {
	private baseURL: string = 'https://dogecubex.live/'

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
		const q = new URLSearchParams(Object.entries(query))
		const response = await fetch(`${this.baseURL}/swap/quote?q=${new Date().getTime()}&${q.toString()}`, this.options)
		if (response.status !== 200) {
			throw new Error(`Invalid request: ${response.status} recieved`)
		}

		return response.json()
	}

	// eslint-disable-next-line class-methods-use-this
	getPools = async (): Promise<Pool[]> => supportedTokens
}
