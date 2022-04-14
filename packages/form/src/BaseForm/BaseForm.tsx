import type { VueNode } from '@yanyu-fe/pro-utils'
import { formProps } from 'ant-design-vue/lib/form/Form'
import type { Dayjs } from 'dayjs'
import { omit } from 'lodash'
import type { ExtractPropTypes, PropType, Ref } from 'vue'
import { defineComponent, shallowRef } from 'vue'
import type { SubmitterProps } from '../components/Submitter'
import type { FieldProps, FormItemProps, GroupProps, ProRequestData } from '../interface'

export const commonFormProps = {
  submitter: {
    type: [Boolean, Object] as PropType<false | SubmitterProps & { form?: Ref }>,
    default: undefined,
  },
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
  setup(_props) {
    requestFormCacheId.value += 0
    return () => {
      return (
        <div>
          <div>BaseForm</div>
        </div>
      )
    }
  },
})

export default BaseForm
