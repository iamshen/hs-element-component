import type { ExtractPropTypes } from 'vue'
import { buildProps } from 'element-plus/es/utils/index'

export const paginatorProps = buildProps({
  total: {
    require: true,
    type: Number,
    default: () => 0,
  },
  pageSizes: {
    type: Array,
    default() {
      return [10, 15, 20, 30, 50]
    },
  },
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper',
  },
  background: {
    type: Boolean,
    default: true,
  },
  autoScroll: {
    type: Boolean,
    default: true,
  },
  hidden: {
    type: Boolean,
    default: false,
  },
  styles: {
    type: Object,
    default: () => ({
      justifyContent: 'right',
    }),
  },
} as const)

export type HsPaginatorProps = ExtractPropTypes<typeof paginatorProps>
