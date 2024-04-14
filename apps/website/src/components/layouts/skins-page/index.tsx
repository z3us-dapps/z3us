import { ContentContainer } from '@/components/content-container'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import clsx from 'clsx'
import Image from 'next/image'
import type { CSSProperties } from 'react'
import React from 'react'

import { CardDemo } from 'ui/src/components/account-cards/demo'
import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Text } from 'ui/src/components/typography'
import { CARD_COLORS } from 'ui/src/constants/account'

import * as styles from './styles.css'

const demoNFTs = [
	{
		img: 'https://mythicalcreatures.info/media/Zeus-king-of-the-Olympian-gods-zeus-throws-lightning-bolts.jpg.webp',
		name: 'Z3US',
		description:
			'Zeus is the sky and thunder god in ancient Greek religion and mythology, who rules as king of the gods on Mount Olympus.',
		collection: '',
		item: '',
		disabled: false,
		imgStyles: {
			opacity: 1,
			objectFit: 'cover',
		} as CSSProperties,
	},
	{
		img: 'https://as1.ftcdn.net/v2/jpg/05/92/84/36/1000_F_592843613_jVcQd8WrjmXx5vzJKxHsatPoJfFeQujG.jpg',
		name: 'Poseidon',
		description:
			'Poseidon is one of the Twelve Olympians in ancient Greek religion and mythology, presiding over the sea, storms, earthquakes and horses.[2] He was the protector of seafarers and the guardian of many Hellenic cities and colonies.',
		collection: '',
		item: '',
		disabled: true,
		imgStyles: {
			opacity: 1,
			objectFit: 'cover',
		} as CSSProperties,
	},
	{
		img: 'https://t4.ftcdn.net/jpg/05/82/68/51/360_F_582685167_fIpZJdywItpOTfheab2z3rHNi49QwAor.jpg',
		name: 'Hades',
		description:
			'Hades in the ancient Greek religion and mythology, is the god of the dead and the king of the underworld, with which his name became synonymous. Although Hades was a major deity in the Greek pantheon and was the brother of Zeus and the other first generation of Olympians, his realm was far away from Olympus in the underworld, and thus he was not usually considered to be one of the Olympians.',
		collection: '',
		item: '',
		disabled: true,
		imgStyles: {
			opacity: 1,
			objectFit: 'cover',
		} as CSSProperties,
	},
	{
		img: 'https://mythicalcreatures.info/media/hera.jpg.webp',
		name: 'Hera',
		description:
			'Hera is the goddess of marriage, women, and family, and the protector of women during childbirth. In Greek mythology, she is queen of the twelve Olympians and Mount Olympus, sister and wife of Zeus',
		collection: '',
		item: '',
		disabled: true,
		imgStyles: {
			opacity: 1,
			objectFit: 'cover',
		} as CSSProperties,
	},
	{
		img: 'https://mythicalcreatures.info/media/demeter.jpg.webp',
		name: 'Demeter',
		description:
			'Demeter is the Olympian goddess of the harvest and agriculture, presiding over crops, grains, food, and the fertility of the earth.',
		collection: '',
		item: '',
		disabled: true,
		imgStyles: {
			opacity: 1,
			objectFit: 'cover',
		} as CSSProperties,
	},
	{
		img: 'https://miro.medium.com/v2/resize:fit:1400/1*aRgGXvc1mard1xdvS51wng.jpeg',
		name: 'Aphrodite',
		description:
			'Aphrodite is an ancient Greek goddess associated with love, lust, beauty, pleasure, passion, procreation, and as her syncretized Roman goddess counterpart Venus, desire, sex, fertility, prosperity, and victory',
		collection: '',
		item: '',
		disabled: true,
		imgStyles: {
			opacity: 1,
			objectFit: 'cover',
		} as CSSProperties,
	},
	{
		img: 'https://mythicalcreatures.info/media/athena-1-1536x878.jpg',
		name: 'Athena',
		description:
			'Athena often given the epithet Pallas is an ancient Greek goddess associated with wisdom, warfare, and handicraft',
		collection: '',
		item: '',
		disabled: true,
		imgStyles: {
			opacity: 1,
			objectFit: 'cover',
		} as CSSProperties,
	},
	{
		img: 'https://thegodsofolympos.weebly.com/uploads/2/0/0/3/20039799/1710558_orig.jpg',
		name: 'Artemis',
		description:
			'Artemis is the goddess of the hunt, the wilderness, wild animals, nature, vegetation, childbirth, care of children, and chastity.',
		collection: '',
		item: '',
		disabled: true,
		imgStyles: {
			opacity: 1,
			objectFit: 'cover',
		} as CSSProperties,
	},
	{
		img: 'https://mythology.guru/wp-content/uploads/2024/01/apolo-sun-god.jpg',
		name: 'Apollo',
		description:
			'Apollo has been recognized as a god of archery, music and dance, truth and prophecy, healing and diseases, the Sun and light, poetry, and more.',
		collection: '',
		item: '',
		disabled: true,
		imgStyles: {
			opacity: 1,
			objectFit: 'cover',
		} as CSSProperties,
	},
	{
		img: 'https://mythology.guru/wp-content/uploads/2023/05/ares-war-good.jpg',
		name: 'Ares',
		description:
			'Ares is the Greek god of war and courage. He is one of the Twelve Olympians, and the son of Zeus and Hera.',
		collection: '',
		item: '',
		disabled: true,
		imgStyles: {
			opacity: 1,
			objectFit: 'cover',
		} as CSSProperties,
	},
	{
		img: 'https://greekgodsandgoddesses.net/wp-content/uploads/2024/01/God-Hephaestus-1024x585.png',
		name: 'Hephaestus',
		description:
			'Hephaestus is the Greek god of artisans, blacksmiths, carpenters, craftsmen, fire, metallurgy, metalworking, sculpture and volcanoes.',
		collection: '',
		item: '',
		disabled: true,
		imgStyles: {
			opacity: 1,
			objectFit: 'cover',
		} as CSSProperties,
	},
	{
		img: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/47e43b16-5ed3-4858-9f1d-45d68401a715/deyo9sp-226f26e5-9ffc-42a6-9c89-e5761e435aee.jpg/v1/fill/w_1280,h_1151,q_75,strp/hermes_by_fallfox_deyo9sp-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTE1MSIsInBhdGgiOiJcL2ZcLzQ3ZTQzYjE2LTVlZDMtNDg1OC05ZjFkLTQ1ZDY4NDAxYTcxNVwvZGV5bzlzcC0yMjZmMjZlNS05ZmZjLTQyYTYtOWM4OS1lNTc2MWU0MzVhZWUuanBnIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.wcnBy6l6YuwT61_Ezgm06gg6VDNp8xt0BTqB7QXtAFY',
		name: 'Hermes',
		description:
			'Hermes is considered the protector of human heralds, travelers, thieves, merchants, and orators. He is able to move quickly and freely between the worlds of the mortal and the divine aided by his winged sandals.',
		collection: '',
		item: '',
		disabled: true,
		imgStyles: {
			opacity: 1,
			objectFit: 'fill',
		} as CSSProperties,
	},
	{
		img: 'https://greekreporter.com/wp-content/uploads/2023/06/dionysus-credit-pixabay-1392x926.jpg',
		name: 'Dionysus',
		description:
			'In ancient Greek religion and myth, Dionysus is the god of wine-making, orchards and fruit, vegetation, fertility, festivity, insanity, ritual madness, religious ecstasy, and theatre.',
		collection: '',
		item: '',
		disabled: true,
		imgStyles: {
			opacity: 1,
			objectFit: 'cover',
		} as CSSProperties,
	},
]

