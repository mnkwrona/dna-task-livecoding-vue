import { type Merchant } from "./Merchant.type"

export type Filter = {
  merchant?: Merchant
  from?: string
  to?: string
}
