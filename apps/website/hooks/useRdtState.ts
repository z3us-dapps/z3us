/* eslint-disable */
import { useRdt } from "./useRdt";
import { State } from "@radixdlt/radix-dapp-toolkit";
import { useEffect, useState } from "react";

export const useRdtState = () => {
	const rdt = useRdt();
	const [state, setState] = useState<State>();

	useEffect(() => {
		const subscription = rdt?.state$.subscribe((state) => {
			setState(state);
		});

		return () => {
			subscription?.unsubscribe();
		};
	});

	return state;
};
