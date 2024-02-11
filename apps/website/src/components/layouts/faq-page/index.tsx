import { ContentContainer } from '@/components/content-container'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

import {
	AccordionContent,
	AccordionHeader,
	AccordionItem,
	AccordionRoot,
	AccordionTrigger,
} from 'ui/src/components/accordion'
import { Box } from 'ui/src/components/box'
import { ArrowRightIcon } from 'ui/src/components/icons'
import { Text } from 'ui/src/components/typography'

import * as styles from './styles.css'

const FAQ_ITEMS = [
	{
		question: 'How can I create a new wallet?',
		answer: (
			<Box>
				<Text size="large" color="strong">
					Z3US enables you to generate new seed phrase-based wallets. You&apos;ll receive a set of 24 words that you
					must write down. These words are crucial for wallet restoration in case it&apos;s ever necessary.
				</Text>
			</Box>
		),
	},
	{
		question: 'How can I restore my existing wallet?',
		answer: (
			<Box>
				<Text size="large" color="strong">
					Z3US provides multiple methods for wallet restoration, including:{' '}
				</Text>
				<Box component="ul">
					<Box component="li">
						<Box display="inline-flex">
							<Text size="large" color="strong">
								Radix mobile
							</Text>
						</Box>
					</Box>
					<Box component="li">
						<Box display="inline-flex">
							<Text size="large" color="strong">
								Seed phrase (with various sizes)
							</Text>
						</Box>
					</Box>
					<Box component="li">
						<Box display="inline-flex">
							<Text size="large" color="strong">
								Hardware ledger
							</Text>
						</Box>
					</Box>
					<Box component="li">
						<Box display="inline-flex">
							<Text size="large" color="strong">
								Direct input of the extended private key BIP32
							</Text>
						</Box>
					</Box>
				</Box>
			</Box>
		),
	},
	{
		question: 'hat happens to my Olympia wallets after I update the extension?',
		answer: (
			<Box>
				<Text size="large" color="strong">
					After I update the extension? After updating the extension, all your existing wallets will seamlessly function
					with the Radix Babylon network version. If you&apos;ve uninstalled the extension, you can recover your legacy
					accounts by restoring the wallet and re-adding accounts through the new accounts dialog. This dialog allows
					you to choose between creating new Babylon or legacy (Olympia) version accounts.
				</Text>
			</Box>
		),
	},
	{
		question: "My Olympia wallet didn't have a password, but the Babylon wallet ",
		answer: (
			<Box>
				<Text size="large" color="strong">
					Simply submit the form with an empty input when signing a transaction or accepting a challenge.
				</Text>
			</Box>
		),
	},
	{
		question: 'My Olympia Ledger wallet was disappeared',
		answer: (
			<Box>
				<Text size="large" color="strong">
					Babylon network uses different Ledger app than Olympia, we thought its best for users to reconnect ledger
					devices manually since it requires user action. You can restore you Olympia accounts as stated above.
				</Text>
			</Box>
		),
	},
	{
		question: 'How do I interact with dApps?',
		answer: (
			<Box>
				<Text size="large" color="strong">
					Z3US works with the Radix Connect Button just like the Radix Mobile wallet, with no additional steps or
					integrations required.
				</Text>
			</Box>
		),
	},
	{
		question: 'Do I need a connector extension?',
		answer: (
			<Box>
				<Text size="large" color="strong">
					No, Z3US includes an embedded connector extension, allowing you to use your Radix Mobile wallet without
					requiring a separate connector extension. However, if you still wish to use the Connector Extension
					separately, you can disable it in the Z3US settings.
				</Text>
			</Box>
		),
	},
	{
		question: 'Can I connect multiple Radix wallets from mobile phones to Z3US?',
		answer: (
			<Box>
				<Text size="large" color="strong">
					Yes, each Radix Mobile-based wallet is treated the same way as other wallet types within Z3US. You can toggle
					between them (without affecting the connect button state on dApps), which changes the connection password
					behind the scenes. This allows you to seamlessly switch between peer-to-peer connections with your mobile
					devices.
				</Text>
			</Box>
		),
	},
	{
		question: 'Do I have to connect Radix Mobile?',
		answer: (
			<Box>
				<Text size="large" color="strong">
					No, it&apos;s not mandatory. The Radix Mobile wallet option is a feature for users who want to store their
					keys on their mobile devices while still benefiting from Z3US features.
				</Text>
			</Box>
		),
	},
	{
		question: 'Connect button does not work, what do I do ?',
		answer: (
			<Box>
				<Text size="large" color="strong">
					For security reason Z3US extension does not request `All websites` permission, therefore provider API is
					injected only to approved dApps by default (similar like it was before in Olympia version). If your connect
					button does not detect extension you probably have not injected Provider API, you can do it by right click on
					the website Z3US &gt; Enable Connect Button or right click on extension icon &gt; Enable Connect Button. This
					will step will be required on every tab for non approved dApps and after each website refresh. Once enabled
					connect button should detect extension automatically.
				</Text>
			</Box>
		),
	},
	{
		question: 'Can I use both Connector extension and Z3US at the same time ?',
		answer: (
			<Box>
				<Text size="large" color="strong">
					No, if you wish to use Connector Extension you should disable Z3US connector extension features in the
					settings. Having both enabled at the same time will result in a race condition for Connect Button
					interactions.
				</Text>
			</Box>
		),
	},
	{
		question: 'How can I create single login point for multiple seed and/or ledger wallets ?',
		answer: (
			<Box>
				<Text size="large" color="strong">
					In order to create single login point for multiple wallets, create your first wallet by simply following
					restore flow, then repeat the process to add more wallets and combine then into a single login point.
				</Text>
			</Box>
		),
	},
]

export const FaqPage: React.FC = () => (
	<Box className={clsx(styles.faqPageWrapper)}>
		<Header />
		<Box className={styles.faqPageBodyWrapper}>
			<ContentContainer>
				<Box className={styles.faqFlexWrapper}>
					<Box className={styles.faqHeaderWrapper}>
						<Box width="full">
							<Box paddingBottom="large">
								<Text size="xxxlarge" color="strong" weight="strong">
									Frequently asked questions
								</Text>
							</Box>
							<AccordionRoot type="single" collapsible>
								{FAQ_ITEMS.map(({ question, answer }, idx) => (
									// eslint-disable-next-line react/no-array-index-key
									<AccordionItem key={idx} value={`${idx}`}>
										<AccordionHeader className={styles.faqAccordionHeader}>
											<AccordionTrigger className={styles.faqAccordionTrigger}>
												{question}
												<Box className={styles.faqAccordionArrowRight}>
													<ArrowRightIcon />
												</Box>
											</AccordionTrigger>
										</AccordionHeader>
										<AccordionContent className={styles.faqAccordionContentWrapper}>
											<Box className={styles.faqAccordionContentInnerWrapper}>{answer}</Box>
										</AccordionContent>
									</AccordionItem>
								))}
							</AccordionRoot>
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
