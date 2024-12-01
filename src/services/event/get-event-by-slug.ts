import api from '../api'
import { toast } from 'sonner'
import { EventType } from './event-type'

export type GetUserScheduleResponseType = {
  data: {
    event: EventType
  }
}

type GetEventBySlugType = {
  event?: EventType
  success?: boolean
}

export type GetEventBySlugRequest = {
  slug: string
}

export const getEventBySlug = async ({
  slug,
}: GetEventBySlugRequest): Promise<GetEventBySlugType> => {
  try {
    const url = `/event/by-slug?slug=${slug}`

    const response: GetUserScheduleResponseType = await api.get(url)

    const { event } = response.data

    return {
      event,
      success: true,
    }
  } catch (error) {
    toast.error('Ocorreu um erro ao buscar o evento, por favor tente novamente')
    return {
      success: false,
    }
  }
}
