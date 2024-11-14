import { Calendar, MoreHorizontal } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu'
import { Badge } from '../components/ui/badge'
import { DayUseType } from '../services/scheduling'
import moment from 'moment'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { useState } from 'react'
import { DialogClose } from '@radix-ui/react-dialog'

type AppointmentCardProps = {
  dayUse: DayUseType
}

const DialogDayUse = ({
  isOpen,
  onClose,
  dayUse,
}: {
  isOpen: boolean
  onClose: () => void
  dayUse: DayUseType
}) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalhes do Day Use</DialogTitle>
          <DialogDescription>
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="flex gap-2">
                <div className="gap-2 md:flex">
                  <h1 className="text-lg font-semibold">Bloco 1</h1>
                  <Badge variant="default" className="bg-yellow-500">
                    Aguardando pagamento
                  </Badge>
                </div>
              </div>
              <QRCodeSVG value={dayUse.id} />
              <div>
                <p className="text-xs font-light opacity-50">
                  Nome: {dayUse.userName}
                </p>
                <p className="text-xs font-light opacity-50">
                  CPF: {dayUse.userDocument}
                </p>
                <p className="text-xs font-light opacity-50">
                  Email: {dayUse.userEmail}
                </p>
                <p className="text-xs font-light opacity-50">
                  Data da reserva: {moment(dayUse.date).format('DD/MM')}
                </p>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogClose onClick={onClose}>
          <button>Fechar</button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export function DayUseCard({ dayUse }: AppointmentCardProps) {
  const [openDialog, setOpenDialog] = useState(false)

  const formattedStatus: Record<'paid' | 'pending', string> = {
    paid: 'Pagamento confirmado',
    pending: 'Aguardando pagamento',
  }

  const handleDayUseDetails = () => {
    setOpenDialog(!openDialog)
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="rounded-lg bg-slate-50 p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="gap-2 md:flex">
              <h1 className="text-lg font-semibold">{dayUse.blockName}</h1>

              {dayUse.statusPayment.toLocaleLowerCase() === 'pending' && (
                <Badge
                  variant={
                    dayUse.statusPayment.toLocaleLowerCase() === 'pending'
                      ? 'destructive'
                      : 'default'
                  }
                  className={`${
                    dayUse.statusPayment.toLocaleLowerCase() === 'pending' &&
                    'bg-yellow-500'
                  } ${dayUse.statusPayment.toLocaleLowerCase() === 'paid' && 'bg-green-500'}`}
                >
                  {
                    formattedStatus[
                      dayUse.statusPayment.toLocaleLowerCase() as
                        | 'paid'
                        | 'pending'
                    ]
                  }
                </Badge>
              )}
              {dayUse.statusCheckIn === 'CONFIRMED' && (
                <Badge variant="default">Check-in confirmado</Badge>
              )}
            </div>
            {dayUse.statusCheckIn !== 'CONFIRMED' && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="cursor-pointer">
                  <MoreHorizontal size={20} color="#17A34A" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleDayUseDetails}>
                    Detalhes do DayUse
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          <p className="mb-2 mt-2 text-xs font-light opacity-50">
            {dayUse.blockName}
          </p>

          <div className="flex items-center gap-3 ">
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <p className="text-xs">{moment(dayUse.date).format('DD/MM')}</p>
            </div>
          </div>
        </div>
      </div>
      <DialogDayUse
        isOpen={openDialog}
        onClose={handleDayUseDetails}
        dayUse={dayUse}
      />
    </>
  )
}
