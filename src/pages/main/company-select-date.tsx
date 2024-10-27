import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import moment from 'moment'
import { useNavigate, useParams } from 'react-router-dom'

import { Separator } from '../../components/ui/separator'
import { Button } from '../../components/ui/button'
import { Calendar } from '../../components/ui/calendar'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../components/ui/alert-dialog'
import { formatCurrency, formatStringCapitalized } from '../../utils/functions'
import {
  AvailableTimeType,
  getAvailableTime,
} from '../../services/companies/block/available-time'
import { useSchedulingStore } from '../../store/SchedulingStore'
import { useRouterStore } from '../../store/UserRouter'

export function CompanySelectDate() {
  const { setScheduling, scheduling } = useSchedulingStore()
  const { setRouterName } = useRouterStore()

  const navigate = useNavigate()
  const { blockId, slug } = useParams()

  const [openDialog, setOpenDialog] = useState(false)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [loading, setLoading] = useState(true)
  const [dateAvailable, setDateAvailable] = useState<AvailableTimeType[]>()
  const [availableCourt, setAvailableCourt] = useState<boolean>(false)
  const [activeDayUse, setActiveDayUse] = useState<boolean>(false)
  const [valueForHourDayUse, setValueForHourDayUse] = useState<string>('')
  const [durationSelection, setDurationSelection] = useState<string>('1')

  const fetchAvailableTime = async () => {
    const dateString = moment(date, 'ddd MMM DD YYYY HH:mm:ss ZZ').format(
      'DD/MM/YYYY',
    )
    const response = await getAvailableTime({
      date: dateString,
      blockId: blockId ?? '',
      duration: durationSelection,
    })

    if (response) {
      if (response.typeError === 'closedCompany') {
        setAvailableCourt(false)
        setLoading(false)

        return
      }
      setAvailableCourt(true)
      setDateAvailable(response.courtTimes)
      setActiveDayUse(response.dayUseActive ?? false)
      setValueForHourDayUse(response.valueForHourDayUse ?? '')
    }
    setLoading(false)
  }

  const handleSelectHour = (time: string) => {
    if (!localStorage.getItem('token')) {
      setOpenDialog(true)
      return
    }
    setScheduling({
      ...scheduling,
      hour: time,
      date: moment(date).format('YYYY-MM-DD'),
      isDayUse: false,
      duration: durationSelection,
    })

    navigate(`/quadras/${slug}/${blockId}/confirmar-agendamento`)
  }

  const handleSelectDayUse = () => {
    if (!localStorage.getItem('token')) {
      setOpenDialog(true)
      return
    }
    setScheduling({
      ...scheduling,
      hour: '',
      date: moment(date).format('YYYY-MM-DD'),
      isDayUse: true,
    })

    navigate(`/quadras/${slug}/${blockId}/confirmar-agendamento`)
  }

  const handleSignIn = () => {
    setRouterName(`/quadras/decoder-file/${blockId}`)

    navigate('/sign-in')
  }

  useEffect(() => {
    fetchAvailableTime()
  }, [date, durationSelection])

  const footerCalendar = () => {
    return (
      <p className="mt-1 text-justify text-xs font-light opacity-50">
        Só é possível realizar reservas avulsas para até 15 dias a partir da
        data atual. Aguarde para datas futuras.
      </p>
    )
  }

  return (
    <>
      <Helmet title="Info" />

      <div className="flex w-full max-w-7xl items-center px-4">
        <div className="mb-5 mt-10 flex w-full flex-col max-sm:items-center">
          <h1 className="text-lg font-semibold">Selecione a data e horário</h1>
          <h4 className="mt-1 text-sm font-light text-black">
            Reservas são para uma única data.
          </h4>

          <div>
            <p className="mt-3 text-base font-semibold">Duração</p>
            <div className="flex gap-1">
              <div
                className={`w-8 cursor-pointer rounded-sm  ${durationSelection === '1' ? 'bg-primary' : 'bg-zinc-200'} pb-1 pt-1`}
                onClick={() => setDurationSelection('1')}
              >
                <p className="text-center text-xs font-semibold text-white">
                  1h
                </p>
              </div>
              <div
                className={`w-8 cursor-pointer rounded-sm ${durationSelection === '2' ? 'bg-primary' : 'bg-zinc-200'} pb-1 pt-1`}
                onClick={() => setDurationSelection('2')}
              >
                <p className="text-center text-xs font-semibold text-white">
                  2h
                </p>
              </div>
            </div>
          </div>
          {!loading ? (
            <div className="mt-6 h-full sm:flex">
              <div className="flex flex-col items-center rounded-2xl bg-zinc-200 p-3 sm:max-w-80">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                  footer={footerCalendar()}
                  disabled={(date) =>
                    date < moment().subtract(1, 'day').toDate()
                  }
                  initialFocus
                  lang="pt"
                />
              </div>
              <div className="flex w-full flex-col justify-between  sm:ml-4">
                <div>
                  <Separator className="my-2" />

                  <h1 className="mb-2 text-xl font-semibold text-black">
                    {formatStringCapitalized(
                      moment(date).format('dddd, DD/MMM'),
                    )}
                  </h1>

                  {availableCourt ? (
                    <>
                      {activeDayUse ? (
                        <div className="grid h-full max-w-full items-center justify-center gap-2 text-center">
                          <div className="w-full">
                            <p className="mb-3 w-full">
                              Essa quadra está disponível para DayUse no dia{' '}
                              {formatStringCapitalized(
                                moment(date).format('DD/MM'),
                              )}
                            </p>

                            <p>R$ {formatCurrency(valueForHourDayUse)}</p>
                            <Button
                              type="submit"
                              className="w-full"
                              onClick={handleSelectDayUse}
                            >
                              Reservar DayUse
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="mb-2 w-full max-w-full items-center justify-center gap-2 sm:grid sm:grid-cols-5">
                          {dateAvailable?.map((e) => (
                            <Button
                              key={e.hour}
                              className={`mb-2 items-center justify-center rounded-2xl p-4 max-sm:w-full max-sm:justify-between sm:flex sm:h-20 sm:flex-col ${
                                e.status === 'busy'
                                  ? 'bg-gray-400 text-gray-500'
                                  : 'bg-primary text-white'
                              }`}
                              onClick={() => handleSelectHour(e.hour)}
                              disabled={e.status !== 'available'}
                            >
                              <p className="text-sm font-semibold text-white">
                                {e.hour}
                              </p>
                              <Separator className="my-2 hidden md:block" />
                              <p className="text-sm font-light text-white">
                                R$ {formatCurrency(e.price)}
                              </p>
                            </Button>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="grid h-full max-w-full items-center justify-center gap-2 text-center">
                      <div className="w-full">
                        <p className="w-full">
                          Quadra não disponível no dia{' '}
                          {formatStringCapitalized(
                            moment(date).format('DD/MM'),
                          )}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p>Carregando...</p>
          )}
        </div>
      </div>

      <AlertDialog open={openDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Necessário realizar login</AlertDialogTitle>
            <AlertDialogDescription>
              Para realizar um agendamento é necessário está logado, deseja
              realizar o login?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleSignIn}>Entrar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
