<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import type { PropType } from 'vue'
import { type Filter } from '../types/Filter.type'
import { type Merchant } from '../types/Merchant.type'

const DnaButton = defineAsyncComponent(() => import('@/components/DnaButton.vue'))
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

const handleFilterUpdate = (searchValue: string | Object, searchParam: string) => {
  filter.value[searchParam] = searchValue
}

const showClearButton = computed(() => {
  return !!filter.value?.merchant || !!filter.value?.from || !!filter.value?.to
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
      :modelValue="filter?.merchant"
      :options="merchants"
      label="Merchant"
      @update:modelValue="handleFilterUpdate($event, 'merchant')"
    />

    <DnaDateInput
      :modelValue="filter?.from"
      label="From"
      @update:modelValue="handleFilterUpdate($event as String, 'from')"
    />
    <DnaDateInput
      :modelValue="filter?.to"
      label="To"
      @update:modelValue="handleFilterUpdate($event as String, 'to')"
    />

    <DnaButton v-if="showClearButton" @click="clear">Clear </DnaButton>
  </div>
</template>
