<!-- eslint-disable no-console -->
<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed } from 'vue'
import { ElTag, tagProps } from 'element-plus'
import type { TagProps } from 'element-plus'
import type { TableColumnProps } from '../types'
import { getDefaultProps } from './utils'

const props = defineProps({
  column: {
    type: Object as PropType<TableColumnProps<'TAG'>>,
    required: true,
    default: () => {},
  },
  row: {
    type: Object,
    required: true,
    default: () => {},
  },
})

const cellText = computed(() => {
  const res = props.row[props.column.name]
  if (res === null || res === undefined || res === '') {
    return '--'
  }
  if (props.column.title) {
    return props.column.title instanceof Function ? props.column.title(props.row) : props.column.title
  }
  return props.row[props.column.name]
})

const customClass = computed(() => {
  const strClass: string[] = ['el-table-tag-column']
  if (props.column.cellClass) {
    strClass.push(props.column.cellClass(props.row[props.column.name], props.row))
  }
  return strClass.join(' ')
})

const columnProps = computed(() => {
  const defaultTagProps = getDefaultProps(tagProps)
  if (!props.column.propsFormatter)
    return { ...defaultTagProps } as TagProps
  const propsFromColumn = (props.column.propsFormatter(props.row[props.column.name], props.row) as Partial<TagProps>) || {}
  return { ...defaultTagProps, ...propsFromColumn } as TagProps
})
</script>

<template>
  <ElTag
    :title="cellText"
    :class="customClass"
    :effect="columnProps.effect"
    :size="columnProps.size"
    :color="columnProps.color"
    :round="columnProps.round"
    :type="columnProps.type"
    :hit="columnProps.hit"
    :closable="columnProps.closable"
    :disable-transitions="columnProps.disableTransitions"
  >
    {{ cellText }}
  </ElTag>
</template>
