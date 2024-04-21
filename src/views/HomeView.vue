<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useMerchantStore } from '@/stores/merchant'
import { useTransactionStore } from '@/stores/transaction'

const DashboardBox = defineAsyncComponent(() => import('@/components/DashboardBox.vue'))

const transactionStore = useTransactionStore()
const merchantStore = useMerchantStore()

const { fetchTransactions } = transactionStore
const { fetchMerchants } = merchantStore

const {
  loadingTransactions,
  transactions,
  transactionsNumber,
  transactionsSum,
  transactionsFetchFailed
} = storeToRefs(transactionStore)

const { merchantsNumber } = storeToRefs(merchantStore)

fetchTransactions()
fetchMerchants()
</script>

<template>
  <div class="home-view flex justify-between">
    <DashboardBox :number="transactionsSum" currency-sign="$" label="Profit" />
    <DashboardBox :number="transactionsNumber" label="Transactions" />
    <DashboardBox :number="merchantsNumber" label="Merchants" />
  </div>
</template>
