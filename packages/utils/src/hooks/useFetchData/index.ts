import type { Ref } from 'vue'
import { shallowRef } from 'vue'

let testId = 0

export type ProRequestData<T, U extends Record<string, any>> = (params: U, props: any) => Promise<T>

function useFetchData<T, U extends Record<string, any> = Record<string, any>>(props: {
  proFieldKey?: string|number|symbol
  params?: U
  request?: ProRequestData<T, U>
}): Ref<U> {
  const cacheKey = shallowRef()
  testId++
  if (props.proFieldKey)
    cacheKey.value = props.proFieldKey.toString()
  else
    cacheKey.value = testId.toString()

  const dataRef = shallowRef()

  const fetchData = async() => {
    return props.request?.(props.params as U, props)
  }

  // dataRef.value = useSWR(cacheKey.value, fetchData, {
  //   revalidateOnFocus: false,
  //   shouldRetryOnError: false,
  //   revalidateOnReconnect: false,
  // })
  //
  // return dataRef
  return dataRef
}

export default useFetchData
