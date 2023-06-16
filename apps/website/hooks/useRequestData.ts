/* eslint-disable */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useRdt } from "./useRdt";
import { type DataRequestInput } from "@radixdlt/radix-dapp-toolkit";
import { useCallback } from "react";

export const useRequestData = () => {
	const rdt = useRdt()!;

	return useCallback(
		(value: DataRequestInput) => rdt.requestData(value),
		[rdt]
	);
};
