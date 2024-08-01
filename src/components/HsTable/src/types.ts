import type { RendererElement, RendererNode, VNode } from 'vue'
import type * as ElpIcon from '@element-plus/icons-vue'

/**
 * 定义图标类型
 */
type ElPlusIcon = keyof typeof ElpIcon

/**
 * 表格列配置
 */
export interface TableColumnProps {
  /**
   * 字段名称
   * @description 字段名称
   */
  Name: string

  /**
   * 字段类型
   * @description 字段类型
   */
  PropertyType?: keyof typeof ColumnPropsType | ColumnPropsType

  /**
   * 显示的标题
   * @description 显示的标题
   */
  label?: string

  /**
   * 列样式
   * @description 列样式名称
   */
  className?: string

  /**
   * 列宽度
   * @description 对应列的宽度, 可以是数字或者是固定的像素值
   * @example '100px' or 100
   */
  width?: string | number

  /**
   * 对应列的最小宽度
   * @description  与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列
   * @example '100px' or 100
   */
  minWidth?: string | number

  /**
   * 单元格标题
   * @description 自定义单元格标题
   */
  title?: ((row: Record<string, any>) => string | null) | string

  /**
   * Table 的尺寸
   * @description  Table 的尺寸
   */
  size?: '' | 'large' | 'default' | 'small'

  /**
   * 在何处打开链接文档
   * @description 如果配置了路由地址，属性规定在何处打开链接文档，仅当 PropertyType 为 LINK 时有效
   * @default _self
   */
  linkRouteTarget?: '_self' | '_blank' | '_parent' | '_top' | string

  /**
   * 操作按钮
   * @description 操作按钮配置，可以是一个数组或者一个函数
   */
  actions?: ColumnPropsAction[] | ((row: any) => ColumnPropsAction[])

  /**
   * 格式化器，用来格式化内容
   * @description 格式化字段的方法，是一个函数
   */
  formatter?: (value: any, row: any) => VNode<RendererNode, RendererElement, { [key: string]: any }> | string | null

  /**
   * 单元格字体样式
   * @description 单元格字体样式，可以是一个字符串或者一个函数
   */
  cellClass?: ((value: any, row: any) => string)

  /**
   * 开关命令
   * @description ColumnPropsType = Switch 时必传
   */
  switchCommand?: string

  /**
   * 图片
   * @description 单元格左侧显示图片
   */
  images?: (row: any) => string[]

  /**
   * 多级表头
   * @description 数据结构比较复杂的时候，可使用多级表头来展现数据的层次关系。
   */
  children?: TableColumnProps[]

  /**
   * 对应列是否可以通过拖动改变宽度
   * @description （需要设置 border 属性为真）
   */
  resizable?: boolean

  /**
   * 是否要高亮当前行
   * @description 是否要高亮当前行
   */
  highlightCurrentRow?: boolean

  /**
   * 对齐方式
   * @description 对齐方式
   */
  align?: 'left' | 'center' | 'right' | string

  /**
   * 列是否固定在左侧或者右侧
   * @description true 表示固定在左侧
   */
  fixed?: boolean | 'left' | 'right'
}

/**
 * 表格列的字段类型
 */
export enum ColumnPropsType {
  /** 字符串，无交互，默认样式 */
  STRING = 'string',
  /** 时间戳 */
  TIMESTAMP = 'timestamp',
  /** 图片 */
  IMAGE = 'image',
  /** 操作 */
  ACTION = 'action',
  /** 链接 */
  LINK = 'link',
  /** tag 标签 */
  TAG = 'tag',
  /** 动态 */
  DYNAMIC = 'dynamic',
  /** 开关 */
  SWITCH = 'switch',
  /** 嵌套 */
  NESTED = 'nested',
  /** text 文本 */
  TEXT = 'text',
}

/**
 * 操作按钮
 */
export interface ColumnPropsAction {

  /**
   * 操作按钮名称
   * @description 操作按钮名称
   */
  name: string

  /**
   * 操作按钮图标
   * @description 操作按钮图标
   */
  icon?: ElPlusIcon // | keyof typeof ElpIcon

  /**
   * 操作按钮命令
   * @description 操作按钮命令
   */
  command: string

}

/**
 * 分页请求对象
 * @export
 * @interface PageRequest
 * @description 分页请求对象
 */
export interface PageRequest {
  /**
   * 页码
   * @type {number}
   * @memberof PageRequest
   */
  pageIndex?: number

  /**
   * 每页数量
   * @type {number}
   * @memberof PageRequest
   */
  pageSize?: number

  /**
   * 模糊搜索字段
   * @type {string}
   * @memberof PageRequest
   */
  keyword?: string
}

/**
 * 请求统一响应
 */
export interface ResponseResult {
  content?: { [key: string]: any }
  description?: string
  errorCode: number
  traceId?: string
  version?: string
  [property: string]: any
}

export const componentSizes = ['', 'default', 'small', 'large'] as const

export interface RowCommand {
  name: string | null
  row: any | null
  key?: number
}
