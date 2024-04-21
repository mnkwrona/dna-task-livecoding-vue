<script setup lang="ts">
import { computed } from 'vue'
import type { PropType } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object as PropType<object>,
    required: false
  },
  options: {
    type: Array as PropType<object[]>,
    required: true
  },
  label: {
    type: String as PropType<string>,
    required: true
  }
})

const emit = defineEmits<{
  (e: 'update:modelValue', item: Object): void
}>()

const selected = computed({
  get() {
    return props.modelValue || {}
  },
  set(newValue: Object) {
    emit('update:modelValue', newValue)
  }
})

const isSelected = (item) => {
  return selected.value.id === item.id
}
</script>

<template>
  <div class="dna-select">
    <label :for="`${label}-select`" class="block text-sm font-medium leading-6 text-gray-900">
      {{ label }}
    </label>

    <select
      v-model="selected"
      :id="`${label}-select`"
      name="select"
      class="mt-2 block w-full rounded-md border-0 py-2.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
    >
      <option :selected="isSelected(item)" v-for="item in options" :key="item.id" :value="item">
        {{ item.name }}
      </option>
    </select>
  </div>
</template>
