import { toast } from 'sonner'

import api from '../../api'
import { BlockType } from './block-type'

export type GetBlockByIdRequestType = {
  blockId: string
}

export type GetBlockByIdResponseType = {
  data: {
    block: BlockType
  }
}

export type FetchBlockByIdResponseType = {
  block?: BlockType
  success: boolean
}

export const getBlockById = async ({
  blockId,
}: GetBlockByIdRequestType): Promise<FetchBlockByIdResponseType> => {
  try {
    const url = `/company-block?blockId=${blockId}`

    const response: GetBlockByIdResponseType = await api.get(url)

    return {
      block: response.data.block,
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
