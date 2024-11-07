/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '../api'
import { toast } from 'sonner'
import moment from 'moment'

export type CreateDayUseCheckInResponseType = {
  message?: string
  success: boolean
  pixQrCode?: string
}

export type CreateDayUseCheckInResponseApiType = {
  data: {
    checkInId: string
    pixQrCode?: string
  }
}

export type CreateDayUseCheckInRequest = {
  date: string
  companyBlockId: string
  userId: string
}

export const createDayUseCheckIn = async ({
  date,
  companyBlockId,
  userId,
}: CreateDayUseCheckInRequest): Promise<CreateDayUseCheckInResponseType> => {
  try {
    const formattedDate = moment(date, 'YYYY/MM/DD')
      .utc()
      .format('YYYY-MM-DDTHH:mm:ss[Z]')

    const data = {
      date: formattedDate,
      companyBlockId,
      userId,
    }

    const response: CreateDayUseCheckInResponseApiType = await api.post(
      '/scheduling/day-use-check-in',
      data,
    )

    console.log(response)

    toast.success('Para confirmar o day use, realize o pagamento do PIX.')
    return {
      success: true,
      pixQrCode: response.data.pixQrCode,
    }
  } catch (error: any) {
    if (error.statusCode === 409) {
      toast.error(error.message)
      return {
        success: false,
      }
    }
    toast.error(
      'Ocorreu um erro ao tentar realizar a reserva do day use, tente novamente mais tarde.',
    )
    return {
      success: false,
    }
  }
}
