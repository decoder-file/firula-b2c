import { toast } from 'sonner'

import api from '../../api'
import { BlockType } from './block-type'

export type GetBlockBySlugRequestType = {
  slug: string
  isActive?: boolean
}

export type GetBlockBySlugResponseType = {
  data: {
    block: BlockType[]
  }
}

export type FetchBlocksBySlugResponseType = {
  blocks?: BlockType[]
  success: boolean
}

export const getBlockBySlug = async ({
  slug,
  isActive,
}: GetBlockBySlugRequestType): Promise<FetchBlocksBySlugResponseType> => {
  try {
    let url = `/company-block/slug?slug=${slug}`

    if (isActive) url = url + '&isActive=true'

    const response: GetBlockBySlugResponseType = await api.get(url)

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
