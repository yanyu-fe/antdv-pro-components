import type { VueNode } from '@yanyu-fe/pro-utils'
import type { Dayjs } from 'dayjs'

export type ProFieldFCMode = 'read' | 'edit' | 'update'

export type ProFieldTextType = VueNode | Dayjs |Dayjs[]

export type ProFieldRenderFormItem = (text: any, props: any, dom: VueNode) => VueNode
export type ProFieldRender = (text: any, props: any, dom: VueNode) => VueNode

export interface ProSchemaValueEnumType {
  /** @name 演示的文案 */
  text: VueNode
  /** @name 预定的颜色 */
  status: string
  /** @name 自定义的颜色 */
  color?: string
  /** @name 是否禁用 */
  disabled?: boolean
}

/**
 * 支持 Map 和 Object
 *
 * @name ValueEnum 的类型
 */
export type ProSchemaValueEnumMap = Map<VueNode, ProSchemaValueEnumType | VueNode>

export type ProSchemaValueEnumObj = Record<string, ProSchemaValueEnumType | VueNode>

export interface RequestOptionsType {
  label?: VueNode
  value?: VueNode
  /** 渲染的节点类型 */
  optionType?: 'optGroup' | 'option'
  options?: Omit<RequestOptionsType, 'children' | 'optionType'>[]
  [key: string]: any
}
export type ProFieldRequestData<U = any> = (params: U, props: any) => Promise<RequestOptionsType[]>
