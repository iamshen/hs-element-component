<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed } from 'vue'
import type { LinkProps } from 'element-plus'
import { ElLink, linkProps } from 'element-plus'
import type { TableColumnProps } from '../types'
import { getDefaultProps } from './utils'

const props = defineProps({
  column: {
    type: Object as PropType<TableColumnProps<'LINK'>>,
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
  const textValue = props.row[props.column.name]
  // console.log(props.row, props.column.propertyName, res)
  if (textValue === null || textValue === undefined || textValue === '') {
    return '--'
  }
  if (props.column.title) {
    return props.column.title instanceof Function ? props.column.title(props.row) : props.column.title
  }
  return props.row[props.column.name]
})

const columnProps = computed(() => {
  const defaultTagProps = getDefaultProps(linkProps)
  if (!props.column.propsFormatter)
    return { ...defaultTagProps } as LinkProps
  const propsFromColumn = props.column.propsFormatter(props.row[props.column.name], props.row) as Partial<LinkProps> || {}
  return { ...defaultTagProps, ...propsFromColumn } as LinkProps
})
</script>

<template>
  <div class="el-table-text-column">
    <ElLink :href="columnProps.href" :target="columnProps.target" :type="columnProps.type" :icon="columnProps.icon" :underline="columnProps.underline" :disabled="columnProps.disabled">
      {{ cellText }}
    </ElLink>
  </div>
</template>

<style lang="scss" scoped>
.el-table-text-column {

  font-size: 13px;
}

.router-link-active {
  text-decoration: none;
}
</style>
