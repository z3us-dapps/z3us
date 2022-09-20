type TRoadMap = {
	[key: string]: {
		image: string
		order?: number
	}
}

export const roadmapData: TRoadMap = {
	xrd: { image: 'images/token-images/xrd.png', order: 0 },
	oci: { image: 'images/token-images/oci.png', order: 1 },
	dgc: { image: 'images/token-images/dgc.png', order: 2 },
	inu: { image: 'images/token-images/inu.png' },
	caviar: { image: 'images/token-images/caviar.png' },
	sfloop: { image: 'images/token-images/sfloop.png' },
	floop: { image: 'images/token-images/floop.png' },
	planet: { image: 'images/token-images/planet.png' },
	dph: { image: 'images/token-images/dph.png' },
	arena: { image: 'images/token-images/arena.png' },
	easy: { image: 'images/token-images/easy.png' },
	xseed: { image: 'images/token-images/xseed.png' },
}
