<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import type { PropType } from 'vue'
import { type Filter } from '../types/Filter.type'
import { type Merchant } from '../types/Merchant.type'

const DnaSelect = defineAsyncComponent(() => import('@/components/DnaSelect.vue'))
const DnaDateInput = defineAsyncComponent(() => import('@/components/DnaDateInput.vue'))

const props = defineProps({
  merchants: {
    type: Array as PropType<Merchant[]>,
    required: false
  },
  filtersValue: {
    type: Object as PropType<Filter>,
    required: false
  }
})

const filter = computed({
  get() {
    return props.filtersValue
  },

  set(newValue) {
    emits('filterChange', newValue as Filter)
  }
})

const emits = defineEmits<{
  (e: 'filterChange', filter: Filter): void
}>()

const handleFilterUpdate = (searchValue: string | Date, searchParam: string) => {
  filter.value[searchParam] = searchValue
}

const showClearButton = computed(() => {
  return !!filter.value.merchant || !!filter.value.from || !!filter.value.to
})

const clear = () => {
  filter.value.merchant = undefined
  filter.value.from = undefined
  filter.value.to = undefined
}
</script>

<template>
  <div class="dna-filters flex flex-col items-end md:flex-row">
    <DnaSelect
      v-if="merchants"
      :modelValue="filter.merchant"
      :options="merchants"
      label="Merchant"
      @update:modelValue="handleFilterUpdate($event as Merchant, 'merchant')"
    />

    <DnaDateInput
      :modelValue="filter.from"
      label="From"
      @update:modelValue="handleFilterUpdate($event as Date, 'from')"
    />
    <DnaDateInput
      :modelValue="filter.to"
      label="To"
      @update:modelValue="handleFilterUpdate($event as Date, 'to')"
    />

    <button
      v-if="showClearButton"
      @click="clear"
      class="bg-[#00bd7e] opacity-80 hover:opacity-100 text-white h-fit px-4 py-2 rounded-md transition ease-in-out duration-300"
    >
      <span> Clear </span>
    </button>
  </div>
</template>
