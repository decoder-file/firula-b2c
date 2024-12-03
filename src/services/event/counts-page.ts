import api from '../api'

export type CountsPageEventResponseType = {
  data: {
    success: string
  }
}

export type CountsPageEventRequest = {
  slug: string
}

export const countsPageEvent = async ({ slug }: CountsPageEventRequest) => {
  try {
    const url = `/event/counts-page?slug=${slug}`

    await api.post(url)
  } catch (error) {
    console.log(error)
  }
}
