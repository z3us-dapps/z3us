/* eslint-disable */
import { Mdx } from "@/components/mdx-components";
import { allDocs } from "contentlayer/generated";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import React from "react";

interface DocPageProps {
	params: {
		slug: string[];
	};
}

function getDocFromParams({ params }: DocPageProps) {
	const slug = params.slug?.join("/") || "";
	const doc = allDocs.find((doc) => doc.slugAsParams === slug);

	if (!doc) {
		null;
	}

	return doc;
}

export default function TermsPage(props: { message: string; doc: any }) {
	return (
		<div>
			<h1>terms</h1>
			<p>{props.message}</p>
			<NextLink href="/">Home</NextLink>
			<Mdx code={props.doc.body.code} />
		</div>
	);
}

export const getStaticProps = () => {
	const doc = getDocFromParams({ params: { slug: ["terms"] } });

	return {
		props: {
			message: "TERMS This page is rendered on the server!",
			doc,
		},
	};
};
