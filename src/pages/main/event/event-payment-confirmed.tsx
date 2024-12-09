import { Calendar, CheckCircle2, Share2 } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { Card } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import ImagemMock from '../../../assets/mock/imagem-background.png'

import Header from './components/Header'

import { EventType, getTicketById, Ticket } from '../../../services/event'
import { ScreenLoading } from '../../../components/screen-loading'

export default function EventPaymentConfirmed() {
  const { ticketId } = useParams()

  const [ticket, setTicket] = useState<Ticket>()
  const [eventDetails, setEventDetails] = useState<EventType>()

  const [loadingTicketDetails, setLoadingTicketDetails] = useState(true)

  const fetchTicketDetails = async () => {
    setLoadingTicketDetails(true)
    const response = await getTicketById({ ticketId: ticketId || '' })

    if (response.success) {
      setTicket(response.ticket)
      setEventDetails(response.ticket?.event)
    }
    setLoadingTicketDetails(false)
  }

  useEffect(() => {
    fetchTicketDetails()
  }, [ticketId])

  return (
    <>
      {loadingTicketDetails ? (
        <ScreenLoading />
      ) : (
        <>
          <Header />

          <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="mx-auto max-w-3xl space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-primary">
                  Pedido efetuado com sucesso!
                </h1>
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="h-6 w-6" />
                  <span className="font-medium">Confirmado</span>
                </div>
              </div>

              {/* Order Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="font-medium">Nº DO PEDIDO</span>
                  <span className="font-mono">{ticket?.id}</span>
                </div>
              </div>

              {/* Event Card */}
              <Card className="space-y-6 p-6">
                <div className="flex gap-6">
                  <div className="h-32 w-48 overflow-hidden rounded-lg bg-black">
                    <img
                      src={
                        eventDetails && eventDetails.imageUrl
                          ? `https://pub-ed847887b3d7415384bbf5488c674561.r2.dev/${eventDetails.imageUrl}`
                          : ImagemMock
                      }
                      alt="Foto do evento"
                      className="background-cover h-full w-full"
                    />
                  </div>
                  <div className="flex-1 space-y-4">
                    <h2 className="text-2xl font-bold">
                      {eventDetails?.title}
                    </h2>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-5 w-5" />
                        <span>
                          6 dez - 2024 • 23:30 {'>'} 7 dez - 2024 • 05:30
                        </span>
                      </div>
                      <p className="text-gray-600">
                        Localização:{' '}
                        <span className="text-blue-500">
                          {`${eventDetails?.street}, ${eventDetails?.number} - ${eventDetails?.neighborhood}, ${eventDetails?.city} - ${eventDetails?.state}`}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button className="flex-1" size="lg">
                    VER INGRESSOS
                  </Button>
                  {/* <Button variant="outline" className="flex-1" size="lg">
                    ADICIONAR AO CALENDÁRIO
                  </Button> */}
                  <Button variant="outline" size="lg">
                    <Share2 className="h-5 w-5" />
                    <span className="sr-only">Compartilhar</span>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </>
      )}
    </>
  )
}
