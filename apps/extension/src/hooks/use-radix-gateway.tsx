
import { StateApi, StatusApi, TransactionApi, StreamApi } from "@radixdlt/babylon-gateway-api-sdk";

const stateApi = new StateApi();
const statusApi = new StatusApi();
const transactionApi = new TransactionApi();
const streamApi = new StreamApi();

export const useRadixStateApiApi = () => stateApi 
export const useRadixStatusApiApi = () => statusApi 
export const useRadixTransactionApi = () => transactionApi 
export const useRadixStreamApiApi = () => streamApi 