import { toast } from 'sonner'

import api from '../api'
import { CompanyType } from './company-type'

export type GetCompanyBySlugRequestType = {
  slug: string
}

export type CompanyBySlugResponseType = {
  data: {
    company: CompanyType
  }
}

export type FetchGetCompanyBySlugResponseType = {
  company?: CompanyType
  success: boolean
}

export const getCompanyBySlug = async ({
  slug,
}: GetCompanyBySlugRequestType): Promise<FetchGetCompanyBySlugResponseType> => {
  try {
    const url = `/company/slug?slug=${slug}`

    const response: CompanyBySlugResponseType = await api.get(url)

    return {
      company: response.data.company,
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
