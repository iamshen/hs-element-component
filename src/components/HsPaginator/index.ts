import { withInstall } from 'element-plus/es/utils/vue/install'

import Paginator from './src/paginator.vue'

export const HsPaginator = withInstall(Paginator)

export default HsPaginator

export type HsPaginatorInstance = InstanceType<typeof Paginator>
