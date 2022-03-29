import { omit } from 'lodash'
import type { App, Plugin, PropType } from 'vue'
import { defineComponent } from 'vue'
import { Rate } from 'ant-design-vue'
import { proFieldFC } from '../../props'

/**
 * 评分组件
 *
 * @param
 */
const FieldRate = defineComponent({
  name: 'ProFieldRate',
  inheritAttrs: false,
  props: {
    ...proFieldFC,
    text: {
      type: Number as PropType<number>,
      default: undefined,
    },
  },
  setup(props) {
    return () => {
      const { mode, render, fieldProps, renderFormItem, text } = props
      if (mode === 'read') {
        const dom = <>
          <Rate allowHalf disabled {...fieldProps} value={text} />
        </>
        if (render)
          return render(text, { mode, ...fieldProps }, <>{dom}</>)
        return dom
      }
      if (mode === 'edit' || mode === 'update') {
        const dom = <><Rate allowHalf {...omit(fieldProps, ['value'])} value={props.modelValue} {...{ 'onUpdate:value': props['onUpdate:modelValue'] }} /></>
        if (renderFormItem)
          return renderFormItem(text, { mode, ...fieldProps }, dom)
        return dom
      }
      return null
    }
  },
})

FieldRate.install = (app: App) => {
  app.component(FieldRate.name, FieldRate)
  return app
}

export default FieldRate as typeof FieldRate & Plugin
