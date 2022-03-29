import type { ExtractPropTypes, PropType, Ref } from 'vue'
import type { FieldProps, FieldValueTypeFun, FormItemProps } from './interface'

export const fieldContextProps = {
  formItemProps: {
    type: [Number, String, Boolean, Object] as PropType<Partial<FormItemProps>>,
    default: undefined,
  },
  fieldProps: {
    type: Object as PropType<FieldProps>,
    default: undefined,
  },
  groupProps: {
    type: Object as PropType<any>,
    default: undefined,
  },
  setFieldValueType: {
    type: Function as PropType<FieldValueTypeFun>,
    default: undefined,
  },
  formRef: {
    type: Object as PropType<Ref>,
    default: undefined,
  },
  formComponentType: {
    type: String as PropType<string>,
    default: undefined,
  },
  getPopupContainer: {
    type: Function as PropType<() => HTMLElement>,
    default: undefined,
  },
}

export type FieldContextProps = Partial<ExtractPropTypes<typeof fieldContextProps>>
