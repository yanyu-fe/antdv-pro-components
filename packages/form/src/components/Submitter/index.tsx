import type { VueNode } from '@yanyu-fe/pro-utils'
import { omit } from 'lodash'
import { defineComponent, shallowRef } from 'vue'
import type { ExtractPropTypes, PropType, Ref } from 'vue'
import type buttonProps from 'ant-design-vue/lib/button/button'
import { Button, Space } from 'ant-design-vue'
import { useProProviderConfigInject } from '@yanyu-fe/pro-provider'

export type ButtonProps = ExtractPropTypes<typeof buttonProps>

export interface SearchConfig {
  resetText?: VueNode
  submitText?: VueNode
}

export const submitterProps = {
  onSubmit: {
    type: Function as PropType<(value?: any) => void>,
    default: undefined,
  },
  onReset: {
    type: Function as PropType<(value?: any) => void>,
    default: undefined,
  },
  searchConfig: {
    type: Object as PropType<SearchConfig>,
    default: undefined,
  },
  submitButtonProps: {
    type: [Boolean, Object] as PropType<false| ButtonProps&{ preventDefault?: boolean }>,
    default: undefined,
  },
  resetButtonProps: {
    type: [Boolean, Object] as PropType<false| ButtonProps&{ preventDefault?: boolean }>,
    default: undefined,
  },
  render: {
    type: [Boolean, Function] as PropType<false|((props: any, dom: VueNode) => VueNode)>,
    default: undefined,
  },
}

export type SubmitterProps = ExtractPropTypes<typeof submitterProps>

export default defineComponent({
  name: 'Submitter',
  props: {
    ...submitterProps,
    form: {
      type: Object as PropType<Ref>,
      default: undefined,
    },
  },
  setup(props) {
    const { intl } = useProProviderConfigInject()
    const form = (props.form || { form: shallowRef() }) as Ref
    const submit = () => {
      form.value && form.value?.submit()
      props.onSubmit && props?.onSubmit?.()
    }
    const reset = () => {
      form.value && form.value?.resetFields()
      props.onReset && props?.onReset?.()
    }
    return () => {
      const {
        searchConfig = {},
        submitButtonProps,
        resetButtonProps = {},
        render,
      } = props

      if (render === false)
        return null
      const {
        resetText = intl.value.getMessage('form.reset', '重置'),
        submitText = intl.value.getMessage('form.submit', '提交'),
      } = searchConfig

      const dom = []
      if (resetButtonProps) {
        dom.push(
          <Button
            key="reset"
            onClick={(e: Event) => {
              if (!resetButtonProps?.preventDefault) reset()
              resetButtonProps?.onClick?.(e)
            }}
            {...omit(resetButtonProps, ['onClick', 'preventDefault'])}
          >
            {resetText}
          </Button>,
        )
      }
      if (submitButtonProps) {
        dom.push(
          <Button
            key="submit"
            type="primary"
            onClick={(e: Event) => {
              if (!submitButtonProps?.preventDefault) submit()
              submitButtonProps?.onClick?.(e)
            }}
            {...omit(submitButtonProps, ['preventDefault', 'onClick']) as ButtonProps}
          >
            {submitText}
          </Button>,
        )
      }

      const renderDom = render ? render({ ...props, submit, reset }, dom) : dom
      if (renderDom)
        return null
      if (Array.isArray(renderDom)) {
        if (renderDom.length === 0)
          return null
        if (renderDom.length === 1)
          return renderDom[0]
        return <Space>{renderDom}</Space>
      }
    }
  },
})
