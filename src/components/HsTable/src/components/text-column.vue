<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed } from 'vue'
import { type TextProps, textProps } from 'element-plus'
import { ElCol, ElText } from 'element-plus'
import type { TableColumnProps } from '../types'
import { getDefaultProps } from './utils'

const props = defineProps({
  column: {
    type: Object as PropType<TableColumnProps<'TEXT'>>,
    required: true,
    default: () => {},
  },
  row: {
    type: Object,
    required: true,
    default: () => {},
  },
})

const customClass = computed(() => {
  const strClass: string[] = ['el-table-text-column']
  if (props.column.cellClass) {
    strClass.push(props.column.cellClass(props.row[props.column.name], props.row))
  }
  return strClass.join(' ')
})

const cellText = computed(() => {
  const res = props.row[props.column.name]

  if (props.column.name === '') {
    return ''
  }
  if (res === null || res === undefined || res === '') {
    return '--'
  }
  return props.row[props.column.name]
})

const columnProps = computed(() => {
  const defaultTagProps = getDefaultProps(textProps)
  if (!props.column.propsFormatter)
    return { ...defaultTagProps } as TextProps
  const propsFromColumn = (props.column.propsFormatter(props.row[props.column.name], props.row) as Partial<TextProps>) || {}
  return { ...defaultTagProps, ...propsFromColumn } as TextProps
})
</script>

<template>
  <ElCol class="text" :class="customClass" :title="cellText">
    <ElText class="mx-1" :tag="columnProps.tag" :type="columnProps.type">
      {{ cellText }}
    </ElText>
  </ElCol>
</template>

<style lang="scss" scoped>
.el-table-text-column {
  display: flex;
  font-size: 13px;
  width: 100%;

  .icon-text {
    text-align: left;
    margin-left: 5px;
  }

  .el-icon-row {
    display: flex;
  }
}

.fragment {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  overflow: hidden;
}

.fragment-item {
  width: 100%;
  text-align: left;
  margin: auto;
}
</style>
