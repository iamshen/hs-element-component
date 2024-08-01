<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed } from 'vue'
import type { TableColumnProps } from '../types'

const props = defineProps({
  column: {
    type: Object as PropType<TableColumnProps>,
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
  const res = props.row[props.column.Name]
  if (res === null || res === undefined || res === '') {
    return '--'
  }
  if (props.column.title) {
    return props.column.title instanceof Function ? props.column.title(props.row) : props.column.title
  }
  return props.row[props.column.Name]
})

const tagColor = computed(() => {
  if (props.column.formatter) {
    const tagOption: any = props.column.formatter(props.row[props.column.Name], props.row)
    return tagOption?.color || ''
  }
  return 'info'
})

const tagSize = computed(() => {
  if (props.column.formatter) {
    const tagOption: any = props.column.formatter(props.row[props.column.Name], props.row)
    return tagOption?.tagSize || ''
  }
  return 'small'
})

const tagEffect = computed(() => {
  if (props.column.formatter) {
    const tagOption: any = props.column.formatter(props.row[props.column.Name], props.row)
    return tagOption?.effect || 'dark'
  }
  return 'dark'
})
</script>

<template>
  <el-tag
    style="display: flex; --el-tag-border-color: none"
    :effect="tagEffect"
    :size="tagSize"
    :color="tagColor"
    round
  >
    {{ cellText }}
  </el-tag>
</template>

<style lang="scss" scoped>
.el-table-text-column {

  font-size: 13px;
}
</style>
