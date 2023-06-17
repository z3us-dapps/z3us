/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { RdtContext } from "../components/rdt-context";
import { useContext } from "react";

export const useRdt = () => {
	const rdt = useContext(RdtContext);

	return rdt;
};