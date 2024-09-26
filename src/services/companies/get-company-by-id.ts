import { toast } from 'sonner'

import api from '../api'
import { CompanyType } from './company-type'

export type GetCompanyByIdRequestType = {
  companyId: string
}

export type CompanyByIdResponseType = {
  data: {
    company: CompanyType
  }
}

export type FetchGetCompanyByIdResponseType = {
  company?: CompanyType
  success: boolean
}

export const getCompanyById = async ({
  companyId,
}: GetCompanyByIdRequestType): Promise<FetchGetCompanyByIdResponseType> => {
  try {
    const url = `/company/companyId?companyId=${companyId}`

    const response: CompanyByIdResponseType = await api.get(url)

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
