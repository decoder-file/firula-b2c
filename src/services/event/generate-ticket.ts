/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '../api'
import { toast } from 'sonner'

export type GenerateTicketResponseType = {
  message?: string
  success: boolean
  pixQrCode?: string
  ticketId?: string
}

export type GenerateTicketResponseApiType = {
  data: {
    ticketId: string
    pixQrCode?: string
  }
}

export type GenerateTicketRequest = {
  userId: string
  eventId: string
  ticketTypeId: string
  paymentMethod: string
  creditCard?: {
    number: string
    name: string
    expirationDate: string
    cvv: string
  }
}

export const generateTicket = async ({
  userId,
  eventId,
  ticketTypeId,
  paymentMethod,
  creditCard,
}: GenerateTicketRequest): Promise<GenerateTicketResponseType> => {
  try {
    const data = {
      userId,
      eventId,
      ticketTypeId,
      paymentMethod,
      creditCard,
    }

    const response: GenerateTicketResponseApiType = await api.post(
      '/event/ticket',
      data,
    )

    toast.success('Pagamento gerado com sucesso!')
    return {
      success: true,
      pixQrCode: response.data.pixQrCode,
      ticketId: response.data.ticketId,
    }
  } catch (error: any) {
    if (error.statusCode === 409) {
      toast.error(error.message)
      return {
        success: false,
      }
    }
    toast.error(
      'Ocorreu um erro ao tentar gerar pagamento, tente novamente mais tarde.',
    )
    return {
      success: false,
    }
  }
}
