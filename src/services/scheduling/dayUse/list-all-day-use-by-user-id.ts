import api from '../../api'
import { toast } from 'sonner'
import { DayUseType } from '.'

export type ListAllDayUseByUserIdApiResponse = {
  data: {
    dayUseCheckIns: DayUseType[]
  }
}

type ListAllDayUseByUserIdResponse = {
  dayUseCheckIns?: DayUseType[]
  success?: boolean
}

export type ListAllDayUseByUserIdRequest = {
  userId: string
}

export const listAllDayUseByUserId = async ({
  userId,
}: ListAllDayUseByUserIdRequest): Promise<ListAllDayUseByUserIdResponse> => {
  try {
    const url = `/scheduling/day-use-check-in/user?userId=${userId}`

    const response: ListAllDayUseByUserIdApiResponse = await api.get(url)

    const { dayUseCheckIns } = response.data

    return {
      dayUseCheckIns,
      success: true,
    }
  } catch (error) {
    toast.error(
      'Ocorreu um erro ao buscar seus day uses. Por favor, tente novamente.',
    )
    return {
      success: false,
    }
  }
}
