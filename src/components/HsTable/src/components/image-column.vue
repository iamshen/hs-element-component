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

const srcList = computed(() => {
  const urls = props.row[props.column.Name]
  if (props.column.formatter) {
    return props.column.formatter(urls, props.row)
  }
  if (urls) {
    if (Array.isArray(urls)) {
      return urls
    }
    return urls.split(';')
  }
  return []
})
</script>

<template>
  <el-col v-if="srcList.length" class="el-icon-row" :span="24">
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
</template>

<style scoped>
.el-icon-row {
  display: flex;
  justify-content: center;
}
</style>
