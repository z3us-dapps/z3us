import { rest } from 'msw';

export const handlers = [
	rest.get(process.env.NEXT_PUBLIC_API_URL + '/message', (_, res, ctx) => {
		return res(
			ctx.delay(100),
			ctx.json({
				title: 'The financial crisis',
				body: 'Unemployment rates in the major advanced economies are at levels substantially higher than those prior to the Lehman shock.',
			}),
		);
	}),
	rest.get('/api/hello', (_, res, ctx) => {
		return res(
			ctx.json({
				message: 'Hello World',
				title: 'Hello title',
				body: 'Hello body',
			}),
		);
	}),
	rest.get('/api/post', (req, res, ctx) => {
		const id = req.url.searchParams.get('id');
		if (id === null) {
			return res(ctx.delay(100), ctx.status(400));
		}

		return res(
			ctx.json({
				message: 'ok',
				data: {
					id: id,
					title: 'Financial Crisis',
					body: `
            [mock server],
            The financial crisis of 2007–2008, also known as the global financial crisis (GFC), was a severe worldwide economic crisis. Prior to the COVID-19 recession in 2020, it was considered by many economists to have been the most serious financial crisis since the Great Depression. Predatory lending targeting low-income homebuyers, excessive risk-taking by global financial institutions, and the bursting of the United States housing bubble culminated in a "perfect storm". Mortgage-backed securities (MBS) tied to American real estate, as well as a vast web of derivatives linked to those MBS, collapsed in value. Financial institutions worldwide suffered severe damage, reaching a climax with the bankruptcy of Lehman Brothers on September 15, 2008 and a subsequent international banking crisis.
            The preconditions for the financial crisis were complex and multi-causal. Almost two decades prior, the U.S. Congress had passed legislation encouraging financing for affordable housing. In 1999, the Glass-Steagall legislation was repealed, permitting financial institutions to cross-pollinate their commercial (risk-averse) and proprietary trading (risk-seeking) operations. Arguably the largest contributor to the conditions necessary for financial collapse was the rapid development in predatory financial products which targeted low-income, low-information homebuyers who largely belonged to racial minorities. This market development went unattended by regulators and thus caught the U.S. government by surprise.
            After the onset of the crisis, governments deployed massive bail-outs of financial institutions and other palliative monetary and fiscal policies to prevent a collapse of the global financial system. The crisis sparked the Great Recession which resulted in increases in unemployment and suicide and decreases in institutional trust and fertility, among other metrics. The recession was a significant precondition for the European debt crisis.
            In 2010, the Dodd–Frank Wall Street Reform and Consumer Protection Act was enacted in the US as a response to the crisis to "promote the financial stability of the United States". The Basel III capital and liquidity standards were also adopted by countries around the world.
            referenced from [https://en.wikipedia.org/wiki/Financial_crisis_of_2007%E2%80%932008]
          `,
				},
			}),
		);
	}),
];
