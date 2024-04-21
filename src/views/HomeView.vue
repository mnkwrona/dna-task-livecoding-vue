<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useMerchantStore } from '@/stores/merchant'
import { useTransactionStore } from '@/stores/transaction'

const DnaDashboardBox = defineAsyncComponent(() => import('@/components/DnaDashboardBox.vue'))

const transactionStore = useTransactionStore()
const { fetchTransactions } = transactionStore
const { loadingTransactions, transactionsNumber, transactionsSum, transactionsFetchFailed } =
  storeToRefs(transactionStore)

const merchantStore = useMerchantStore()
const { fetchMerchants } = merchantStore
const { merchantsNumber } = storeToRefs(merchantStore)

fetchTransactions()
fetchMerchants()
</script>

<template>
  <div class="home-view flex justify-between">
    <template v-if="transactionsFetchFailed">
      <span> There was a problem when fetching transactions. </span>
    </template>

    <template v-else-if="loadingTransactions">
      <span> Fetching transactions... </span>
    </template>

    <template v-else>
      <DnaDashboardBox :number="transactionsSum" currency-sign="$" label="Profit" />
      <DnaDashboardBox :number="transactionsNumber" label="Transactions" />
      <DnaDashboardBox :number="merchantsNumber" label="Merchants" />
    </template>
  </div>
</template>
