<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useTransactionStore } from '@/stores/transaction'
import { ArrowLongLeftIcon } from '@heroicons/vue/20/solid'

const transactionStore = useTransactionStore()

const { fetchTransactions, getTransactionById } = transactionStore
const { loadingTransactions } = storeToRefs(transactionStore)

const route = useRoute()

const transactionId = ref(route.params.id)

const transactionDetails = computed(() => {
  return getTransactionById(transactionId.value as string)
})

fetchTransactions()
</script>

<template>
  <div class="transaction-details-view flex flex-col gap-8">
    <div class="flex flex-col gap-4">
      <RouterLink to="/transactions" class="w-fit rounded-md hover:bg-white">
        <div class="flex flex-row w-fit">
          <ArrowLongLeftIcon class="mr-3 h-5 w-5" aria-hidden="true" />
          <span> Transactions </span>
        </div>
      </RouterLink>
    </div>

    <div v-if="transactionDetails">
      <p v-for="prop in Object.keys(transactionDetails)" :key="transactionDetails[prop]">
        <span>{{ prop }}:</span>
        {{ transactionDetails[prop] }}
      </p>
    </div>

    <div v-else-if="loadingTransactions">
      <span> Fetching transaction details... </span>
    </div>

    <div v-else>
      <span> There was a problem when fetching transaction details. </span>
    </div>
  </div>
</template>
