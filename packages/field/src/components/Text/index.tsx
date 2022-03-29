import { useProProviderConfigInject } from '@yanyu-fe/pro-provider'
import type { VueNode } from '@yanyu-fe/pro-utils'
import { Input } from 'ant-design-vue'
import { omit } from 'lodash'
import type { App, Plugin, PropType } from 'vue'
import { defineComponent, shallowRef, toRef, watchEffect } from 'vue'
import { proFieldFC } from '../../props'

const FieldText = defineComponent({
  name: 'ProFieldText',
  inheritAttrs: false,
  props: {
    ...proFieldFC,
    text: {
      type: String as PropType<string>,
      default: undefined,
    },
    emptyText: {
      type: [String, Number, Boolean, Symbol, Object, Array] as PropType<VueNode>,
      default: undefined,
    },
  },
  setup(props, { attrs }) {
    const filedProps = toRef(props, 'fieldProps')
    const inputRef = shallowRef()
    const { intl } = useProProviderConfigInject()
    watchEffect(() => {
      if (filedProps.value && filedProps.value.autoFocus)
        inputRef.value?.focus()
    })
    return () => {
      const { mode, fieldProps, text, render, emptyText, renderFormItem } = props
      const { prefix = '', suffix = '' } = fieldProps || {}
      if (mode === 'read') {
        // 当前是read模式
        const dom = (
          <>
            {prefix}
            {text ?? emptyText}
            {suffix}
          </>
        )
        if (render)
          return render(text, { mode, ...fieldProps }, dom) ?? emptyText
        return dom
      }
      if (mode === 'edit' || mode === 'update') {
        const placeholder = intl.value.getMessage('tableForm.inputPlaceholder', '请输入')
        const dom = <Input {...attrs} ref={inputRef} placeholder={placeholder} allowClear {...omit(fieldProps, 'value')} value={props.modelValue} {...{ 'onUpdate:value': props['onUpdate:modelValue'] }} />
        if (renderFormItem)
          return renderFormItem(text, { mode, ...fieldProps }, dom)
        return dom
      }
      return null
    }
  },
})

FieldText.install = (app: App) => {
  app.component(FieldText.name, FieldText)
  return app
}

export default FieldText as typeof FieldText & Plugin
