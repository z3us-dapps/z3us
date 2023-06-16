/* eslint-disable */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useRdt } from "./useRdt";
import { useCallback } from "react";

export const useSendTransaction = () => {
	const rdt = useRdt()!;

	return useCallback(
		(transactionManifest: string) => {
			return rdt.sendTransaction({ transactionManifest, version: 1 });
		},
		[rdt]
	);
};
