/* eslint-disable */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import { RdtProvider } from "@/components/RdtProvider";
import LogoTest from "@/components/logo-test";
import { useAccounts } from "@/hooks/useAccounts";
import { useConnected } from "@/hooks/useConnected";
import { usePersona } from "@/hooks/usePersona";
import { useRequestData } from "@/hooks/useRequestData";
import { useSendTransaction } from "@/hooks/useSendTransaction";
import * as styles from "@/styles/page.css";
import { RadixDappToolkit } from "@radixdlt/radix-dapp-toolkit";
import { useTheme } from "next-themes";
import Head from "next/head";
import NextLink from "next/link";
import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";

// import { Box } from "ui/src/components-v2/box";
// import {
// 	darkThemeClass,
// 	lightThemeClass,
// } from "ui/src/components-v2/system/theme.css";

declare global {
	namespace JSX {
		interface IntrinsicElements {
			"radix-connect-button": React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLElement>,
				HTMLElement
			>;
		}
	}
}

export default function App() {
	const test = true;
	const { setTheme } = useTheme();

	const accounts = useAccounts();
	const persona = usePersona();
	const requestData = useRequestData();
	const sendTransaction = useSendTransaction();
	const connected = useConnected();

	return (
		<>
			<Head>
				<title>
					iPhone 12 XS Max For Sale in Colorado - Big Discounts | Apple
				</title>
				<meta
					name="description"
					content="Check out iPhone 12 XR Pro and iPhone 12 Pro Max. Visit your local store and for expert advice."
					key="desc"
				/>
				<meta
					property="og:description"
					content="And a social description for our cool page"
				/>
				<meta
					property="og:image"
					content="https://example.com/images/cool-page.jpg"
				/>
			</Head>

			{/* <main className={darkThemeClass}> */}
			<main>
				<div className={styles.page}>
					<Router>
						<div>
							<RdtProvider
								value={RadixDappToolkit(
									{
										dAppName: "zgod",
										dAppDefinitionAddress:
											"account_tdx_c_1pxdceeqqfh9m4mt45cc0tqntyc5n87y4ze02p002yweq2y94zg",
									},
									(requestData) => {
										requestData({
											accounts: { quantifier: "atLeast", quantity: 1 },
										});
									},
									{
										networkId: 12,
									}
								)}
							>
								<div>
									<div className={styles.radixButtonWrapper}>
										<radix-connect-button className="test-class-rdx-btn"></radix-connect-button>
									</div>
								</div>
								<ul>
									<li>
										<Link to="/">Home</Link>
									</li>
									<li>
										<Link to="/about">About</Link>
									</li>
									<li>
										<Link to="/topics">Topics</Link>
									</li>
									<li>
										<NextLink href="/settings">Settings (SSR)</NextLink>
									</li>
									<li>
										<NextLink href="/terms">Terms (SSR)</NextLink>
									</li>
								</ul>
								<div>
									<LogoTest />
								</div>

								<div
									style={{
										paddingTop: "30px",
										paddingBottom: "30px",
										display: "flex",
										flexDirection: "column",
										gap: "15px",
									}}
								>
									<h2 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
										Theme
									</h2>
									<Button onClick={() => setTheme("light")}>Theme light</Button>
									<Button onClick={() => setTheme("dark")}>Theme dark</Button>
									<Button onClick={() => setTheme("system")}>
										Theme system
									</Button>
								</div>

								<div>
									<p>
										<pre>hello</pre>
										<div>hello</div>
									</p>
								</div>

								<Routes>
									<Route path="/about" element={<h1>About</h1>} />
									<Route path="/topics" element={<h1>Topics</h1>} />
									<Route path="/" element={<h1>Home</h1>} />
								</Routes>
							</RdtProvider>
						</div>
					</Router>
				</div>
			</main>
		</>
	);
}
