import type { VueNode } from '@yanyu-fe/pro-utils'
import type { ExtractPropTypes, PropType } from 'vue'
import VueTypes from 'vue-types'
import type { ProFieldFCMode, ProFieldRender, ProFieldRenderFormItem, ProFieldTextType } from './typing'

export const baseProFieldFC = {
  /** 值的类型 */
  'text': {
    type: [String, Number, Boolean, Symbol, Object, Array] as PropType<ProFieldTextType>,
    default: undefined,
  },
  /** 放置到组件上 props */
  'fieldProps': VueTypes.any,
  /** 模式类型 */
  'mode': {
    type: String as PropType<ProFieldFCMode>,
    default: 'read',
  },
  /** 简约模式 */
  'plain': {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
  /** 轻量模式 */
  'light': {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
  /** Label */
  'label': {
    type: [String, Number, Boolean, Object] as PropType<VueNode>,
    default: undefined,
  },
  /** 映射值的类型 */
  'valueEnum': {
    type: Object as PropType<any>,
    default: undefined,
  },
  /** 唯一的key，用于网络请求 */
  'proFieldKey': VueTypes.any,
  'modelValue': {
    type: Number as PropType<number>,
    default: undefined,
  },
  'onUpdateModelValue': {
    type: Function as PropType<(value: any) => any>,
    default: undefined,
  },
  'onUpdate:modelValue': {
    type: Function as PropType<(value: any) => any>,
    default: undefined,
  },
}

export type BaseProFieldFC = Partial<ExtractPropTypes<typeof baseProFieldFC>>

export const proRenderFieldPropsType = {
  renderFormItem: {
    type: Function as PropType<ProFieldRenderFormItem>,
    default: undefined,
  },
  render: {
    type: Function as PropType<ProFieldRender>,
    default: undefined,
  },
}

export type ProRenderFieldPropsType = Partial<ExtractPropTypes<typeof proRenderFieldPropsType>>

export const proFieldFCRenderProps = {
  ...baseProFieldFC,
  readonly: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
  placeholder: {
    type: [String, Array] as PropType<string | string[]>,
    default: undefined,
  },
  value: VueTypes.any,
  onChange: {
    type: Function as PropType<(...rest: any) => any>,
    default: undefined,
  },
}

export type ProFieldFCRenderProps = Partial<ExtractPropTypes<typeof proFieldFCRenderProps>>

export const proFieldFC = {
  ...baseProFieldFC,
  ...proRenderFieldPropsType,
}

export type ProFieldFC = Partial<ExtractPropTypes<typeof proFieldFC>>
