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
import { Link, Text } from 'ui/src/components/typography'

import * as styles from './styles.css'

const FAQ_ITEMS = {
	QUESTION_ONE: {
		question: 'The first question',
		answer: (
			<Box>
				<Text size="large" color="strong">
					hello accounts, send and receive tokens, manage multiple wallets and connect to DApps from Z3US, the premier
					browser wallet for{' '}
					<Link size="large" color="strong" href="https://www.radixdlt.com/">
						Radix DLT
					</Link>
					.
				</Text>
			</Box>
		),
	},
	QUESTION_TWO: {
		question: 'The second question',
		answer: (
			<Box>
				<Text size="large" color="strong">
					hello accounts, send and receive tokens, manage multiple wallets and connect to DApps from Z3US, the premier
					browser wallet for{' '}
					<Link size="large" color="strong" href="https://www.radixdlt.com/">
						Radix DLT
					</Link>
					.
				</Text>
			</Box>
		),
	},
}

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
								{Object.entries(FAQ_ITEMS).map(([key, { question, answer }]) => (
									<AccordionItem key={key} value={key}>
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
