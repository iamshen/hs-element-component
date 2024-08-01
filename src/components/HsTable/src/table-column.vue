<script lang="ts" setup>
import { ElTableColumn, ElTooltip } from 'element-plus'
import type { PropType } from 'vue'
import { compNameRef } from './table-column'
import type { ColumnTypeKeys, TableColumnProps } from './types'

defineOptions({
  name: 'HsTableColumn',
})

defineProps({
  column: {
    type: Object as PropType<TableColumnProps<ColumnTypeKeys>>,
    required: true,
    default: () => ({} as TableColumnProps<ColumnTypeKeys>),
  },
})

const emit = defineEmits<{
  (event: 'handleCommand', command: string | number | object | boolean): void
  (event: 'handleRowClick', row: any, column: any, evt: any): void
}>()

function handleCommand(command: string | number | object | boolean) {
  emit('handleCommand', command)
}

/**
 *  获取标题
 * @param row 行数据
 * @param propertyName 属性名
 * @param title
 */
function getTitle(row: Record<string, any>, propertyName: string, title?: ((row: Record<string, any>) => string | null | undefined) | string) {
  if (title) {
    if (title instanceof Function) {
      return title(row)
    }
    else {
      return title
    }
  }
  return row[propertyName]
}
</script>

<template>
  <!-- 嵌套表头（多级表头） -->
  <ElTableColumn
    v-if="column.children"
    :class-name="column.className"
    :prop="column.name"
    :resizable="column.resizable || false"
    :min-width="column.minWidth"
    :width="column.width"
    :label="column.label"
    :highlight-current-row="column.highlightCurrentRow || true"
    :align="column.align || 'center'"
  >
    <HsTableColumn
      v-for="(childrenColumn, childrenIndex) in column.children"
      :key="childrenIndex"
      :column="childrenColumn"
      @handle-command="handleCommand"
    />
  </ElTableColumn>
  <!-- 正常单表头 -->
  <ElTableColumn
    v-else
    :class-name="column.className"
    :fixed="column.fixed || false"
    :prop="column.name"
    :resizable="column.resizable || false"
    :min-width="column.minWidth"
    :width="column.width"
    :label="column.label"
    :highlight-current-row="column.highlightCurrentRow || true"
    :align="column.align || 'center'"
  >
    <template #header>
      <span>{{ column.label }}</span>
    </template>
    <template #default="{ row }">
      <template v-if="column.title">
        <ElTooltip
          class="box-item"
          effect="dark"
          placement="top"
          :content="getTitle(row, column.name!, column.title)"
        >
          <component
            :is="compNameRef(column.columnType)"
            :column="column"
            :row="row"
            @handle-command="handleCommand"
          />
        </ElTooltip>
      </template>
      <template v-else>
        <component :is="compNameRef(column.columnType)" :column="column" :row="row" @handle-command="handleCommand" />
      </template>
    </template>
  </ElTableColumn>
</template>
