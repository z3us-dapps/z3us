import { type Rdt } from "./types";
import { RdtContext } from "@/components/rdt-context";

export const RdtProvider = (
	input: React.PropsWithChildren<{
		value: Rdt;
	}>
) => (
	<RdtContext.Provider value={input.value}>
		{input.children}
	</RdtContext.Provider>
);
