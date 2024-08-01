// useActions.ts
import { defineAsyncComponent, markRaw, reactive } from 'vue'
import type { RowCommand } from '~/components'

export default function useActions(compNames: Record<string, () => Promise<any>>) {
  const currentCommand: RowCommand = reactive({
    name: undefined,
    row: undefined,
    key: 0,
    component: undefined,
  })

  /** 表格操作按钮 */
  const handleCommand = (params: RowCommand) => {
    const { row, name, dynamicComponent } = params
    currentCommand.name = name
    currentCommand.row = row
    currentCommand.dynamicComponent = dynamicComponent
    currentCommand.key = (currentCommand.key || 0) + 1
  }

  /** 重置当前指令 */
  const handleResetCommand = () => {
    currentCommand.name = undefined
    currentCommand.row = undefined
    currentCommand.dynamicComponent = undefined
  }

  const components: any = {}
  for (const k in compNames) {
    const name = k?.split('/')?.pop()?.replace('.vue', '')
    if (name) {
      const asyncComponent = defineAsyncComponent(compNames[k])
      components[name] = markRaw(asyncComponent)
    }
  }

  return {
    currentCommand,
    components,
    handleCommand,
    handleResetCommand,
  }
}
