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
		title: 'Beta launch mvp',
		subTitle: 'Beta launch mvp',
		date: 'June, 2021',
		complete: true,
		image: '/images/roadmap-page/roadmap-bg.webp',
	},
	share_feature: {
		title: 'Swap dex integration',
		subTitle: 'Allow users to swap tokens with DEX partners',
		date: 'August, 2021',
		complete: true,
		image: '/images/roadmap-page/roadmap-bg.webp',
	},
	browser_desktop: {
		title: 'Desktop browser Z3US app',
		subTitle: 'Custom desktop app',
		date: 'Janruary, 2023',
		complete: false,
	},
	babylon_upgrades: {
		title: 'Babylon upgrades',
		subTitle: 'Wallet upgrades for the Radix babylon network upgrade.',
		date: 'TBD, 2023',
		complete: false,
	},
	nft_integration: {
		title: 'NFT wallet integration',
		subTitle: "Allow users to view, send and receive NFT's from Z3US wallet",
		date: 'TBD, 2023',
		complete: false,
	},
	ios_app: {
		title: 'Z3US ios app',
		date: 'TBD, 2023',
		complete: false,
	},
}
