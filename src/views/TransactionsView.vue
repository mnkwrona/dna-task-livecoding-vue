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

const router = useRouter()

const transactionStore = useTransactionStore()
const { filteredTransactions, transactions, transactionsFilter } = storeToRefs(transactionStore)
const { fetchTransactions } = transactionStore

const merchantStore = useMerchantStore()
const { fetchMerchants } = merchantStore
const { merchants } = storeToRefs(merchantStore)

const headers = computed(() => {
  return Object.keys(transactions.value[0])
})

const dateFormatted = (date: Date) => {
  return useDateFormat(date, 'YYYY-MM-DD HH:mm:ss')
}

const valueFormatted = (item: Transaction, key: string) => {
  return key === 'date' ? dateFormatted(item[key]).value : item[key]
}

const handleFiltersChanged = (event: Filter) => {
  transactionsFilter.value = event
}

const rowClickHandler = (transactionId: string) => {
  return router.push(`/transactions/${transactionId}`)
}

fetchTransactions()
fetchMerchants()
</script>

<template>
  <div class="transactions-view flex flex-col align-start">
    <DnaFilters :merchants="merchants" @filterChange="handleFiltersChanged" />

    <div v-if="filteredTransactions.length" class="results">
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
  </div>
</template>
