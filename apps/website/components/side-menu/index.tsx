import React from 'react'
import { Box, Text, StyledLink } from 'ui/src/components/atoms'
import Link from 'next/link'

interface IProps {
	docs: any
}

export const SideMenu: React.FC<IProps> = ({ docs }) => (
	<Box>
		<Box css={{ pt: '$8', position: 'sticky', top: '81px' }}>
			<Link href="/docs" passHref>
				<StyledLink underlineOnHover css={{ mb: '$3', display: 'block' }}>
					<Text size="5">Introduction</Text>
				</StyledLink>
			</Link>
			{docs
				.filter(doc => doc.slug !== 'introduction')
				.map(doc => (
					<Link href={`/docs/${doc.slug}`} passHref key={doc.slug}>
						<StyledLink underlineOnHover css={{ mb: '$3', display: 'block' }}>
							<Text size="5">{doc.frontMatter.title}</Text>
							{/*<Image
src={post.frontMatter.thumbnailUrl}
className="img-fluid mt-1 rounded-start"
alt="thumbnail"
width={50}
height={40}
objectFit="cover"
						/>*/}
						</StyledLink>
					</Link>
				))}
		</Box>
	</Box>
)
