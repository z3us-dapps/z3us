type TRoadMap = {
	[key: string]: {
		date: string
		title: string
		subTitle?: string
		image?: string
		complete?: boolean
	}
}

export const roadmapData: TRoadMap = {
	beta_launch: {
		title: 'BETA launch',
		subTitle: 'Beta launch mvp',
		date: 'June, 2021',
		complete: true,
		image: '/images/roadmap-page/beta-launch.png',
	},
	share_feature: {
		title: 'DEX integrations',
		subTitle: 'Allow users to swap tokens with DEX partners',
		date: 'August, 2021',
		complete: true,
		image: '/images/roadmap-page/wallet-swap.png',
	},
	babylon_upgrades: {
		title: 'Wallet Babylon upgrades',
		subTitle: 'Wallet upgrades for the Radix babylon network upgrade.',
		date: 'Q1/Q2, 2023',
		complete: false,
	},
	ios_app: {
		title: 'Z3US ios app',
		date: 'Q3/Q4, 2023',
		complete: false,
	},
}
