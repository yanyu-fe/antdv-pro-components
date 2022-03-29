import type { SearchTransformKeyFn } from '@yanyu-fe/pro-utils'
import type { formItemProps } from 'ant-design-vue/lib/form/FormItem'
import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import type { NamePath } from 'ant-design-vue/lib/form/interface'
export type FormItemProps = ExtractPropTypes<typeof formItemProps>

export type ProRequestData<T, U = Record<string, any>> = (params: U, props: any) => Promise<T>

export type FieldValueTypeFun = (
  name: NamePath, obj:
  { valueType?: any; dateFormat?: string; transform?: SearchTransformKeyFn }
) => void

export interface FieldProps {
  style?: CSSProperties
  width?: string
}

export const groupProps = {
  title: {
    type: [Object, String, Number, Boolean] as PropType<any>,
  },
}

export type GroupProps = ExtractPropTypes<typeof groupProps>
