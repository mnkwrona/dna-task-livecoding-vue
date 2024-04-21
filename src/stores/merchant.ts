import { defineStore } from "pinia"
import { computed, ref } from 'vue'
import { useFetch } from '@vueuse/core'
import { type Merchant } from '../types/Merchant.type'

export const useMerchantStore = defineStore("merchant", () => {
  const apiUrl = `${import.meta.env.VITE_API_URL}/merchants`

 //state
  const merchants = ref<Merchant[]>([])
  const loadingMerchants = ref<Boolean>(true)
  const merchantsFetchFailed = ref<Boolean>(false)

  //actions
  const fetchMerchants = async () => {
    if (merchants.value?.length) {
      return
    }

    const { isFetching, error, data } = await useFetch(apiUrl).get().json()

    merchants.value = data.value as Merchant[]
    loadingMerchants.value = !!isFetching.value
    merchantsFetchFailed.value = !!error.value
  }

  //getters
  const merchantsNumber = computed(() => {
    return merchants.value?.length
  })

  return {
    fetchMerchants,
    merchants,
    loadingMerchants,
    merchantsFetchFailed,
    merchantsNumber
  }
})
