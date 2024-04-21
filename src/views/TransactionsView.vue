<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { useDateFormat } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { type Transaction } from '../src/types/Transaction.type'
import { useTransactionStore } from '@/stores/transaction'

const DnaTable = defineAsyncComponent(() => import('@/components/DnaTable.vue'))

const transactionStore = useTransactionStore()
const { transactions, transactionsNumber, transactionsSum, transactionsFetchFailed } =
  storeToRefs(transactionStore)

const { fetchTransactions } = transactionStore

const headers = computed(() => {
  return Object.keys(transactions.value[0])
})

const dateFormatted = (date: Date) => {
  return useDateFormat(date, 'YYYY-MM-DD HH:mm:ss')
}

const valueFormatted = (item: Transaction, key: string) => {
  return key === 'date' ? dateFormatted(item[key]).value : item[key]
}

// TODO remove
fetchTransactions()
</script>

<template>
  <div class="transactions-view flex flex-col align-start">
    <DnaTable v-if="transactionsNumber" :headers="headers" :items="transactions">
      <template #item="item">
        <td
          v-for="(paramKey, index) of Object.keys(item)"
          :key="index"
          class="whitespace-nowrap truncate text-ellipsis text-clip py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0"
        >
          {{ valueFormatted(item, paramKey) }}
        </td>
      </template>
    </DnaTable>
  </div>
</template>
