import { omit } from 'lodash'
import { defineComponent, reactive } from 'vue'
import { formProps } from 'ant-design-vue/lib/form/Form'
import { BaseForm } from '../../BaseForm'
import { commonFormProps } from '../../BaseForm/BaseForm'
import type { SubmitterProps } from '../../components/Submitter'
const ProForm = defineComponent({
  name: 'ProForm',
  props: {
    ...omit(formProps, ['onFinish']) as any,
    ...commonFormProps,
  },
  setup(props, { attrs }) {
    const submitterConf = reactive<SubmitterProps>({
      render: (_: any, dom: any) => dom.reverse(),
    })
    const contentRenderConf = (items: any, submitter: any) => {
      return (
        <>
          {items}
          {submitter}
        </>
      )
    }
    return () => {
      return (
        <>
          <BaseForm
            layout={'vertical'}
            submitter={submitterConf}
            contentRender={contentRenderConf}
            {...{ ...props, ...attrs }}
          />
        </>
      )
    }
  },
})

export default ProForm
