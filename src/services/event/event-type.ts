export type ticketTypes = {
  id: string
  title: string
  description: string
  amount: number
  quantitySold: number
  price: string
  isActive: boolean
  startDate: Date
  endDate: Date
  endTime: string
  startTime: string
  createdAt: Date
  updatedAt: Date
  eventId: string
}

export type EventType = {
  id: string
  title: string
  description: string
  date: Date
  isActive: boolean
  imageUrl?: string
  slug: string
  startDate: Date
  startTime: string
  endDate: Date
  endTime: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  createdAt: Date
  updatedAt: Date
  companyId: string
  ticketTypes?: ticketTypes[]
}

export type Ticket = {
  id: string
  keyPix: string
  purchaseDate: string
  paymentDate: string | null
  status: string
  userId: string
  createdAt: string
  updatedAt: string
  eventId: string
  ticketTypeId: string
}
