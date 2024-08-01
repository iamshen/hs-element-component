import type { TreeNode } from 'element-plus'
import type { ExtractPropTypes, PropType } from 'vue'
import { buildProps } from 'element-plus/es/utils/index.mjs'
import { type PageRequest, type TableColumnProps, componentSizes } from './types'

/**
 * hs table props
 */
export const tableProps = buildProps({
  /**
   * 列配置
   * @description 列配置
   */
  columns: {
    type: Array as () => TableColumnProps[],
    required: true,
  },
  /**
   * 表格数据请求方法
   * @description Table 分页请求方法
   */
  pageRequestFn: {
    type: Function as PropType<(pageRequest: PageRequest) => Promise<any>>,
    required: true,
  },
  /**
   * 请求模型
   * @description Table 分页请求模型
   */
  pageRequestModel: {
    type: Object as PropType<PageRequest>,
    required: true,
    default: () => ({
      pageIndex: 1,
      pageSize: 15,
      keyword: '',
    }),
  },
  /**
   * 是否为斑马纹 table
   * @description 默认 false
   */
  stripe: {
    type: Boolean,
    default: () => false,
  },
  /**
   * 列的宽度是否自撑开
   * @description 默认 true
   */
  fit: {
    type: Boolean,
    default: () => true,
  },
  /**
   * 是否带有纵向边框
   * @description 默认 false
   */
  border: {
    type: Boolean,
    default: () => false,
  },
  /**
   * Table 的尺寸
   * @description Table 的尺寸
   */
  size: {
    type: String,
    values: componentSizes,
    default: () => '',
  },
  /**
   * table 的高度。 默认为自动高度。
   * @description 如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，Table 的高度会受控于外部样式。
   */
  height: {
    type: [String, Number],
    default: () => undefined,
  },
  /**
   * table 的最大高度。
   * @description  合法的值为数字或者单位为 px 的高度。
   */
  maxHeight: {
    type: [String, Number],
    default: () => undefined,
  },
  /**
   * 是否懒加载子节点数据
   * @description  默认 false
   */
  lazy: {
    type: Boolean,
    default: () => false,
  },
  /**
   * 加载子节点数据的函数
   * @description  lazy 为 true 时生效
   */
  load: {
    type: Function as PropType<(row: any, treeNode: TreeNode, resolve: (data: any[]) => void) => void>,
    default: () => undefined,
  },
  /**
   * Table style 样式
   * @description  Table style 样式
   */
  style: {
    type: Object,
    default: () => ({}),
  },
  /**
   *
   * 表头自定义样式
   * @description
   */
  headerCellStyle: {
    type: Object,
    default: () => ({
      background: '#eef1f6',
      color: '#909399',
      height: '40px',
    }),
  },
  /**
   * 渲染嵌套数据的配置选项
   * @description { hasChildren?: string, children?: string }
   */
  treeProps: {
    type: Object as PropType<
      | {
        hasChildren?: string | undefined
        children?: string | undefined
      }
      | undefined
    >,
    default: () => {
      return {
        hasChildren: 'hasChildren',
        children: 'children',
      }
    },
  },
  /**
   * 行数据的 Key，用来优化 Table 的渲染
   * @description 在使用reserve-selection功能与显示树形数据时，该属性是必填的。 类型为 String 时，支持多层访问：user.info.id，但不支持 user.info[0].id，此种情况请使用 Function。
   */
  rowKey: {
    type: [String, Function] as PropType<string | ((row: any) => string)>,
    default: () => 'id',
  },

  /**
   * 是否显示复选框
   */
  multiSelect: {
    type: Boolean,
    default: false,
  },
  /**
   * 选择项的 rowKey 集合
   */
  selections: {
    type: Array,
    default: () => [],
  },
  /**
   * 是否使用分页
   */
  isPager: {
    type: Boolean,
    default: () => true,
  },
} as const)

export type HsTableProps = ExtractPropTypes<typeof tableProps>
