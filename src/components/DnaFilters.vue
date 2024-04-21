<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import { storeToRefs } from 'pinia'
import type { PropType } from 'vue'
import { type Filter } from '../types/Filter.type'
import { type Merchant } from '../types/Merchant.type'

const DnaSelect = defineAsyncComponent(() => import('@/components/DnaSelect.vue'))
const DnaDateInput = defineAsyncComponent(() => import('@/components/DnaDateInput.vue'))

const merchant = ref<Merchant>()
const from = ref<Date>()
const to = ref<Date>()

defineProps({
  merchants: {
    type: Array as PropType<Merchant[]>,
    required: false
  }
})

const filter = ref<Filter>({
  merchant: merchant.value,
  from: from.value,
  to: to.value
})

const emits = defineEmits<{
  (e: 'filterChange', filter: Filter): void
}>()

const handleFilterUpdate = (searchValue: Merchant | Date, searchParam: string) => {
  filter.value[searchParam] = searchValue

  emits('filterChange', filter.value)
}

const handleSubmit = () => {
  // TODO emit
}
</script>

<template>
  <div class="dna-filters flex flex-col md:flex-row">
    <DnaSelect
      v-if="merchants"
      :modelValue="merchant"
      :options="merchants"
      label="Merchant"
      @update:modelValue="handleFilterUpdate($event as Merchant, 'merchant')"
    />

    <DnaDateInput
      :modelValue="from"
      label="From"
      @update:modelValue="handleFilterUpdate($event as Date, 'from')"
    />
    <DnaDateInput
      :modelValue="to"
      label="To"
      @update:modelValue="handleFilterUpdate($event as Date, 'to')"
    />
  </div>
</template>
