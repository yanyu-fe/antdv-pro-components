import type { VueNode } from '@yanyu-fe/pro-utils'
import { formProps } from 'ant-design-vue/lib/form/Form'
import type { Dayjs } from 'dayjs'
import { Spin } from 'ant-design-vue'
import { omit } from 'lodash'
import type { ExtractPropTypes, PropType, Ref } from 'vue'
import { defineComponent, shallowRef } from 'vue'
import { useFetchData } from '@yanyu-fe/pro-utils'
import type { SubmitterProps } from '../components/Submitter'
import type { FieldProps, FormItemProps, GroupProps, ProRequestData } from '../interface'

export const commonFormProps = {
  /**
   * @name 自定义提交的配置
   *
   * @example 不展示提交按钮和重置按钮
   * submitter={false}
   * @example 修改重置按钮的样式，并且隐藏提交按钮
   * submitter={{resetButtonProps: { type: 'dashed'},submitButtonProps: { style: { display: 'none', }}}}
   *
   * @example 修改提交按钮和重置按钮的顺序
   * submitter={{ render:(props,dom)=> [...dom.reverse()]}}
   *
   * @example 修改提交和重置按钮文字
   * submitter={{ searchConfig: { submitText: '提交2',restText: '重置2'}}}
   */
  submitter: {
    type: [Boolean, Object] as PropType<false | SubmitterProps & { form?: Ref }>,
    default: undefined,
  },
  /**
   * @name 表单结束后调用
   * @description 支持异步操作，更加方便
   *
   * @example onFinish={async (values) => { await save(values); return true }}
   */
  onFinish: {
    type: Function as PropType<(formData: any) => Promise<void|boolean>>,
    default: undefined,
  },
  formRef: {
    type: Object as PropType<Ref>,
    default: undefined,
  },
  syncToUrl: {
    type: [Boolean, Function] as PropType<false | ((values: any, type: 'get' | 'set') => any)>,
    default: undefined,
  },
  extraUrlParams: {
    type: Object as PropType<any>,
    default: undefined,
  },
  syncToInitialValues: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
  omitNil: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
  dateFormatter: {
    type: [String, Number, Boolean, Function] as PropType<string|number|false|((value: Dayjs, valueType: string) => string | number)>,
    default: undefined,
  },
  onInit: {
    type: Function as PropType<(values: any, form: Ref) => void>,
    default: undefined,
  },
  params: {
    type: Object as PropType<any>,
    default: undefined,
  },
  request: {
    type: Function as PropType<ProRequestData<any>>,
    default: undefined,
  },
  isKeyPressSubmit: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
  formKey: {
    type: String as PropType<string>,
    default: undefined,
  },
  autoFocusFirstInput: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
}

export type CommonFormProps = ExtractPropTypes<typeof commonFormProps>

export type ContentRenderType = (item: VueNode[], submitter: SubmitterProps, form: Ref) => VueNode

export const baseFormProps = {
  ...(omit(formProps, ['onFinish'])),
  ...commonFormProps,
  contentRender: {
    type: Function as PropType<ContentRenderType>,
    default: undefined,
  },
  fieldProps: {
    type: Object as PropType<FieldProps>,
    default: undefined,
  },
  onInit: {
    type: Function as PropType<(values: any, form: Ref) => void>,
    default: undefined,
  },
  formItemProps: {
    type: Object as PropType<FormItemProps>,
    default: undefined,
  },
  groupProps: {
    type: Object as PropType<GroupProps>,
    default: undefined,
  },
  isKeyPressSubmit: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
  formComponentType: {
    type: String as PropType<'DrawerForm' | 'ModalForm' | 'QueryFilter'>,
    default: undefined,
  },
}

const requestFormCacheId = shallowRef(0)

const BaseForm = defineComponent({
  name: 'BaseForm',
  props: baseFormProps,
  setup(props) {
    requestFormCacheId.value += 0
    const initialData = useFetchData({
      request: props.request,
      params: props.params,
      proFieldKey: props.formKey,
    })

    return () => {
      if (!initialData.value && props.request) {
        return (
          <div style={{ paddingTop: 50, paddingBottom: 50, textAlign: 'center' }}>
            <Spin />
          </div>
        )
      }

      return (
        <div>
          <div>BaseForm</div>
        </div>
      )
    }
  },
})

export default BaseForm
