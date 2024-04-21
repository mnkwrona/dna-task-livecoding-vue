<script setup lang="ts">
import { computed } from 'vue'
import type { PropType } from 'vue'

const props = defineProps({
  number: {
    type: Number as PropType<number>,
    required: true
  },
  currencySign: {
    type: String as PropType<string>,
    required: false
  },
  label: {
    type: String as PropType<string>,
    required: true
  }
})

const numberCopy = computed(() => {
  return `${props.number}${props.currencySign || ''}`
})
</script>

<template>
  <div
    class="dna-dashboard-box flex grow h-[100px] items-center max-w-[300px] justify-evenly border-solid border-[1px] border-[var(--color-border)] rounded-lg"
  >
    <span class="text-[24px] text-[var(--color-accent)]">{{ numberCopy }}</span> {{ label }}
  </div>
</template>
