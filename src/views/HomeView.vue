<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'

const DashboardBox = defineAsyncComponent(() => import('@/components/DashboardBox.vue'))

import { type Transaction } from '../types/Transaction.type'
import { type Merchant } from '../types/Merchant.type'

const transactions = ref<Transaction[]>([])
const transactionsSum = ref<Number>(0)
fetch('http://localhost:8000/transactions')
  .then((response) => response.json())
  .then((data) => {
    transactions.value = data
    transactionsSum.value =
      +transactions.value.reduce((sum, current) => sum + current.amount, 0).toFixed(2) || 0
  })

const merchants = ref<Merchant[]>([])
fetch('http://localhost:8000/merchants')
  .then((response) => response.json())
  .then((data) => (merchants.value = data))
</script>

<template>
  <main>
    <DashboardBox :number="transactionsSum.valueOf()" currency-sign="$" label="Profit" />
    <DashboardBox :number="transactions.length" label="Transactions" />
    <DashboardBox :number="merchants.length" label="Merchants" />
  </main>
</template>

<style lang="scss" scoped>
main {
  display: flex;
  padding: 4rem 2rem;
}
</style>
