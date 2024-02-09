<script setup lang="ts">
import { ref, computed } from 'vue';
import { type Transaction } from '../types/Transaction.type';
import { type Merchant } from '../types/Merchant.type';
const transactions = ref<Transaction[]>([]);
fetch('http://localhost:8000/transactions')
  .then(response => response.json())
  .then(data => transactions.value = data)

const merchants = ref<Merchant[]>([]);

fetch('http://localhost:8000/merchants')
  .then(response => response.json())
  .then(data => merchants.value = data)

const transactionsSum = computed(() => {
  return transactions.value.reduce((sum, current) => sum + current.amount, 0).toFixed(2);
})
</script>

<template>
  <main>
    <div>
      <span>{{ transactionsSum }}$</span> Profit
    </div>
    <div>
      <span>{{ transactions.length }}</span> Transactions
    </div>
    <div>
      <span>{{ merchants.length }}</span> Merchants
    </div>
  </main>
</template>

<style lang="scss" scoped>
  main {
    display: flex;
    padding: 4rem 2rem;

    div {
      display: flex;
      flex-grow: 1;
      height: 100px;
      align-items: center;
      justify-content: space-evenly;
      border: 1px solid var(--color-border);
      border-radius: 5px;

      span {
        font-size: 24px;
        color: hsl(160, 100%, 37%);
      }
    }

    div + div {
      margin-left: 2%;
    }
  }
</style>
