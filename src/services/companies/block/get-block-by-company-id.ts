import { toast } from 'sonner'

import api from '../../api'
import { BlockType } from './block-type'

export type GetBlockByCompanyIdRequestType = {
  companyId: string
  isActive?: boolean
}

export type GetBlockByCompanyIdResponseType = {
  data: {
    block: BlockType[]
  }
}

export type FetchBlocksResponseType = {
  blocks?: BlockType[]
  success: boolean
}

export const getBlockByCompanyId = async ({
  companyId,
  isActive,
}: GetBlockByCompanyIdRequestType): Promise<FetchBlocksResponseType> => {
  try {
    let url = `/company-block/companyId?companyId=${companyId}`

    if (isActive) url = url + '&isActive=true'

    const response: GetBlockByCompanyIdResponseType = await api.get(url)

    console.log('response', response)

    return {
      blocks: response.data.block,
      success: true,
    }
  } catch (error) {
    toast.error(
      'Ocorreu um erro ao buscar dados da empresa, tente novamente mais tarde.',
    )
    return {
      success: false,
    }
  }
}
