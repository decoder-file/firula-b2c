import { Share } from 'lucide-react'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Header from './components/Header'
import EventDetails from './components/EventDetails'
import TicketSelection from './components/TicketSelection'
import Footer from './components/Footer'

import { Button } from '../../../components/ui/button'
import { ScreenLoading } from '../../../components/screen-loading'

import ImagemMock from '../../../assets/mock/imagem-background.png'
import {
  countsPageEvent,
  EventType,
  getEventBySlug,
} from '../../../services/event'
import { Helmet } from 'react-helmet-async'

export default function EventPage() {
  const { slug } = useParams()

  const [eventDetails, setEventDetails] = useState<EventType>()
  const [loadingEventDetails, setLoadingEventDetails] = useState(true)

  const renderEventDetails = async () => {
    setLoadingEventDetails(true)
    const response = await getEventBySlug({ slug: slug || '' })

    if (response.success && response.event) {
      setEventDetails(response.event)
    }

    await countsPageEvent({ slug: slug || '' })
    setLoadingEventDetails(false)
  }

  useEffect(() => {
    renderEventDetails()
  }, [])

  if (loadingEventDetails) {
    return <ScreenLoading />
  }

  const copyUrlEvent = () => {
    navigator.clipboard.writeText(window.location.href).then(
      () => {
        toast.success('Url do evento copiada para a área de transferência!')
      },
      () => {
        toast.error('Erro ao copiar url do evento!')
      },
    )
  }

  return (
    <>
      <Helmet title="Eventos" />

      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-grow">
          <div className="relative h-[600px] w-full">
            <img
              src={
                eventDetails && eventDetails.imageUrl
                  ? `https://pub-ed847887b3d7415384bbf5488c674561.r2.dev/${eventDetails.imageUrl}`
                  : ImagemMock
              }
              alt="Foto do evento"
              className="background-cover h-full w-full"
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transform">
              <Button
                className="bg-opacity-50 hover:bg-opacity-75"
                onClick={copyUrlEvent}
              >
                <Share className="mr-2 h-4 w-4" />
                COMPARTILHAR
              </Button>
            </div>
          </div>
          <div className="container mx-auto px-4 py-8">
            <div className="grid gap-8 md:grid-cols-2">
              <EventDetails
                title={eventDetails?.title || ''}
                startDate={eventDetails?.startDate.toString() || ''}
                startTime={eventDetails?.startTime || ''}
                description={eventDetails?.description || ''}
                location={`${eventDetails?.street}, ${eventDetails?.number} - ${eventDetails?.neighborhood}, ${eventDetails?.city} - ${eventDetails?.state}`}
              />
              <TicketSelection
                ticket={eventDetails?.ticketTypes || []}
                eventId={eventDetails?.id || ''}
                slug={slug || ''}
              />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
