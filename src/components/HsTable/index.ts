import { withInstall } from 'element-plus/es/utils/vue/install'
import table from './src/table.vue'

export const HsTable = withInstall(table)

export default HsTable

export type HsTableInstance = InstanceType<typeof table>
