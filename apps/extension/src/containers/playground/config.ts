const defaultMobileRouteAnimation = {
	transition: { duration: 0.5 },
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -20 },
}

const defaultDesktopRouteAnimation = {
	transition: { duration: 0.5 },
	initial: { opacity: 0, x: 20 },
	animate: { opacity: 1, x: 0 },
	exit: { opacity: 0, x: -20 },
}

export const slugInfo = {
	HOME: { slug: '/', mobileAnimation: defaultMobileRouteAnimation, desktopAnimation: defaultDesktopRouteAnimation },
	ACCOUNTS: {
		slug: '/accounts',
		mobileAnimation: defaultMobileRouteAnimation,
		desktopAnimation: defaultDesktopRouteAnimation,
	},
	STAKING: {
		slug: '/accounts/staking',
		mobileAnimation: defaultMobileRouteAnimation,
		desktopAnimation: defaultDesktopRouteAnimation,
	},
}
