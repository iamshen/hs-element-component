import { withInstall } from 'element-plus/es/utils/vue/install'
import Table from './src/table.vue'

export const HsTable = withInstall(Table)
export default HsTable

export * from './src/types'

export type HsTableInstance = InstanceType<typeof Table>
