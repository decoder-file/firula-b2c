import api from '../../api'
import { toast } from 'sonner'

export type GetValueForDayUseApiResponse = {
  data: {
    valueForHourDayUse: string
  }
}

type GetValueForDayUseResponse = {
  valueForDayUse?: string
  success?: boolean
}

export type GetValueForDayUseRequest = {
  blockId: string
  date: string
}

export const getValueForDayUse = async ({
  blockId,
  date,
}: GetValueForDayUseRequest): Promise<GetValueForDayUseResponse> => {
  try {
    const dateCurrent = new Date(date)
    const formattedDate = `${String(dateCurrent.getDate()).padStart(2, '0')}/${String(dateCurrent.getMonth() + 1).padStart(2, '0')}/${dateCurrent.getFullYear()}`

    const url = `/company-block/available-day-use?date=${encodeURIComponent(formattedDate)}&blockId=${blockId}`

    const response: GetValueForDayUseApiResponse = await api.get(url)

    const { valueForHourDayUse } = response.data

    return {
      valueForDayUse: valueForHourDayUse,
      success: true,
    }
  } catch (error) {
    toast.error(
      'Ocorreu um erro ao buscar o valor do day use. Por favor, tente novamente.',
    )
    return {
      success: false,
    }
  }
}
