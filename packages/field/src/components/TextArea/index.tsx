import { useProProviderConfigInject } from '@yanyu-fe/pro-provider'
import { omit } from 'lodash'
import type { App, Plugin, PropType } from 'vue'
import { defineComponent } from 'vue'
import { Input } from 'ant-design-vue'
import { proFieldFC } from '../../props'
const FieldTextArea = defineComponent({
  name: 'ProFieldTextArea',
  inheritAttrs: false,
  props: {
    ...proFieldFC,
    text: {
      type: String as PropType<string>,
      default: undefined,
    },
  },
  setup(props, { attrs }) {
    const { intl } = useProProviderConfigInject()
    return () => {
      const { mode, text, render, fieldProps, renderFormItem } = props
      if (mode === 'read') {
        const dom = <span >{text ?? '-'}</span>
        if (render)
          return render(text, { mode, ...fieldProps }, dom)

        return dom
      }
      if (mode === 'edit' || mode === 'update') {
        const dom = (
          <Input.TextArea
            {...attrs}
            rows={3}
            placeholder={intl.value.getMessage('tableForm.inputPlaceholder', '请输入')}
            {...omit(fieldProps, 'value')}
            value={props.modelValue} {...{
              'onUpdate:value': props['onUpdate:modelValue'],
              'onKeyPress': (e: any) => {
                if (e.key === 'Enter') e.stopPropagation()
              },
            }}
          />
        )
        if (renderFormItem)
          return renderFormItem(text, { mode, ...fieldProps }, dom)

        return dom
      }
      return null
    }
  },
})

FieldTextArea.install = (app: App) => {
  app.component(FieldTextArea.name, FieldTextArea)
  return app
}

export default FieldTextArea as typeof FieldTextArea & Plugin
