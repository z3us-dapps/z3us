import React from 'react'
import { Box, Text, StyledLink } from 'ui/src/components/atoms'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Docs } from 'types'

export const SideMenu: React.FC<Docs> = ({ docs }) => {
	const { pathname, query } = useRouter()
	const sortedDocs = docs
		.filter(doc => !doc.frontMatter.hideFromMenu)
		.sort((a, b) => a.frontMatter.order - b.frontMatter.order)

	return (
		<Box>
			<Box
				as="ul"
				css={{
					display: 'none',
					pt: '$8',
					position: 'sticky',
					top: '81px',
					maxWidth: '240px',
					width: '100%',
					li: {
						a: {
							position: 'relative',
							transition: '$default',
							br: '12px',
							paddingLeft: '24px',
							display: 'flex',
							alignItems: 'center',
							height: '58px',
							'&:hover': {
								backgroundColor: '$bgPanelHover',
							},
						},
					},
				}}
			>
				{sortedDocs.map(doc => (
					<Box as="li" key={doc.slug}>
						<Link href={doc.slug === 'introduction' ? '/docs' : `/docs/${doc.slug}`} passHref>
							<StyledLink
								css={{
									backgroundColor:
										(doc.slug === 'introduction' && pathname === '/docs') || doc.slug === query.slug
											? '$bgPanelHover'
											: 'transparent',
								}}
							>
								<Text displayRound size="5">
									{doc.frontMatter.title}
								</Text>
							</StyledLink>
						</Link>
					</Box>
				))}
			</Box>
		</Box>
	)
}
