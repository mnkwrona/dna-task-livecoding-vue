<script setup lang="ts">
import { computed, ref } from 'vue'
import { defineAsyncComponent } from 'vue'

const DnaPagination = defineAsyncComponent(() => import('@/components/DnaPagination.vue'))

const props = defineProps<{
  items: object[]
  headers: string[]
}>()

const currentPage = ref(1)
const displayedItemsPerPage = ref(100)

const totalPages = Math.ceil(props.items?.length / displayedItemsPerPage.value)

const currentPageItems = computed(() => {
  let items = [{}]
  const startIndex = (currentPage.value - 1) * displayedItemsPerPage.value
  const endIndex = startIndex + displayedItemsPerPage.value

  if (props.items?.length) {
    items = props.items.slice(startIndex, endIndex)
  }

  return items
})

const handlePageChange = (newPage: number) => {
  currentPage.value = newPage
}
</script>

<template>
  <div class="dna-table -mx-4 sm:-mx-0">
    <table class="min-w-full divide-y divide-gray-300">
      <thead>
        <tr>
          <th
            v-for="(header, index) in headers"
            :key="index"
            scope="col"
            class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 bg-white">
        <tr v-for="(item, index) in currentPageItems" :key="index">
          <slot name="item" v-bind="item"></slot>
        </tr>
      </tbody>
    </table>

    <DnaPagination
      v-if="totalPages > 1"
      :current="currentPage"
      :total="totalPages"
      @@pageChanged="handlePageChange"
    />
  </div>
</template>
