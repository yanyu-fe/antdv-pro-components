import type { App, DefineComponent, Plugin, PropType } from 'vue'
import { defineComponent } from 'vue'
import { Badge } from 'ant-design-vue'

const SuccessComp: DefineComponent = defineComponent({
  name: 'ProFieldStatusSuccess',
  setup(_props, { slots }) {
    return () => {
      return <Badge status="success">{slots.default?.()}</Badge>
    }
  },
})
const ErrorComp: DefineComponent = defineComponent({
  name: 'ProFieldStatusError',
  setup(_props, { slots }) {
    return () => {
      return <Badge status="error">{slots.default?.()}</Badge>
    }
  },
})
const DefaultComp: DefineComponent = defineComponent({
  name: 'ProFieldStatusDefault',
  setup(_props, { slots }) {
    return () => {
      return <Badge status="default">{slots.default?.()}</Badge>
    }
  },
})
const ProcessingComp: DefineComponent = defineComponent({
  name: 'ProFieldStatusProcessing',
  setup(_props, { slots }) {
    return () => {
      return <Badge status="processing">{slots.default?.()}</Badge>
    }
  },
})
const WarningComp: DefineComponent = defineComponent({
  name: 'ProFieldStatusWarning',
  setup(_props, { slots }) {
    return () => {
      return <Badge status="warning">{slots.default?.()}</Badge>
    }
  },
})

/** 快捷操作，用于快速的展示一个状态 */
const Status: {
  Success: DefineComponent
  Error: DefineComponent
  Processing: DefineComponent
  Default: DefineComponent
  Warning: DefineComponent
  success: DefineComponent
  error: DefineComponent
  processing: DefineComponent
  default: DefineComponent
  warning: DefineComponent
} = {
  Success: SuccessComp,
  Error: ErrorComp,
  Default: DefaultComp,
  Processing: ProcessingComp,
  Warning: WarningComp,
  success: SuccessComp,
  error: ErrorComp,
  default: DefaultComp,
  processing: ProcessingComp,
  warning: WarningComp,
}

export type ProFieldStatusType = keyof typeof Status

const ProFieldBadgeColor = defineComponent({
  name: 'ProFieldBadgeColor',
  props: {
    color: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup(props, { slots }) {
    return () => {
      return <Badge color={props.color}>{slots.default?.()}</Badge>
    }
  },
})

ProFieldBadgeColor.install = (app: App) => {
  app.component(Status.Default.name, DefaultComp)
  app.component(Status.Error.name, ErrorComp)
  app.component(Status.Processing.name, ProcessingComp)
  app.component(Status.Warning.name, WarningComp)
  app.component(Status.Success.name, SuccessComp)
  app.component(ProFieldBadgeColor.name, ProFieldBadgeColor)
  return app
}

ProFieldBadgeColor.Success = SuccessComp
ProFieldBadgeColor.Error = ErrorComp
ProFieldBadgeColor.Default = DefaultComp
ProFieldBadgeColor.Processing = ProcessingComp
ProFieldBadgeColor.Warning = WarningComp
ProFieldBadgeColor.success = SuccessComp
ProFieldBadgeColor.error = ErrorComp
ProFieldBadgeColor.default = DefaultComp
ProFieldBadgeColor.processing = ProcessingComp
ProFieldBadgeColor.warning = WarningComp

export default ProFieldBadgeColor as typeof ProFieldBadgeColor & Plugin &{
  readonly Success: typeof SuccessComp
  readonly Error: typeof ErrorComp
  readonly Default: typeof DefaultComp
  readonly Processing: typeof ProcessingComp
  readonly Warning: typeof WarningComp
  readonly success: typeof SuccessComp
  readonly error: typeof ErrorComp
  readonly default: typeof DefaultComp
  readonly processing: typeof ProcessingComp
  readonly warning: typeof WarningComp
}
