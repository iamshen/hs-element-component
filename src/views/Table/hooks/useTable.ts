import { ElMessage, ElText } from 'element-plus'
import type { PropType } from 'vue'
import { defineComponent, h, reactive, ref } from 'vue'
import type { LocationQuery } from 'vue-router'
import type { GetModulesRequestDto } from '../types'
import type { ColumnAction, ColumnTypeKeys, ResponseResult, RowCommand, TableColumnProps } from '~/components'
import { useQuery } from '~/hooks'

export default function useTable(query?: LocationQuery, _handleCommand?: (params: RowCommand) => void) {
  // Page requestModel
  const pageRequestModel = ref<GetModulesRequestDto>({
    pageIndex: 1,
    pageSize: 15,
    terminalCode: '',
  })

  // Pager Request
  async function pageRequestFn() {
    const { requestModel } = useQuery(pageRequestModel.value, query)

    // 将 query 对象转换为 URL 查询字符串
    const queryString = new URLSearchParams(requestModel as Record<string, string>).toString()

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
        reslove(responseResult.content)
      else
        reject(responseResult.description)
    })
  }

  const comp1 = defineComponent({
    props: {
      row: {
        type: Object as PropType<any | null>,
        default: () => null,
      },
    },
    setup(props) {
      const remark = props.row?.remark

      ElMessage({ message: remark, type: 'info' })

      return () => h('div', [
        // 使用 h 函数创建虚拟 DOM
        h('p', props.row?.remark),
      ])
    },
  })

  // Table Columns
  const columns = reactive<Array<TableColumnProps<ColumnTypeKeys>>>([
    {
      name: 'terminalName',
      label: '所属终端',
      columnType: 'LINK',
      propsFormatter: (_value: any, row: any) => ({
        type: 'primary',
        target: '_blank',
        href: `https://reverse.dunhuanggold.com/admin/terminal/terminal/list?terminalCode=${row.terminalCode}`,
      }),
    },
    {
      name: 'moduleCode',
      label: '模块编码',
      columnType: 'LINK',
      propsFormatter: (value: any, _row: any) => ({
        type: 'primary',
        target: '_blank',
        underline: false,
        href: `https://reverse.dunhuanggold.com/admin/terminal/terminal/modules?code=${value}`,
      }),
    },
    {
      name: 'moduleName',
      label: '模块名称',
      columnType: 'TEXT',
      title: (row: any) => {
        return `备用件： ${row.bakUpCount}`
      },
      propsFormatter: (_value: any, _row: any) => ({
        type: 'info',
      }),
    },
    {
      name: 'moduleTypeName',
      label: '模块类型',
      columnType: 'TAG',
      cellClass: (_value: any, _row: any) => 'my-custom-tag',
      propsFormatter: (_value: any, row: any) => {
        const typeColorMap: Record<number, string> = {
          0: 'var(--pink)',
          1: 'var(--blue)',
          2: 'var(--green)',
        }

        return {
          hit: true,
          type: 'info',
          effect: 'plain',
          color: typeColorMap[row.moduleType],
        }
      },
    },
    {
      name: 'moduleStatusName',
      label: '模块状态',
      columnType: 'TAG',
      propsFormatter: (_value: any, row: any) => ({
        size: 'default',
        type: row.moduleStatus === 0 ? 'success' : 'danger',
        effect: 'plain',
      }),
    },
    {
      name: 'firmwareTypeName',
      label: '固件类型',
      columnType: 'NESTED',
      children: [
        {
          name: 'softWareVersion',
          label: '软件版本',
          columnType: 'DYNAMIC',
          formatter: (_value: any, row: any) => {
            return h(ElText, { type: 'info' }, () => `${row.firmwareVersion.softWareVersion}`)
          },
        },
        {
          name: 'osVersion',
          label: '固件版本',
          columnType: 'DYNAMIC',
          formatter: (_value: any, row: any) => {
            return h(ElText, { type: 'info' }, () => `${row.firmwareVersion.softWareVersion}`)
          },
        },
      ],
    },
    {
      name: 'statics',
      label: '使用统计',
      columnType: 'NESTED',
      children: [
        {
          name: 'currentUseTimes',
          label: '当前用量',
          formatter: (_value: any, row: any) => row.currentUseTimes,
        },
        {
          name: 'maxUseTimes',
          label: '最大用量',
          formatter: (_value: any, row: any) => row.maxUseTimes,
        },
        {
          name: 'warningUseTimes',
          label: '告警阈值',
          formatter: (_value: any, row: any) => row.warningUseTimes,
        },
      ],
    },
    { name: 'updatedTime', label: '更新时间', columnType: 'TIMESTAMP' },
    {
      name: '操作',
      columnType: 'ACTION',
      width: 60,
      actions: (row: any) => {
        const actions: ColumnAction[] = []
        actions.push({ name: '修改状态', command: 'update-status', icon: 'Edit' })
        actions.push({ name: '重置使用', command: 'reset-module', icon: 'RefreshLeft' })
        actions.push({ name: '设置阈值', command: 'set-threshold', icon: 'BottomRight' })
        actions.push({ name: '修改备用数', command: 'set-threshold', icon: 'BottomRight' })
        actions.push({ name: '查看配置', command: 'set-threshold', icon: 'ChatRound' })
        actions.push({ name: '操作记录', command: 'set-threshold', icon: 'CaretLeft' })

        /** 自定义组件 */
        actions.push(
          {
            name: '自定义组件',
            command: 'comp-1',
            icon: 'Cherry',
            dynamicComponent: h(comp1, { row }),
          },
        )

        /** 自定义函数1 */
        actions.push(
          {
            name: '自定义函数1',
            command: 'fn-1',
            icon: 'Apple',
            dynamicComponent: () => {
              ElMessage({ message: '自定义函数1 bla bla bla...', type: 'warning' })
            },
          },
        )

        /** 自定义函数2 */
        actions.push(
          {
            name: '自定义函数2',
            command: 'fn-2',
            icon: 'Burger',
            dynamicComponent: () => {
              // eslint-disable-next-line no-console
              console.log('自定义函数2 bla bla bla...', row)
            },
          },
        )

        return actions
      },
    },
  ])

  return {
    pageRequestFn,
    pageRequestModel,
    columns,
  }
}
