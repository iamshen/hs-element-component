<script lang="ts" setup>
import * as ElpIcon from '@element-plus/icons-vue'
import type { PropType } from 'vue'
import type { ColumnPropsAction, TableColumnProps } from '../types'

const props = defineProps({
  column: {
    type: Object as PropType<TableColumnProps>,
    required: true,
  },
  row: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits<{
  (event: 'handleCommand', command: string | number | object | boolean): void
}>()

function actions(row: Record<string, any>): ColumnPropsAction[] {
  return typeof props.column.actions === 'function'
    ? props.column.actions(row)
    : props.column.actions || []
}

function handleCommand(command: string | number | object | boolean) {
  emit('handleCommand', command)
}
</script>

<template>
  <span class="flex">
    <el-dropdown trigger="click" @command="handleCommand">
      <!-- 操作 -->
      <el-icon :size="18" class="el-icon--right">
        <component :is="ElpIcon.Setting" />
      </el-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <template v-for="(item, index) in actions(row)" :key="index">
            <el-dropdown-item
              v-if="item.icon"
              :icon="ElpIcon[item.icon]"
              :command="{ item: row, command: item.command }"
            >
              {{ item.name }}
            </el-dropdown-item>
            <el-dropdown-item v-else :command="{ item: row, command: item.command }">{{ item.name }}</el-dropdown-item>
          </template>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </span>
</template>

<style lang="scss" scoped>
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
