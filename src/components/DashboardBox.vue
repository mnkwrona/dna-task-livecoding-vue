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
  <div class="dashboard-box">
    <span>{{ numberCopy }}</span> {{ label }}
  </div>
</template>

<style scoped>
.dashboard-box {
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
</style>
