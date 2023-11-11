import { ContentContainer } from '@/components/content-container'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Mdx } from '@/components/mdx-components'
import React from 'react'

import { Box } from 'ui/src/components/box'

import * as styles from './styles.css'

export const TextPage = ({ mdxCode }: { mdxCode: any }) => (
	<Box>
		<Header />
		<ContentContainer>
			<Box className={styles.textPageContentWrapper}>
				<Mdx code={mdxCode} />
			</Box>
		</ContentContainer>
		<Box className={styles.textPageFooterWrapper}>
			<Footer textColor="strong" buttonStyleVariant="ghost" />
		</Box>
	</Box>
)
