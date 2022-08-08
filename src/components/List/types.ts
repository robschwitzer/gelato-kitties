import type { CryptoKitty } from "../../../types";

export interface QueryData {
  offset: number;
  limit: number;
  greatValues: CryptoKitty[];
}