export const SkinsPage: React.FC = () => (
	<Box className={clsx(styles.faqPageWrapper)}>
		<Header />
		<Box className={styles.faqPageBodyWrapper}>
			<ContentContainer>
				<Box className={styles.faqFlexWrapper}>
					<Box className={styles.faqHeaderWrapper}>
						<Box width="full">
							<Box paddingBottom="large">
								<Text>Olympians</Text>
							</Box>
							<Box paddingBottom="large">
								<Text size="large" color="strong" weight="strong">
									Limited Skin Edition
								</Text>
							</Box>
							<Box paddingBottom="large">
								<Text size="medium">
									In ancient Greek religion and mythology, the twelve Olympians are the major deities of the Greek
									pantheon, commonly considered to be Zeus, Poseidon, Hera, Demeter, Aphrodite, Athena, Artemis, Apollo,
									Ares, Hephaestus, Hermes, and Dionysus. This collection represents limited edition of Z3US wallet skin
									NFTs consisting only of 12 items!
								</Text>
							</Box>
							<Box display="flex" flexDirection="column" gap="large" width="full">
								{demoNFTs.map(({ name, img, imgStyles, description, disabled }, idx) => (
									<Box display="flex" flexDirection="column" gap="small" width="full">
										<Box paddingBottom="large">
											<Text size="xxxlarge" color="strong" weight="strong">
												{name}
											</Text>
											{disabled && <Text>(coming soon)</Text>}
										</Box>
										<Box className={clsx(styles.accountsCardWrapper)}>
											<Box className={clsx(styles.cardWrapper)}>
												<CardDemo
													name={`${name} (Limited Edition)`}
													imageSrc={img}
													imgStyles={imgStyles}
													colorClassName={Object.keys(CARD_COLORS)[idx % Object.keys(CARD_COLORS).length]}
												/>
											</Box>
										</Box>
										<Box display="flex" flexDirection="column" gap="xxsmall" justifyContent="space-between">
											<Box>
												<Text size="large" color="strong">
													{description}
												</Text>
											</Box>
											{!disabled && (
												<Box display="flex" flexDirection="column" gap="large" width="full">
													<Button sizeVariant="large" styleVariant="primary" onClick={console.log} disabled={disabled}>
														Bid
													</Button>
													<Button sizeVariant="large" styleVariant="primary" onClick={console.log} disabled={disabled}>
														Withdraw
													</Button>
												</Box>
											)}
										</Box>
									</Box>
								))}
							</Box>
						</Box>
					</Box>
				</Box>
			</ContentContainer>
		</Box>
		<Box className={styles.landingPageInvadersWrapper}>
			<Box className={styles.landingPageInvadersInnerWrapper}>
				<Image
					priority
					src="/landing-page-2023/purple-invaders-horizontal-bg.png"
					width={1440}
					height={244}
					alt="Vanilla Extract logo"
				/>
			</Box>
		</Box>
		<Box className={clsx(styles.landingPagePurpleWrapper, styles.landingPageFooterWrapper)}>
			<Footer textColor="strong" />
		</Box>
	</Box>
)
