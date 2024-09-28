import { Clock, MapPin, MoreHorizontal } from 'lucide-react'

import { Badge } from '../components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu'
import { AppointmentType } from '../services/scheduling'
import moment from 'moment'

type AppointmentCardProps = {
  appointment: AppointmentType
  onPressCanceled?: () => void
}

export function AppointmentCard({
  appointment,
  onPressCanceled,
}: AppointmentCardProps) {
  const formattedStatus: Record<'confirmed' | 'canceled' | 'pending', string> =
    {
      confirmed: 'Confirmado',
      canceled: 'Cancelado',
      pending: 'Pendente',
    }
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-lg bg-white p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <div className="gap-2 md:flex">
            <h1 className="text-lg font-semibold">
              {appointment.companyBlock.name}
            </h1>
            <Badge
              variant={
                appointment.status === 'canceled' ? 'destructive' : 'default'
              }
              className={`${appointment.status === 'pending' && 'bg-yellow-500'}`}
            >
              {
                formattedStatus[
                  appointment.status as 'confirmed' | 'canceled' | 'pending'
                ]
              }
            </Badge>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
              <MoreHorizontal size={20} color="#17A34A" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" onClick={onPressCanceled}>
              <DropdownMenuItem>Cancelar agendamento</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-3 ">
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <p className="text-xs">
              {moment(appointment.date).format('DD/MM')} as{' '}
              {appointment.companyBlockHour?.startTime}
            </p>
          </div>
          <div className="flex items-center  gap-1">
            <MapPin size={16} />
            <p className="text-xs">
              {appointment.company?.companyAddress[0].street},
              {appointment.company?.companyAddress[0].number},{' '}
              {appointment.company?.companyAddress[0].neighborhood}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
