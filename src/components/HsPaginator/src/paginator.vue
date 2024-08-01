<script setup  lang="ts">
import { ref } from 'vue'
import { ElPagination } from 'element-plus'
import { scrollTo } from '../utils'
import { paginatorProps } from './paginator'

defineOptions({
  name: 'HsPaginator',
})

const props = defineProps(paginatorProps)

const emit = defineEmits(['onChange'])

const pageIndex = defineModel<number>('pageIndex')
const pageSize = defineModel<number>('pageSize')

function handleSizeChange(val: number) {
  emit('onChange', { pageIndex, pageSize: val })
  if (ref(props.autoScroll).value) {
    scrollTo(0, 800)
  }
}
function handleCurrentChange(val: number) {
  emit('onChange', { pageIndex: val, pageSize })
  if (ref(props.autoScroll).value) {
    scrollTo(0, 800)
  }
}
</script>

<template>
  <div :class="{ hidden }" class="pagination-container justify-end" :style="styles">
    <ElPagination
      v-model:current-page="pageIndex"
      v-model:page-size="pageSize"
      size="small"
      :background="background"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<style src="../style/index.scss" scoped lang="scss" />
