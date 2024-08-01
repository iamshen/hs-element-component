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

const customClass = computed(() => {
  const strClass: string[] = ['el-table-text-column']
  if (props.column.Name === '' || props.column.Name === undefined) {
    return strClass
  }
  if (props.column.cellClass instanceof Function) {
    strClass.push(props.column.cellClass(props.row[props.column.Name], props.row))
  }
  return strClass.join(' ')
})

const cellText = computed(() => {
  if (props.column.Name === '' || props.column.Name === undefined) {
    return ''
  }
  const res = props.row[props.column.Name]
  if (props.column.formatter) {
    return props.column.formatter(props.row[props.column.Name], props.row)
  }
  if (res === null || res === undefined || res === '') {
    return '--'
  }
  return props.row[props.column.Name]
})
const srcList = computed(() => {
  if (props.column.images) {
    return props.column.images(props.row) || []
  }
  return []
})
</script>

<template>
  <div>
    <div :class="customClass">
      <el-col v-if="srcList.length" class="el-icon-row" :span="4">
        <el-image
          class="el-avatar el-avatar--small el-avatar--square"
          :src="srcList[0]"
          :preview-src-list="srcList"
          :initial-index="4"
          fit="fill"
          :z-index="9999"
          preview-teleported
        />
      </el-col>
      <el-col class="text" :class="column.images ? 'icon-text' : ''" :title="cellText" :span="srcList.length ? 18 : 24">
        {{ cellText }}
      </el-col>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.el-table-text-column {
  display: flex;
  font-size: 13px;
  width: 100%;
  .text {

  }
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
