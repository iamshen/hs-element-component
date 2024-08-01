<script lang="ts" setup>
import { ElDropdown, ElDropdownItem, ElDropdownMenu, ElIcon } from 'element-plus'
import * as ElpIcon from '@element-plus/icons-vue'
import type { PropType } from 'vue'
import type { ColumnAction, TableColumnProps } from '../types'

const props = defineProps({
  column: {
    type: Object as PropType<TableColumnProps<'ACTION'>>,
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

function actions(row: Record<string, any>): ColumnAction[] {
  return typeof props.column.actions === 'function' ? props.column.actions(row) : props.column.actions || []
}

function handleCommand(command: string | number | object | boolean) {
  emit('handleCommand', command)
}
</script>

<template>
  <span class="flex">
    <ElDropdown trigger="click" @command="handleCommand">
      <!-- 操作 -->
      <ElIcon :size="18" class="el-icon--right">
        <component :is="ElpIcon.Setting" />
      </ElIcon>
      <template #dropdown>
        <ElDropdownMenu>
          <template v-for="(item, index) in actions(row)" :key="index">
            <ElDropdownItem v-if="item.icon" :icon="ElpIcon[item.icon]" :command="{ row, name: item.command, dynamicComponent: item.dynamicComponent }">
              {{ item.name }}
            </ElDropdownItem>
            <ElDropdownItem v-else :command="{ row, name: item.command, dynamicComponent: item.dynamicComponent }">{{ item.name }}</ElDropdownItem>
          </template>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
  </span>
</template>

<style lang="scss" scoped>
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
