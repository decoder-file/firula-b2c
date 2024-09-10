import { toast } from 'sonner'

import api from '../api'
import { AddressType } from './address/address.type'

export type CompanyType = {
  id: string
  name: string
  slug: string
  cpf_cnpj: string
  typeDocument: string
  mobilePhone: string
  imageUrl: string | null
  isActive: boolean
  isBlock: boolean
  userId: string
  companyAddress: AddressType[]
}

export type CompanyRequestType = {
  unblockedCompanies?: string
  activeCompanies?: string
  page: string
  nameQuery?: string
}

export type CompanyResponseType = {
  data: {
    company: CompanyType[] | []
    totalPages: number
  }
}

export type FetchAllCompanyResponseType = {
  company: CompanyType[]
  totalPages: number
}

export const fetchAllCompany = async ({
  unblockedCompanies,
  activeCompanies,
  page,
  nameQuery,
}: CompanyRequestType): Promise<FetchAllCompanyResponseType> => {
  try {
    let url = `company?page=${page}`

    if (unblockedCompanies) {
      url = `${url}&unblockedCompanies=${unblockedCompanies}`
    }

    if (activeCompanies) {
      url = `${url}&activeCompanies=${activeCompanies}`
    }

    if (nameQuery) {
      url = `${url}&nameQuery=${nameQuery}`
    }

    const response: CompanyResponseType = await api.get(url)

    console.log('response', response)

    return {
      company: response.data.company,
      totalPages: response.data.totalPages,
    }
  } catch (error) {
    toast.error(
      'Ocorreu um erro ao buscar as quadras cadastras, tente novamente mais tarde.',
    )
    return {
      company: [],
      totalPages: 0,
    }
  }
}
