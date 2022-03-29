import type { VueNode } from '@yanyu-fe/pro-utils'
import { omit } from 'lodash'
import { noteOnce } from 'rc-util/es/warning'
import type { App, ExtractPropTypes, Plugin, PropType } from 'vue'
import { defineComponent } from 'vue'
import type { ProFieldValueType } from './components/types'
import type { ProRenderFieldPropsType } from './props'
import { proFieldFCRenderProps, proRenderFieldPropsType } from './props'
import type { ProFieldRequestData, ProFieldTextType } from './typing'
import FieldText from './components/Text'
import FieldTextArea from './components/TextArea'
import FieldSwitch from './components/Switch'
import FieldStatus from './components/Status'
import FieldSecond from './components/Second'
import FieldRate from './components/Rate'

const REQUEST_VALUE_TYPE = ['select', 'radio', 'radioButton', 'checkbook']

const renderProps = Object.assign({
  request: {
    type: Function as PropType<ProFieldRequestData>,
    default: undefined,
  },
  emptyText: {
    type: [String, Number, Boolean, Object, Array] as PropType<VueNode>,
    default: undefined,
  },
  visible: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
  onVisible: {
    type: Function as PropType<(visible: boolean) => void>,
    default: undefined,
  },
}, omit(proFieldFCRenderProps, ['text']), proRenderFieldPropsType)

type RenderProps = Partial<ExtractPropTypes<typeof renderProps>>

const proFieldProps = Object.assign({
  valueType: {
    type: String as PropType<ProFieldValueType>,
    default: 'text',
  },
}, proRenderFieldPropsType, proFieldFCRenderProps)

export type PropFieldProps = Partial<ExtractPropTypes<typeof proFieldProps>>

export const defaultRenderText = (
  text: ProFieldTextType,
  valueType: ProFieldValueType,
  props: RenderProps,
  attrs: Record<string, any>,
  valueTypeMap: Record<string, ProRenderFieldPropsType>,
): VueNode => {
  const { mode = 'read', emptyText = '-' } = props
  if (emptyText !== false && mode === 'read' && valueType !== 'option' && valueType !== 'switch') {
    if (typeof text !== 'boolean' && typeof text !== 'number' && !text) {
      const { fieldProps, render } = props
      if (render)
        return render(text, { mode, ...fieldProps }, <>{emptyText}</>)
      return <>{emptyText}</>
    }
  }

  // if (typeof valueType === 'object') {
  //   return defaultRenderTextByObject(text, valueType, props);
  // }
  const customValueTypeConfig = valueTypeMap && valueTypeMap[valueType as string]
  if (customValueTypeConfig) {
    // eslint-disable-next-line no-param-reassign
    // delete props.ref;
    if (mode === 'read') {
      return customValueTypeConfig.render?.(
        text,
        {
          text,
          ...props,
          mode: mode || 'read',
        },
        <>{text}</>,
      )
    }
    if (mode === 'update' || mode === 'edit') {
      return customValueTypeConfig.renderFormItem?.(
        text,
        {
          text,
          ...props,
        },
        <>{text}</>,
      )
    }
  }
  const needValueEnum = REQUEST_VALUE_TYPE.includes(valueType as string)
  const hasValueEnum = !!(
    props.valueEnum
      || props.request
      || attrs.options
      || props.fieldProps?.options
  )

  noteOnce(
    !needValueEnum || hasValueEnum,
    `如果设置了 valueType 为 ${REQUEST_VALUE_TYPE.join(
      ',',
    )}中任意一个，则需要配置options，request, valueEnum 其中之一，否则无法生成选项。`,
  )

  noteOnce(
    !needValueEnum || hasValueEnum,
    `If you set valueType to any of ${REQUEST_VALUE_TYPE.join(
      ',',
    )}, you need to configure options, request or valueEnum.`,
  )
  if (valueType === 'switch')
    return <FieldSwitch text={text as boolean} {...omit(props, ['value', 'placeholder', 'readonly']) as any} />

  if (valueType === 'textarea')
    return <FieldTextArea text={text as string} {...props} />

  if (valueType === 'second')
    return <FieldSecond text={text as number} {...props as any} />

  if (valueType === 'rate')
    return <FieldRate text={text as number} {...props} />

  return <FieldText text={text as string} {...props} />
}

const ProField = defineComponent({
  name: 'ProField',
  inheritAttrs: false,
  props: proFieldProps,
  setup(props, { attrs }) {
    return () => {
      const { text, valueType } = props
      return defaultRenderText(text, valueType, omit(props, ['text', 'valueType']), attrs, {})
    }
  },
})

ProField.install = (app: App) => {
  app.component(ProField.name, ProField)
  app.use(FieldTextArea)
  app.use(FieldStatus)
  app.use(FieldText)
  app.use(FieldSwitch)
  return app
}
export default ProField as typeof ProField & Plugin & {}

export {
  FieldStatus,
}
