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
  if (props.column.cellClass) {
    strClass.push(props.column.cellClass(props.row[props.column.Name], props.row))
  }
  return strClass.join(' ')
})

const cellText = computed(() => {
  const res = props.row[props.column.Name]

  if (props.column.Name === '') {
    return ''
  }
  if (res === null || res === undefined || res === '') {
    return '--'
  }
  return props.row[props.column.Name]
})

const textType = computed(() => {
  if (props.column.formatter) {
    const textOption: any = props.column.formatter(props.row[props.column.Name], props.row)
    return textOption?.type || ''
  }
  return ''
})

const textTag = computed(() => {
  if (props.column.formatter) {
    const textOption: any = props.column.formatter(props.row[props.column.Name], props.row)
    return textOption?.tag || ''
  }
  return ''
})
</script>

<template>
  <div>
    <div :class="customClass">
      <el-col class="text" :title="cellText">
        <el-text v-if="textTag" class="mx-1" :tag="textTag" :type="textType">
          {{ cellText }}
        </el-text>
        <el-text v-else class="mx-1" :type="textType">
          {{ cellText }}
        </el-text>
      </el-col>
    </div>
  </div>
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
