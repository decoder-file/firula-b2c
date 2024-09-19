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
