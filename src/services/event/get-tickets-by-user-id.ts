import api from '../api'
import { toast } from 'sonner'

export type Tickets = {
  id: string
  purchaseDate: Date
  paymentDate: Date | null
  status: string
  keyPix: string | null
  user: {
    id: string
    name: string
    email: string
    cpf: string
  }
  event: {
    id: string
    title: string
    description: string
    imageUrl: string | null
    startDate: Date
    startTime: string
    street: string
    number: string
    complement: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
  }
}

export type GetTicketsByUserIdResponseType = {
  data: {
    tickets: Tickets[]
  }
}

type GetTicketsByUserIdType = {
  success: boolean
  tickets?: Tickets[]
}

export type GetTicketsByUserIdRequest = {
  userId: string
}

export const getTicketByUserId = async ({
  userId,
}: GetTicketsByUserIdRequest): Promise<GetTicketsByUserIdType> => {
  try {
    const url = `/event/ticket/list-all-user?userId=${userId}`

    const response: GetTicketsByUserIdResponseType = await api.get(url)

    const { tickets } = response.data

    return {
      tickets,
      success: true,
    }
  } catch (error) {
    toast.error('Erro ao buscar o ingressos')
    return {
      success: false,
    }
  }
}
