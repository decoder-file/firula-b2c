import { AddressType } from '../address/address.type'

export type OpeningHoursType = {
  id: string
  dayOfWeek: string
  startTime: string
  endTime: string
  active: boolean
  valueForHourDayUse: string
  dayUseActive: boolean
}

export type BlockType = {
  id: string
  name: string
  valueForHour: string
  imageUrl: string | null
  isActive: boolean
  sports: string[]
  createdAt: string
  updatedAt: string
  typeBlockId: string
  companyId: string
  openingHours: OpeningHoursType[]
  Company?: {
    companyAddress: AddressType[]
    name: string
  }
}
