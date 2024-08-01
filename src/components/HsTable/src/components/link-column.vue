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

const isHyperlink = computed(() => {
  const href = props.row[props.column.Name]
  return !!(href && !href.startsWith('http'))
})

const cellText = computed(() => {
  const textValue = props.row[props.column.Name]
  // console.log(props.row, props.column.propertyName, res)
  if (textValue === null || textValue === undefined || textValue === '') {
    return '--'
  }
  if (props.column.title) {
    return props.column.title instanceof Function ? props.column.title(props.row) : props.column.title
  }
  return props.row[props.column.Name]
})

const linkRoute = computed(() => {
  return props.column.formatter!(props.row[props.column.Name], props.row)
})
</script>

<template>
  <div class="el-table-text-column">
    <template v-if="props.column.formatter">
      <router-link
        v-if="isHyperlink" class="el-link el-link--primary is-underline"
        :title="cellText"
        :to="linkRoute"
        replace
      >
        {{ cellText }}
      </router-link>
      <el-link v-else :href="linkRoute || ''" :title="cellText" target="_blank" type="primary">
        {{ cellText }}
      </el-link>
    </template>
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
