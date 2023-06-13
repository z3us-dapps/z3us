import { type Rdt } from "./types";
import { createContext } from "react";

export const RdtContext = createContext<Rdt | null>(null);
