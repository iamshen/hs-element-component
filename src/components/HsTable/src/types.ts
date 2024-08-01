import type { RendererElement, RendererNode, VNode } from 'vue'
import type * as ElpIcon from '@element-plus/icons-vue'
import type { LinkProps, TagProps, TextProps } from 'element-plus'

/**
 * 定义图标类型
 */
type ElPlusIcon = keyof typeof ElpIcon

/**
 * 表格列的字段类型
 */
export enum ColumnType {
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

// 定义 columnType 的泛型
export type ColumnTypeKeys = keyof typeof ColumnType

/**
 * 各个列类型对应的 props 类型
 */
interface ColumnPropsMap {
  [ColumnType.STRING]: never
  [ColumnType.TIMESTAMP]: never
  [ColumnType.IMAGE]: never
  [ColumnType.ACTION]: never
  [ColumnType.LINK]: Partial<LinkProps>
  [ColumnType.TAG]: Partial<TagProps>
  [ColumnType.DYNAMIC]: never
  [ColumnType.SWITCH]: never
  [ColumnType.NESTED]: never
  [ColumnType.TEXT]: Partial<TextProps>
}

/**
 * 根据 columnType 提取对应的 columnProps 类型
 */
type ColumnPropsForType<T extends ColumnTypeKeys> = {
  [K in T]: ColumnPropsMap[typeof ColumnType[K]]
}[T]
/**
 * 表格列配置
 */
export interface TableColumnProps<T extends ColumnTypeKeys> {
  /**
   * 字段名称
   * @description 字段名称
   */
  name: string

  /**
   * 字段类型
   * @description 字段类型
   */
  columnType?: T

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
  actions?: ColumnAction[] | ((row: any) => ColumnAction[])

  /**
   * 格式化器，用来格式化内容
   * @description 格式化字段的方法，是一个函数
   */
  formatter?: (value: any, row: any) => VNode<RendererNode, RendererElement, { [key: string]: any }> | string | null

  /**
   * 列的 props
   */
  propsFormatter?: (value: any, row: any) => ColumnPropsForType<T>

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
  children?: TableColumnProps<T>[]

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
 * 操作按钮
 *
 * 组件行为说明：
 * - 当定义 `ColumnAction` 时，如果 `dynamicComponent` 被指定（即不为 `null` 或 `undefined`），
 *   则点击操作按钮将直接执行指定的动态组件或函数。
 * - 如果未定义 `dynamicComponent`，则点击操作按钮会查询当前目录（引用位置的相对路径）的
 *   `/components` 目录下查找与 `name` 属性匹配的 `name.vue` 文件，并将其作为执行组件进行渲染。
 */
export interface ColumnAction {

  /**
   * 操作按钮名称
   * @description 指定操作按钮的显示名称。此名称将用于按钮的文本或标签。
   */
  name: string

  /**
   * 操作按钮图标
   * @description 指定操作按钮的图标。可以使用 Element Plus 提供的图标（`ElPlusIcon`），以便在按钮上显示相应的图标。
   */
  icon?: ElPlusIcon

  /**
   * 操作按钮命令
   * @description 该字段定义了按钮的操作命令，通常用于识别或处理按钮的操作逻辑。
   */
  command: string

  /**
   * 操作按钮触发的动态组件或函数
   * @description 当指定此字段时，点击操作按钮将执行动态组件或函数。
   * - 如果为 `VNode` 类型，按钮点击时将渲染指定的动态组件。
   * - 如果为函数类型，按钮点击时将执行该函数。
   * - 如果为 `null` 或 `undefined`，则按钮将按照默认逻辑处理。
   */
  dynamicComponent?: VNode | (() => void) | undefined
}

/**
 * Table 行命名对象
 */
export interface RowCommand {
  name: string | undefined
  row: any | undefined
  key?: number
  dynamicComponent?: VNode | (() => void) | undefined
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
