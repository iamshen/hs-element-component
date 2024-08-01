import type { PageRequest } from '~/components'

export interface GetModulesRequestDto extends PageRequest {
  terminalCode: string
}
