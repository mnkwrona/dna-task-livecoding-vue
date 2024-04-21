import { defineStore } from "pinia"
import { computed, ref } from 'vue'
import { useFetch } from '@vueuse/core'
import { type Transaction } from '../types/Transaction.type'

export const useTransactionStore = defineStore("transaction", () => {
  const apiUrl = `${import.meta.env.VITE_API_URL}/transactions`

  //state
  const transactions = ref<Transaction[]>([])
  const loadingTransactions = ref<Boolean>(true)
  const transactionsFetchFailed = ref<Boolean>(false)

  //actions
  const fetchTransactions = async () => {
    const { isFetching, error, data } = await useFetch(apiUrl).get().json()

    transactions.value = data.value as Transaction[]
    loadingTransactions.value = !!isFetching
    transactionsFetchFailed.value = !!error
  }

  //getters
  const transactionsNumber = computed(() => {
    return transactions.value?.length
  })

  const transactionsSum = computed(() => {
    let sum = 0
    if (transactionsNumber.value) {
      sum = +transactions.value.reduce((sum, current) => sum + current.amount, 0).toFixed(2) || 0
    }

    return sum
  })

  return {
    fetchTransactions,
    loadingTransactions,
    transactions,
    transactionsNumber,
    transactionsSum,
    transactionsFetchFailed,
  }
})
