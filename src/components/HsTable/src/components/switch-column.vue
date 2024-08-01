<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed } from 'vue'
import type { ColumnType, TableColumnProps } from '../types'

const props = defineProps({
  column: {
    type: Object as PropType<TableColumnProps<'SWITCH'>>,
    required: true,
    default: () => {},
  },
  row: {
    type: Object,
    required: true,
    default: () => {},
  },
})

const emit = defineEmits<{
  (event: 'handleCommand', command: string | number | object): void
}>()

const cellText = computed(() => {
  const res = props.row[props.column.name]
  if (props.column.formatter) {
    return props.column.formatter(props.row[props.column.name], props.row)
  }
  if (res === null || res === undefined || res === '') {
    return '--'
  }
  return props.row[props.column.name]
})

function handleCommand(_command: string | number | object) {
  emit('handleCommand', { item: props.row, command: props.column.switchCommand })
}
</script>

<template>
  <el-row>
    <div class="fragment" @click="handleCommand">
      <el-switch
        v-model="cellText"
        inline-prompt
        active-text="已启用"
        inactive-text="已禁用"
        :width="70"
        style="--el-switch-off-color: #999; pointer-events: none"
      />
    </div>
  </el-row>
</template>

<style lang="scss" scoped>
.el-table-text-column {

  font-size: 13px;
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
