/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '../api'
import { toast } from 'sonner'
import { SchedulingType } from './scheduling.type'
import moment from 'moment'

export type CreateSchedulingResponseType = {
  message?: string
  success: boolean
  pixQrCode?: string
}

export type CreateSchedulingResponseApiType = {
  data: {
    scheduling: SchedulingType
    pixQrCode?: string
  }
}

export type CreateSchedulingRequest = {
  date: string
  companyBlockId: string
  startTime: string
  endTime: string
  userId: string
}

export const createScheduling = async ({
  date,
  companyBlockId,
  startTime,
  endTime,
  userId,
}: CreateSchedulingRequest): Promise<CreateSchedulingResponseType> => {
  try {
    const formattedDate = moment(date, 'YYYY/MM/DD')
      .utc()
      .format('YYYY-MM-DDTHH:mm:ss[Z]')

    const data = {
      date: formattedDate,
      status: 'processing',
      paymentStatus: 'awaitingPayment',
      companyBlockId,
      userId,
      startTime,
      endTime,
    }

    const response: CreateSchedulingResponseApiType = await api.post(
      'scheduling',
      data,
    )

    console.log(response)

    toast.success('Agendamento realizado com sucesso!')
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
      'Ocorreu um erro ao tentar realizar o agendamento, tente novamente mais tarde.',
    )
    return {
      success: false,
    }
  }
}
