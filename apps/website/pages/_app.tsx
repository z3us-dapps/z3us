// import { type Metadata } from "next";
// import { siteConfig } from "@/config/site";
import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/global-style.css";
import { type AppProps } from "next/app";
import { useEffect, useState } from "react";

function App({ Component, pageProps }: AppProps) {
	const [isServer, setIsServer] = useState(true);
	useEffect(() => {
		setIsServer(false);
	}, []);
	if (isServer) return null;

	return (
		<div suppressHydrationWarning>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
				{typeof window === "undefined" ? null : <Component {...pageProps} />}
			</ThemeProvider>
		</div>
	);
}
export default App;
