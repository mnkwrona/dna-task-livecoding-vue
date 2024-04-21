import { type Merchant } from "./Merchant.type"

export type Filter = {
  merchant?: Merchant
  from?: Date
  to?: Date
}
