import type { LocationQuery } from 'vue-router'
import type { PageRequest } from '~/components'

/**
 *  合并 Query
 * @param routeQuery 动态查询的路由 Query
 * @param stateQuery 状态 Query
 * @returns
 */
export default function useQuery(stateQuery: PageRequest, routeQuery?: LocationQuery) {
  const requestModel = { ...stateQuery, ...routeQuery }

  return {
    requestModel,
  }
}
