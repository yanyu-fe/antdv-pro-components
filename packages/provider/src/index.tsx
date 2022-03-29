import type { VueNode } from '@yanyu-fe/pro-utils'
import omit from 'ant-design-vue/lib/_util/omit'
import { configProviderProps } from 'ant-design-vue/lib/config-provider/context'
import type { App, ComputedRef, ExtractPropTypes, Plugin, PropType } from 'vue'
import { computed, defineComponent, inject, provide } from 'vue'
import { ConfigProvider } from 'ant-design-vue'
import zh_CN from 'ant-design-vue/lib/locale/zh_CN'
import arEG from './locale/ar_EG'
import zhCN from './locale/zh_CN'
import enUS from './locale/en_US'
import enGB from './locale/en_GB'
import viVN from './locale/vi_VN'
import itIT from './locale/it_IT'
import esES from './locale/es_ES'
import caES from './locale/ca_ES'
import jaJP from './locale/ja_JP'
import ruRU from './locale/ru_RU'
import srRS from './locale/sr_RS'
import msMY from './locale/ms_MY'
import zhTW from './locale/zh_TW'
import frFR from './locale/fr_FR'
import ptBR from './locale/pt_BR'
import koKR from './locale/ko_KR'
import idID from './locale/id_ID'
import deDE from './locale/de_DE'
import faIR from './locale/fa_IR'
import trTR from './locale/tr_TR'
import plPL from './locale/pl_PL'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const ProProviderContextKey = import.meta.dev ? 'ProProviderContextKey' : Symbol('ProProviderContextKey')

interface ProProviderConfigInject {
  intl: ComputedRef<IntlType>
  valueTypeMap: ComputedRef<Record<string, ProRenderFieldPropsType>>
}

const proConfigProviderProps: any = configProviderProps()

export type ProFieldRenderFormItem = (text: any, props: any, dom: VueNode) => VueNode
export type ProFieldRender = (text: any, props: any, dom: VueNode) => VueNode

export const proRenderFieldPropsType = {
  renderFormItem: {
    type: Function as PropType<ProFieldRenderFormItem>,
    default: undefined,
  },
  render: {
    type: Function as PropType<ProFieldRender>,
    default: undefined,
  },
}

export type ProRenderFieldPropsType = Partial<ExtractPropTypes<typeof proRenderFieldPropsType>>

export interface IntlType {
  locale: string
  getMessage: (id: string, defaultMessage: string) => string
}

function get(
  source: Record<string, unknown>,
  path: string,
  defaultValue?: string,
): string | undefined {
  // a[3].b -> a.3.b
  const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.')
  let result = source
  let message = defaultValue
  // eslint-disable-next-line no-restricted-syntax
  for (const p of paths) {
    message = Object(result)[p]
    result = Object(result)[p]
    if (message === undefined)
      return defaultValue
  }
  return message
}
/**
 * 创建一个操作函数
 *
 * @param locale
 * @param localeMap
 */
const createIntl = (locale: string, localeMap: Record<string, any>): IntlType => ({
  getMessage: (id: string, defaultMessage: string) =>
    get(localeMap, id, defaultMessage) || defaultMessage,
  locale,
})

const arEGIntl = createIntl('ar_EG', arEG)
const zhCNIntl = createIntl('zh_CN', zhCN)
const enUSIntl = createIntl('en_US', enUS)
const enGBIntl = createIntl('en_GB', enGB)
const viVNIntl = createIntl('vi_VN', viVN)
const itITIntl = createIntl('it_IT', itIT)
const jaJPIntl = createIntl('ja_JP', jaJP)
const esESIntl = createIntl('es_ES', esES)
const caESIntl = createIntl('ca_ES', caES)
const ruRUIntl = createIntl('ru_RU', ruRU)
const srRSIntl = createIntl('sr_RS', srRS)
const msMYIntl = createIntl('ms_MY', msMY)
const zhTWIntl = createIntl('zh_TW', zhTW)
const frFRIntl = createIntl('fr_FR', frFR)
const ptBRIntl = createIntl('pt_BR', ptBR)
const koKRIntl = createIntl('ko_KR', koKR)
const idIDIntl = createIntl('id_ID', idID)
const deDEIntl = createIntl('de_DE', deDE)
const faIRIntl = createIntl('fa_IR', faIR)
const trTRIntl = createIntl('tr_TR', trTR)
const plPLIntl = createIntl('pl_PL', plPL)

const intlMap = {
  'ar-EG': arEGIntl,
  'zh-CN': zhCNIntl,
  'en-US': enUSIntl,
  'en-GB': enGBIntl,
  'vi-VN': viVNIntl,
  'it-IT': itITIntl,
  'ja-JP': jaJPIntl,
  'es-ES': esESIntl,
  'ca-ES': caESIntl,
  'ru-RU': ruRUIntl,
  'sr-RS': srRSIntl,
  'ms-MY': msMYIntl,
  'zh-TW': zhTWIntl,
  'fr-FR': frFRIntl,
  'pt-BR': ptBRIntl,
  'ko-KR': koKRIntl,
  'id-ID': idIDIntl,
  'de-DE': deDEIntl,
  'fa-IR': faIRIntl,
  'tr-TR': trTRIntl,
  'pl-PL': plPLIntl,
}
const intlMapKeys = Object.keys(intlMap)

export {
  arEGIntl,
  enUSIntl,
  enGBIntl,
  zhCNIntl,
  viVNIntl,
  itITIntl,
  jaJPIntl,
  esESIntl,
  caESIntl,
  ruRUIntl,
  srRSIntl,
  msMYIntl,
  zhTWIntl,
  frFRIntl,
  ptBRIntl,
  koKRIntl,
  idIDIntl,
  deDEIntl,
  faIRIntl,
  trTRIntl,
  plPLIntl,
  intlMap,
  intlMapKeys,
}

const defaultProProviderConfigInject: ProProviderConfigInject = {
  intl: computed(() => ({
    ...zhCNIntl,
    locale: 'default',
  })),
  valueTypeMap: computed(() => ({})),
}

export const useProProviderConfigInject = () => {
  const { intl, valueTypeMap } = inject<ProProviderConfigInject>(ProProviderContextKey, defaultProProviderConfigInject)
  return {
    intl,
    valueTypeMap,
  }
}

const ProConfigProvider = defineComponent({
  name: 'ProConfigProvider',
  props: {
    intl: {
      type: Object as PropType<any>,
      default: undefined,
    },
    valueTypeMap: {
      type: Object as PropType<Record<string, ProRenderFieldPropsType>>,
      default: undefined,
    },
    ...proConfigProviderProps,
  },
  setup(props, { slots }) {
    const locale = computed(() => {
      if (!props.locale)
        return zh_CN
      return props.locale
    })
    provide<ProProviderConfigInject>(ProProviderContextKey, {
      intl: computed(() => props.intl),
      valueTypeMap: computed(() => props.valueTypeMap),
    })
    return () => {
      return <ConfigProvider locale={locale.value} {...omit(props, ['intl', 'valueTypeMap', 'locale'])}> {slots.default?.()}</ConfigProvider>
    }
  },
})

ProConfigProvider.install = (app: App) => {
  app.component(ProConfigProvider.name, ProConfigProvider)
  return app
}

ProConfigProvider.config = ConfigProvider.config

export default ProConfigProvider as typeof ProConfigProvider & Plugin & {
  readonly config: typeof ConfigProvider.config
}
