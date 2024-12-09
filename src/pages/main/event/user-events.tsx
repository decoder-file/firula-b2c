import { useUserStore } from '../../../store/UserStore'

import { Helmet } from 'react-helmet-async'
import { DayUseType, listAllDayUseByUserId } from '../../../services/scheduling'
import { useEffect, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../../components/ui/alert-dialog'
import { Skeleton } from '../../../components/ui/skeleton'
import { DayUseCard } from '../../../components/day-use-card'

export function ListDayUse() {
  const { user } = useUserStore()

  const [dayUses, setDayUses] = useState<DayUseType[]>()
  const [openDialog, setOpenDialog] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchDayUses = async () => {
    setLoading(true)
    const response = await listAllDayUseByUserId({ userId: user.userId })
    if (response.success) {
      setDayUses(response.dayUseCheckIns)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchDayUses()
  }, [])

  return (
    <>
      <Helmet title="Meus Day Uses" />

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
                {dayUses ? (
                  dayUses.map((dayUse) => (
                    <DayUseCard key={dayUse.id} dayUse={dayUse} />
                  ))
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
