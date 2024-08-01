<script setup  lang="ts">
import { computed, reactive, ref } from 'vue'
import { ElTable, ElTableColumn, } from 'element-plus'
import type { PageRequest } from './types'
import HsTableColumn from './table-column.vue'
import { tableProps } from './table'

defineOptions({
  name: 'HsTable',
})

const props = defineProps(tableProps)

const emit = defineEmits<{
  (event: 'handleCommand', command: string | number | object | boolean): void
  (event: 'handleSelect', selection: any, row: any): void
  (event: 'handleSelectAll', selection: any): void
  (event: 'handleRowClick', row: any, column: any, evt: any): void
  (event: 'update:pageRequestModel', data: PageRequest): void
}>()

const elTableRef = ref<InstanceType<typeof ElTable>>()

// eslint-disable-next-line unused-imports/no-unused-vars
const pageIndex = computed({
  get() {
    return props.pageRequestModel.pageIndex
  },
  set(val: number) {
    emit('update:pageRequestModel', { ...props.pageRequestModel, pageIndex: val })
  },
})
// eslint-disable-next-line unused-imports/no-unused-vars
const pageSize = computed({
  get() {
    return props.pageRequestModel.pageSize
  },
  set(val: number) {
    emit('update:pageRequestModel', { ...props.pageRequestModel, pageSize: val })
  },
})

function handleCommand(command: string | number | object | boolean) {
  emit('handleCommand', command)
}

function handleSelect(selection: any, row: any) {
  emit('handleSelect', selection, row)
}

function handleSelectAll(selection: any) {
  emit('handleSelectAll', selection)
}

function handleRowClick(row: any, column: any, evt: any) {
  emit('handleRowClick', row, column, evt)
}

/** 表格数据 */
const state = reactive({
  dataSource: [],
  total: 0,
})

/**  */
async function queryAsync() {
  /** 合并 index, size 变化事件 */
  const requestModel = {
    ...props.pageRequestModel,
    // ...(page && limit && { pageIndex: page, pageSize: limit }),
  }

  const result = await props.pageRequestFn(requestModel)
  if (result) {
    state.dataSource = result.data ?? result
    state.total = result.totalCount
  }
}

/**
 * 清空数据
 */
function clearTableData() {
  state.dataSource = []
}
/**
 * 暴露请求数据的方法
 */
defineExpose({
  queryAsync,
  clearTableData,
})
</script>

<template>
  <div class="el-plus-table-wrapper">
    <ElTable
      ref="elTableRef"
      :data="state.dataSource"
      :border="border"
      highlight-current-row
      :lazy="lazy"
      :load="load"
      stripe
      :height="height"
      :header-cell-style="headerCellStyle"
      :style="style"
      :row-key="rowKey"
      :size="size"
      :tree-props="treeProps"
      @select="handleSelect"
      @select-all="handleSelectAll"
      @row-click="handleRowClick"
    >
      <!-- 多选 -->
      <el-table-column v-if="multiSelect" type="selection" />
      <HsTableColumn
        v-for="(column, columnIndex) in columns"
        :key="columnIndex"
        :column="column"
        @handle-command="handleCommand"
      />
      <template #empty>
        <el-empty :image-size="300" description="暂无数据" />
      </template>
    </ElTable>
    <!-- <Pagination
      v-if="isPager"
      v-show="state.total >= 0"
      v-model:page="pageIndex"
      v-model:limit="pageSize"
      :total="state.total"
      @pagination="queryAsync"
    /> -->
  </div>
</template>

<style scoped>
/* 在这里添加你的样式 */
</style>
