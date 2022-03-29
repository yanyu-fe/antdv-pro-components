import { omit } from 'lodash'
import type { App, Plugin, PropType } from 'vue'
import { defineComponent } from 'vue'
import { InputNumber } from 'ant-design-vue'
import { proFieldFC } from '../../props'

/**
 * 格式化秒
 *
 * @param result
 * @returns {string}
 */
export function formatSecond(result: number) {
  let formatText: string
  const d = Math.floor(result / (3600 * 24))
  const h = Math.floor(result / 3600)
  const m = Math.floor((result / 60) % 60)
  const s = Math.floor(result % 60)
  formatText = `${s}秒`
  if (m > 0)
    formatText = `${m}分钟${formatText}`

  if (h > 0)
    formatText = `${h}小时${formatText}`

  if (d > 0)
    formatText = `${d}天${formatText}`

  return formatText
}

const Second = defineComponent({
  name: 'ProFieldSecond',
  inheritAttrs: false,
  props: {
    ...proFieldFC,
    text: {
      type: Number as PropType<number>,
      default: undefined,
    },
    placeholder: {
      type: [String, Array] as PropType<string>,
      default: undefined,
    },
  },
  setup(props) {
    return () => {
      const { mode: type, text, render, renderFormItem, fieldProps, placeholder } = props
      if (type === 'read') {
        const secondText = formatSecond(Number(text) as number)
        const dom = <span>{secondText}</span>
        if (render)
          return render(text, { mode: type, ...fieldProps }, dom)

        return dom
      }
      if (type === 'edit' || type === 'update') {
        const dom = (
          <InputNumber
            style="width:100%"
            placeholder={placeholder}
            {...omit(fieldProps, ['value'])}
            value={props.modelValue} {...{ 'onUpdate:value': props['onUpdate:modelValue'] }}
          />
        )
        if (renderFormItem)
          return renderFormItem(text, { mode: type, ...fieldProps }, dom)

        return dom
      }
      return null
    }
  },
})

Second.install = (app: App) => {
  app.component(Second.name, Second)
  return app
}

export default Second as typeof Second & Plugin &{}
