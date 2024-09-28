import { useUserStore } from '../../store/UserStore'
import { AppointmentCard } from '../../components/appointment-card'

import { Helmet } from 'react-helmet-async'
import { getUserSchedule, GroupedSchedules } from '../../services/scheduling'
import { useEffect, useState } from 'react'
import moment from 'moment'
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
import { Skeleton } from '../../components/ui/skeleton'

export function MyAppointments() {
  const { user } = useUserStore()

  const [appointments, setAppointments] = useState<GroupedSchedules>()
  const [openDialog, setOpenDialog] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchAppointments = async () => {
    setLoading(true)
    const response = await getUserSchedule({ userId: user.userId })
    if (response.success) {
      setAppointments(response.scheduling)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  return (
    <>
      <Helmet title="Meus Agendamentos" />

      <div className="flex flex-col items-center px-4">
        <div className="mb-5 flex w-full max-w-2xl flex-col items-center">
          <div className="mt-4 flex w-full flex-col gap-4">
            {loading ? (
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ) : (
              <>
                {appointments && Object.keys(appointments).length > 0 ? (
                  Object.keys(appointments).map((date) => {
                    return (
                      <div
                        key={date}
                        className="w-full rounded-lg bg-gray-100 p-5"
                      >
                        <h1 className="mb-3 text-sm font-semibold text-slate-500">
                          {moment(date).format('DD/MM/YYYY')}
                          <span className="ml-1 rounded-sm bg-slate-200 p-1 text-sm font-normal text-slate-500">
                            {appointments[date].length}
                          </span>
                        </h1>
                        {appointments[date].map((appointment) => (
                          <AppointmentCard
                            key={appointment.id}
                            appointment={appointment}
                            onPressCanceled={() => setOpenDialog(true)}
                          />
                        ))}
                      </div>
                    )
                  })
                ) : (
                  <div className="w-full rounded-lg bg-gray-100 p-5">
                    <h1 className="text-sm font-semibold text-slate-500">
                      Nenhum agendamento encontrado
                    </h1>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <AlertDialog open={openDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Deseja cancelar esse agendamento?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Ao cancelar esse agendamento não será possível reverter essa ação
              e o horário ficará disponível para outros usuários. (O valor pago
              será devolvido em até 24h)
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => console.log('[] - TO_DO')}>
              Cancelar Agendamento
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
