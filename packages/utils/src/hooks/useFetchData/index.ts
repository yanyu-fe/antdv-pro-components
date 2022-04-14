const testId = 0

export type ProRequestData<T, U extends Record<string, any>> = (params: U, props: any) => Promise<T>

function useFetchData<T, U extends Record<string, any> = Record<string, any>>(props: {
  proFieldKey?: string|number|symbol
  params?: U
  request?: ProRequestData<T, U>
}): [T|undefined] {
  return [undefined]
}
