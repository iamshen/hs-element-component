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

const cellText = computed(() => {
  const value = props.row[props.column.Name]
  if (value === null || value === undefined || value === '') {
    return '--'
  }

  if (props.column.formatter) {
    return props.column.formatter(value, props.row)
  }

  return parseTime(value)
})

function parseTime(time: string | number | Date, cFormat: string = '{y}-{m}-{d} {h}:{i}:{s}'): string | null {
  if (!time) {
    return null
  }

  const format = cFormat
  let date: Date

  if (typeof time === 'object') {
    date = time
  }
  else {
    if (typeof time === 'string') {
      if (/^\d+$/.test(time)) {
        time = Number.parseInt(time)
      }
      else {
        time = time.replace(/-/g, '/')
      }
    }

    if (typeof time === 'number' && time.toString().length === 10) {
      time *= 1000
    }

    date = new Date(time)
  }

  // eslint-disable-next-line unicorn/prefer-number-properties
  if (isNaN(date.getTime())) {
    return null
  }

  const formatObj: Record<string, number | string> = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }

  const timeStr = format.replace(/\{([ymdhisa])+\}/g, (result, key) => {
    const value = formatObj[key]
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value as number]
    }
    return value.toString().padStart(2, '0')
  })

  return timeStr
}
</script>

<template>
  <div class="el-table-text-column date-time">
    {{ cellText }}
  </div>
</template>

<style lang="scss" scoped>
.el-table-text-column {

  font-size: 13px;
}
</style>
