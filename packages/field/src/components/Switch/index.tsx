import { useProProviderConfigInject } from '@yanyu-fe/pro-provider'
import { omit } from 'lodash'
import type { App, Plugin, PropType } from 'vue'
import { defineComponent, shallowRef, watchEffect } from 'vue'
import { Switch } from 'ant-design-vue'
import { proFieldFC } from '../../props'
const FieldSwitch = defineComponent({
  name: 'ProFieldSwitch',
  inheritAttrs: false,
  props: {
    ...omit(proFieldFC, ['modelValue']),
    text: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    fieldProps: {
      type: Object as PropType<any>,
      default: undefined,
    },
    modelValue: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
  },
  setup(props) {
    const { intl } = useProProviderConfigInject()
    const dom = shallowRef()
    watchEffect(() => {
      if (props.text === undefined || props.text === null || `${props.text}`.length < 1)
        dom.value = '-'

      dom.value = props.text
        ? props.fieldProps?.checkedChildren ?? intl.value.getMessage('switch.open', '打开')
        : props.fieldProps?.unCheckedChildren ?? intl.value.getMessage('switch.close', '关闭')
    })
    return () => {
      const { mode, render, renderFormItem, text, fieldProps } = props
      if (mode === 'read') {
        if (render)
          return render(text, { mode, ...fieldProps }, <>{dom}</>)

        return dom.value ?? '-'
      }
      if (mode === 'edit' || mode === 'update') {
        const editDom = (
          <Switch
            {...omit(fieldProps, ['value', 'checked'])}
            checked={props.modelValue}
            {...{ 'onUpdate:checked': props['onUpdate:modelValue'] } as any}
          />
        )
        if (renderFormItem)
          return renderFormItem(text, { mode, ...fieldProps }, editDom)

        return editDom
      }
      return null
    }
  },
})

FieldSwitch.install = (app: App) => {
  app.component(FieldSwitch.name, FieldSwitch)
  return app
}

export default FieldSwitch as typeof FieldSwitch & Plugin
