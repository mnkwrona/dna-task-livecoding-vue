<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useTransactionStore } from '@/stores/transaction'

const transactionStore = useTransactionStore()

const { fetchTransactions, getTransactionById } = transactionStore

const route = useRoute()

const transactionId = ref(route.params.id)

const transactionDetails = computed(() => {
  return getTransactionById(transactionId.value as string)
})

fetchTransactions()
</script>

<template>
  <div class="transaction-details-view">
    <div v-if="transactionDetails">
      <p v-for="prop in Object.keys(transactionDetails)" :key="transactionDetails[prop]">
        <span>{{ prop }}:</span>
        {{ transactionDetails[prop] }}
      </p>
    </div>
  </div>
</template>
