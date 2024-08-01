<script setup lang="ts" name="app">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useTable } from './hooks'
import { useActions } from '~/hooks'
import { HsTable } from '~/components'

// Hooks Methods
const compNames = import.meta.glob('./components/*.vue')
const { currentCommand, components, handleCommand, handleResetCommand } = useActions(compNames)

// Table Ref
const table = ref<InstanceType<typeof HsTable>>()

// Route query
const query = useRoute().query

// Table Parameters
const { pageRequestModel, pageRequestFn, columns } = useTable(query, handleCommand)

// Table Query Data Async
const queryAsync = () => table.value?.queryAsync()

// Table Action Complete Handlers
function handleComplete(flag: any) {
  handleResetCommand()
  if (flag) {
    setTimeout(() => {
      queryAsync()
    }, 500)
  }
}

// Vue Hook
onMounted(() => {
  queryAsync()
})
</script>

<template>
  <div class="my-table-1-container">
    <HsTable
      ref="table"
      v-model="pageRequestModel"
      width="100vw"
      :page-request-fn="pageRequestFn"
      :columns="columns"
      :border="true"
      @handle-command="handleCommand"
    />
    <!-- dynamic component -->
    <template v-if="currentCommand.name && currentCommand.row ">
      <component
        :is="components[currentCommand.name] || currentCommand.dynamicComponent"
        :key="currentCommand.key"
        :row="currentCommand.row"
        @on-complete="handleComplete"
      />
    </template>
  </div>
</template>

<style src="./style/index.scss" scoped />
