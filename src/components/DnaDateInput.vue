<script setup lang="ts">
import { computed } from 'vue'
import type { PropType } from 'vue'

const props = defineProps({
  modelValue: {
    type: String as PropType<string>,
    required: false
  },
  label: {
    type: String as PropType<string>,
    required: true
  }
})

const emit = defineEmits<{
  (e: 'update:modelValue', date: Date): void
}>()

const selected = computed({
  get() {
    return props.modelValue
  },
  set(newValue: Date) {
    emit('update:modelValue', newValue)
  }
})
</script>

<template>
  <div class="dna-date-input">
    <label :for="`${label}-date`" class="block text-sm font-medium leading-6 text-gray-900">
      {{ label }}
    </label>

    <input
      v-model="selected"
      :id="`${label}-date`"
      name="date"
      type="date"
      class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 pl-3 pr-1 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    />
  </div>
</template>
