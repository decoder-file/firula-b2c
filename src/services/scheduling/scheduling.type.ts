import { AddressType } from '../companies/address/address.type'
import { BlockType } from '../companies/block'

export type SchedulingType = {
  id: string
  date: string
  status: string
  paymentStatus: string
  created_at: string
  updated_at: string
  companyId: string
  companyBlockId: string
  companyBlockHourId: string
  userId: string
}

export type AppointmentType = {
  id: string
  date: string
  status: string
  paymentStatus: string
  created_at: string
  updated_at: string
  companyId: string
  companyBlockId: string
  companyBlockHourId: string
  userId: string
  companyBlock: BlockType
  company?: {
    companyAddress: AddressType[]
  }
  companyBlockHour?: {
    startTime: string
    endTime: string
  }
}
