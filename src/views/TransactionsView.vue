<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue'
import { useDateFormat } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { type Filter } from '../types/Filter.type'
import { type Transaction } from '../types/Transaction.type'
import { useTransactionStore } from '@/stores/transaction'
import { useMerchantStore } from '@/stores/merchant'

const DnaFilters = defineAsyncComponent(() => import('@/components/DnaFilters.vue'))
const DnaTable = defineAsyncComponent(() => import('@/components/DnaTable.vue'))
const DashboardBox = defineAsyncComponent(() => import('@/components/DashboardBox.vue'))

const router = useRouter()

const transactionStore = useTransactionStore()
const {
  filteredTransactions,
  filteredTransactionsNumber,
  filteredTransactionsSum,
  loadingTransactions,
  transactions,
  transactionsFilter
} = storeToRefs(transactionStore)
const { fetchTransactions, setTransactionsFilter } = transactionStore

const merchantStore = useMerchantStore()
const { fetchMerchants } = merchantStore
const { merchants } = storeToRefs(merchantStore)

const headers = computed(() => {
  return Object.keys(transactions.value[0])
})

const dateFormatted = (date: String) => {
  return useDateFormat(date, 'YYYY-MM-DD HH:mm:ss')
}

const valueFormatted = (item: Transaction, key: string) => {
  return key === 'date' ? dateFormatted(item[key]).value : item[key]
}

const handleFiltersChanged = (event: Filter) => {
  setTransactionsFilter(event)
}

const rowClickHandler = (transactionId: string) => {
  return router.push(`/transactions/${transactionId}`)
}

fetchTransactions()
fetchMerchants()
</script>

<template>
  <div class="transactions-view flex flex-col gap-20">
    <DnaFilters
      :merchants="merchants"
      :filtersValue="transactionsFilter"
      class="justify-start gap-6"
      @filterChange="handleFiltersChanged"
    />

    <div
      v-if="transactionsFilter && filteredTransactionsNumber"
      class="results flex flex-col gap-10"
    >
      <div class="flex flex-row gap-10 justify-start w-full">
        <DashboardBox :number="filteredTransactionsSum" label="Profit" />
        <DashboardBox :number="filteredTransactionsNumber" label="Transactions" />
      </div>

      <DnaTable :headers="headers" :items="filteredTransactions" :handleRowClick="rowClickHandler">
        <template #item="item">
          <td
            v-for="(paramKey, index) of Object.keys(item)"
            :key="index"
            class="whitespace-nowrap truncate text-ellipsis text-clip py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0"
            @click="router.push('/')"
          >
            {{ valueFormatted(item, paramKey) }}
          </td>
        </template>
      </DnaTable>
    </div>

    <template v-else-if="loadingTransactions"><span> Fetching transactions... </span></template>

    <div v-else-if="transactionsFilter && !filteredTransactionsNumber" class="text-center w-full">
      <span> No transactions found. </span>
    </div>

    <div v-else class="text-center w-full">
      <span> There was a problem when fetching transactions. </span>
    </div>
  </div>
</template>
