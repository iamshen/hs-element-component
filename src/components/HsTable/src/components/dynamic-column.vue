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

const dyncComponent = computed(() => {
  let template: any
  if (props.column.formatter) {
    template = props.column.formatter(props.row[props.column.Name], props.row) || ''
  }
  return {
    template,
    props: {
      data: props.row,
    },
    tip: props.row.$tipStr,
  }
})
</script>

<template>
  <el-tooltip v-if="dyncComponent.tip" class="box-item" effect="dark" :content="dyncComponent.tip" placement="top">
    <component :is="dyncComponent.template" v-bind="$props" :data="dyncComponent.props.data" />
  </el-tooltip>
  <component :is="dyncComponent.template" v-else v-bind="$props" :data="dyncComponent.props.data" />
</template>
