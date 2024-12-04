import api from '../api'
import { toast } from 'sonner'
import { Ticket } from './event-type'

export type GetTicketByIdResponseType = {
  data: {
    ticket: Ticket
  }
}

type GetTicketByIdType = {
  ticket?: Ticket
  success: boolean
}

export type GetTicketByIdRequest = {
  ticketId: string
}

export const getTicketById = async ({
  ticketId,
}: GetTicketByIdRequest): Promise<GetTicketByIdType> => {
  try {
    const url = `/event/ticket/by-id?ticketId=${ticketId}`

    const response: GetTicketByIdResponseType = await api.get(url)

    const { ticket } = response.data

    return {
      ticket,
      success: true,
    }
  } catch (error) {
    toast.error('Erro ao buscar o ingresso')
    return {
      success: false,
    }
  }
}
