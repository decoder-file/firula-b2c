import { Button } from '../../../../components/ui/button'
import { Card, CardContent, CardHeader } from '../../../../components/ui/card'
import { Calendar, Eye, MapPin, Printer } from 'lucide-react'

import ImagemMock from '../../../../assets/mock/imagem-background.png'
import moment from 'moment'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../../components/ui/dialog'
import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { maskCPF } from '../../../../utils/Mask'

type TicketCardProps = {
  id: string
  title: string
  image: string
  date: Date
  time: string
  location: string
  address: string
  userName: string
  userEmail: string
  userCPF: string
}

export function EventCard({
  id,
  title,
  image,
  date,
  time,
  location,
  address,
  userName,
  userEmail,
  userCPF,
}: TicketCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex-shrink-0 p-0">
        <img
          src={
            image && image
              ? `https://pub-ed847887b3d7415384bbf5488c674561.r2.dev/${image}`
              : ImagemMock
          }
          alt={title}
          className="h-32 w-full rounded-t-lg object-cover"
        />
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>

        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <Calendar className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
            <div>
              <div>{moment(date).format('DD/MM/YYYY')}</div>
              <div className="text-xs text-muted-foreground">{time}</div>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
            <div>
              <div>{location}</div>
              <div className="text-xs text-muted-foreground">{address}</div>
            </div>
          </div>

          <div className="grid gap-1 pt-2">
            {/* <Button
              variant="outline"
              size="sm"
              className="justify-start text-xs"
            >
              <Printer className="mr-1 h-3 w-3" />
              IMPRIMIR INGRESSO
            </Button> */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-start text-xs"
                >
                  <Eye className="mr-1 h-3 w-3" />
                  VISUALIZAR INGRESSO
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Detalhes do Pedido</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <span className="font-semibold">Evento:</span>
                    <span className="col-span-3">{title}</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <span className="font-semibold">Data:</span>
                    <span className="col-span-3">
                      {moment(date).format('DD/MM/YYYY')} às {time}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <span className="font-semibold">Local:</span>
                    <span className="col-span-3">
                      {location}, {address}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <span className="font-semibold">Comprador:</span>
                    <span className="col-span-3">{userName}</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <span className="font-semibold">Email:</span>
                    <span className="col-span-3">{userEmail}</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <span className="font-semibold">CPF:</span>
                    <span className="col-span-3">{maskCPF(userCPF)}</span>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <QRCodeSVG value={id.toString()} size={128} />
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
