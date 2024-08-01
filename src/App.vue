<!-- eslint-disable no-console -->
<script setup lang="ts" name="app">
import { h, onMounted, reactive, ref } from 'vue'
import { ElTag, ElText } from 'element-plus'
import HsTable from './components/HsTable'
import type { ColumnPropsAction, PageRequest, ResponseResult, RowCommand, TableColumnProps } from './components/HsTable/src/types'

const tableRef = ref<InstanceType<typeof HsTable>>()

interface GetModulesRequestDto extends PageRequest {
  terminalCode: string
}

const pageRequestModel: PageRequest = {
  pageIndex: 1,
  pageSize: 15,
}

async function pageRequestFn(query: PageRequest) {
  // 将 PageRequest 转换为 GetModulesRequestDto 类型，并添加 terminalCode
  const fullQuery: GetModulesRequestDto = {
    ...query,
    terminalCode: '864650050702106',
  }

  // 将 query 对象转换为 URL 查询字符串
  const queryString = new URLSearchParams(fullQuery as any).toString()

  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (reslove, reject) => {
    const myHeaders = new Headers()
    myHeaders.append('version', '1.0')

    const requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    }
    const requestUrl = `https://reverse.dunhuanggold.com/api/terminal/terminal/getModules?${queryString}`
    const responseResult: ResponseResult = await fetch(requestUrl, requestOptions).then(response => response.json()).catch(error => reject(error))
    if (responseResult.isSuccessful)
      reslove(responseResult.content!.data)
    else
      reject(responseResult.description)
  })
}

const currentCommand: RowCommand = reactive({
  name: null,
  row: null,
  key: 0,
})

/** 表格操作按钮 */
function handleCommand(params: any) {
  console.log('handleCommand>>>', params)
  const { command, item } = params
  currentCommand.name = command
  currentCommand.row = item
  currentCommand.key = (currentCommand.key || 0) + 1
}

/** 重置当前指令 */
// eslint-disable-next-line unused-imports/no-unused-vars
function handleResetCommand() {
  console.log('currentCommand has been reset>>>')
  currentCommand.name = null
  currentCommand.row = null
}

const columns = reactive<Array<TableColumnProps>>([
  {
    Name: 'terminalName',
    label: '所属终端',
    PropertyType: 'DYNAMIC',
    formatter: (value: any, _row: any) => {
      return h(ElText, { type: 'primary' }, () => value)
    },
  },
  {
    Name: 'moduleCode',
    label: '模块编码',
    PropertyType: 'TEXT',
    formatter: (_value: any, _row: any) => {
      const textOption: any = { type: 'warning', tag: 'ins' }
      return textOption
    },
  },
  {
    Name: 'moduleName',
    label: '模块名称',
    PropertyType: 'TEXT',
    formatter: (_value: any, _row: any) => {
      const textOption: any = { type: 'success', tag: 'b' }
      return textOption
    },
  },
  {
    Name: 'moduleTypeName',
    label: '模块类型',
    PropertyType: 'DYNAMIC',
    formatter: (value: any, _row: any) => {
      return h(ElTag, { type: 'info' }, () => value)
    },
  },
  { Name: 'moduleStatusName', label: '模块状态' },
  {
    Name: 'firmwareTypeName',
    label: '固件类型',
    PropertyType: 'DYNAMIC',
    formatter: (value: any, _row: any) => {
      return h(ElText, { type: 'info' }, () => value)
    },
  },
  { Name: 'updatedTime', label: '更新时间', PropertyType: 'TIMESTAMP' },
  {
    Name: '操作',
    PropertyType: 'ACTION',
    width: 60,
    actions: (_row: any) => {
      const actions: ColumnPropsAction[] = []
      actions.push({ name: '修改状态', command: 'update-status', icon: 'Edit' })
      actions.push({ name: '重置使用', command: 'reset-module', icon: 'RefreshLeft' })
      actions.push({ name: '设置阈值', command: 'set-threshold', icon: 'BottomRight' })
      actions.push({ name: '修改备用数', command: 'set-threshold', icon: 'BottomRight' })
      actions.push({ name: '查看配置', command: 'set-threshold', icon: 'ChatRound' })
      actions.push({ name: '操作记录', command: 'set-threshold', icon: 'CaretLeft' })
      return actions
    },
  },
])

// Table Query Data Async
function queryAsync() {
  tableRef.value?.queryAsync()
}

onMounted(() => {
  queryAsync()
})
</script>

<template>
  <main>
    <HsTable
      ref="tableRef"
      v-model:pageRequestModel="pageRequestModel"
      width="100vw"
      :page-request-fn="pageRequestFn"
      :columns="columns"
      :border="true"
      @handle-command="handleCommand"
    />
  </main>
</template>

<style scoped>
main {
  height: 100%;
  width: 80vw;
}
</style>
