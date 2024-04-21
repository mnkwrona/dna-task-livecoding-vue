<script setup lang="ts">
import { computed } from 'vue'
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/vue/20/solid'

const props = defineProps<{
  current: number
  total: number
}>()

const emits = defineEmits<{
  (e: '@pageChanged', value: number): void
}>()

const linkClasses = (page: number) => {
  const isCurrent = page === props.current

  return isCurrent
    ? 'border-indigo-500 text-indigo-600'
    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
}

const firstPageDisplayed = computed(() => {
  return props.current === 1
})

const lastPageDisplayed = computed(() => {
  return props.current === props.total
})

const handleBackClick = () => {
  !firstPageDisplayed.value && emits('@pageChanged', props.current - 1)
}

const handleNextClick = () => {
  !lastPageDisplayed.value && emits('@pageChanged', props.current + 1)
}

const handlPageClick = (page: number) => {
  emits('@pageChanged', page)
}
</script>

<template>
  <nav class="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
    <div
      class="-mt-px flex w-0 flex-1"
      :class="firstPageDisplayed ? 'opacity-30 hover:cursor-default' : 'hover:cursor-pointer'"
    >
      <div
        href="#"
        class="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500"
        :class="!firstPageDisplayed && 'hover:border-gray-300 hover:text-gray-700'"
        @click="handleBackClick"
      >
        <ArrowLongLeftIcon class="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
        Previous
      </div>
    </div>

    <div class="hidden md:-mt-px md:flex">
      <a
        v-for="page in total"
        :key="page"
        href="#"
        class="inline-flex items-center border-t-2 px-2 pt-4 text-sm font-medium"
        :class="linkClasses(page)"
        @click="handlPageClick(page)"
      >
        {{ page }}
      </a>
    </div>

    <div
      class="-mt-px flex w-0 flex-1 justify-end"
      :class="lastPageDisplayed ? 'opacity-30 hover:cursor-default' : 'hover:cursor-pointer'"
    >
      <div
        class="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500"
        :class="!lastPageDisplayed && 'hover:border-gray-300 hover:text-gray-700'"
        @click="handleNextClick"
      >
        Next
        <ArrowLongRightIcon class="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
    </div>
  </nav>
</template>
