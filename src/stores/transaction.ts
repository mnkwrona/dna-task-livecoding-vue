import { defineStore } from "pinia"
import { computed, ref } from 'vue'
import { useFetch } from '@vueuse/core'
import {  useRouter } from 'vue-router'
import { type Filter } from '../types/Filter.type'
import { type Transaction } from '../types/Transaction.type'

export const useTransactionStore = defineStore("transaction", () => {
  const router = useRouter()
  const apiUrl = `${import.meta.env.VITE_API_URL}/transactions`

  //state
  const transactions = ref<Transaction[]>([])
  const loadingTransactions = ref<Boolean>(true)
  const transactionsFetchFailed = ref<Boolean>(false)
  const transactionsFilter = ref<Filter>({})

  //actions
  const setTransactionsFilter = (filter: Filter) => {
    transactionsFilter.value = filter
    const query = {
      merchantId: filter.merchant?.id,
      merchantName: filter.merchant?.name,
      from: filter.from,
      to: filter.to,
    }

    router.push({ query: query })
  }

  const fetchTransactions = async () => {
    if (transactions.value?.length) {
      return
    }

    const { isFetching, error, data } = await useFetch(apiUrl).get().json()

    transactions.value = data.value as Transaction[]
    loadingTransactions.value = !!isFetching.value
    transactionsFetchFailed.value = !!error.value
  }

  //getters
  const filteredTransactions = computed(() => {
    let result = [...transactions.value]

    if (transactionsFilter.value?.merchant) {
      result = result.filter(transaction => {
        return transaction.merchantId === transactionsFilter.value?.merchant.id
      })
    }

    if (transactionsFilter.value?.from) {
      result = result.filter(transaction => {
        return new Date(transaction.date).setHours(0,0,0,0) >= new Date(transactionsFilter.value?.from)
      })
    }

    if (transactionsFilter.value?.to) {
      result = result.filter(transaction => {
        return new Date(transaction.date).setHours(0,0,0,0) <= new Date(transactionsFilter.value?.to)
      })
    }

    return result
    })

  const transactionsNumber = computed(() => {
    return transactions.value?.length
  })

  const filteredTransactionsNumber = computed(() => {
    return filteredTransactions.value?.length
  })

  const transactionsSum = computed(() => {
    let sum = 0
    if (transactionsNumber.value) {
      sum = +transactions.value.reduce((sum, current) => sum + current.amount, 0).toFixed(2) || 0
    }

    return sum
  })

  const filteredTransactionsSum = computed(() => {
    let sum = 0
    if (filteredTransactions.value) {
      sum = +filteredTransactions.value.reduce((sum, current) => sum + current.amount, 0).toFixed(2) || 0
    }

    return sum
  })

  const getTransactionById = (transactionId: string) => {
    return transactions.value.find(transaction => {
      return transaction.id === transactionId
    })
  }

  return {
    fetchTransactions,
    filteredTransactions,
    filteredTransactionsNumber,
    filteredTransactionsSum,
    getTransactionById,
    loadingTransactions,
    transactions,
    transactionsFilter,
    transactionsNumber,
    transactionsSum,
    transactionsFetchFailed,
    setTransactionsFilter
  }
})
