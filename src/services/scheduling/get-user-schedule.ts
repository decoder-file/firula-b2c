import api from '../api'
import { toast } from 'sonner'
import { AppointmentType } from './scheduling.type'

export type GroupedSchedules = {
  [key: string]: AppointmentType[]
}

export type GetUserScheduleResponseType = {
  data: {
    scheduling: GroupedSchedules
  }
}

type GetUserScheduleType = {
  scheduling?: GroupedSchedules
  success?: boolean
}

export type GetUserScheduleRequest = {
  userId: string
}

export const getUserSchedule = async ({
  userId,
}: GetUserScheduleRequest): Promise<GetUserScheduleType> => {
  try {
    const url = `/scheduling/user?userId=${userId}&page=1`

    const response: GetUserScheduleResponseType = await api.get(url)

    const { scheduling } = response.data

    return {
      scheduling,
      success: true,
    }
  } catch (error) {
    toast.error(
      'Ocorreu um erro ao buscar seus agendamentos. Por favor, tente novamente.',
    )
    return {
      success: false,
    }
  }
}
