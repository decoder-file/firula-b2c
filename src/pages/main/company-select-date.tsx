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
import { formatStringCapitalized } from '../../utils/functions'
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
  const [valueForHour, setValueForHour] = useState<string>('')

  const fetchAvailableTime = async () => {
    const dateString = moment(date, 'ddd MMM DD YYYY HH:mm:ss ZZ').format(
      'DD/MM/YYYY',
    )
    const response = await getAvailableTime({
      date: dateString,
      blockId: blockId ?? '',
    })

    if (response) {
      if (response.typeError === 'closedCompany') {
        setAvailableCourt(false)
        setLoading(false)

        return
      }
      setValueForHour(response.valueForHour ?? '')
      setAvailableCourt(true)
      setDateAvailable(response.courtTimes)
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
    })

    navigate(`/quadras/${slug}/${blockId}/confirmar-agendamento`)
  }

  const handleSignIn = () => {
    setRouterName(`/quadras/decoder-file/${blockId}`)

    navigate('/sign-in')
  }

  useEffect(() => {
    fetchAvailableTime()
  }, [date])

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
          <h1 className="text-xl font-semibold ">Selecione a data e horário</h1>
          <h4 className="mt-1 text-sm font-light text-black">
            Reservas são para uma única data.
          </h4>
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
                            R$ {valueForHour}
                          </p>
                        </Button>
                      ))}
                    </div>
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
