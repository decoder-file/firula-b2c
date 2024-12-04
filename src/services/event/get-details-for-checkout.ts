import api from '../api'
import { toast } from 'sonner'
import { EventType, ticketTypes } from './event-type'

export type GetDetailsForCheckoutResponseType = {
  data: {
    event: EventType
    ticketType: ticketTypes
  }
}

type GetDetailsForCheckoutType = {
  event?: EventType
  ticketType?: ticketTypes
  success: boolean
}

export type GetDetailsForCheckoutRequest = {
  eventId: string
  ticketTypeId: string
}

export const getDetailsForCheckout = async ({
  eventId,
  ticketTypeId,
}: GetDetailsForCheckoutRequest): Promise<GetDetailsForCheckoutType> => {
  try {
    const url = `/event/checkout-details?eventId=${eventId}&ticketTypeId=${ticketTypeId}`

    const response: GetDetailsForCheckoutResponseType = await api.get(url)

    const { event, ticketType } = response.data

    return {
      event,
      ticketType,
      success: true,
    }
  } catch (error) {
    toast.error(
      'Ocorreu um erro ao buscar os detalhes do evento, tente novamente mais tarde',
    )
    return {
      success: false,
    }
  }
}
