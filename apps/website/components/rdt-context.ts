/* eslint-disable */
import { type Rdt } from "./types";
import React from "react";
import { createContext } from "react";

export const RdtContext: any = createContext<Rdt | null>(null);
