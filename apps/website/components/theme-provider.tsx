"use client";

import { fontSans } from "@/lib/fonts";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import * as React from "react";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	return (
		<NextThemesProvider {...props}>
			<style jsx global>{`
				:root {
					--font-inter: ${fontSans.style.fontFamily};
				}
			`}</style>

			{children}
		</NextThemesProvider>
	);
}
