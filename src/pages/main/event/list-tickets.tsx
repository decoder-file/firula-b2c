import { useEffect, useState } from 'react'
import {
  getTicketByUserId,
  Tickets,
} from '../../../services/event/get-tickets-by-user-id'
import { EventCard } from './components/TicketCard'
import { useUserStore } from '../../../store/UserStore'

export function ListTicketsPage() {
  const { user } = useUserStore()

  const [events, setEvents] = useState<Tickets[]>()
  const [loading, setLoading] = useState(true)

  const fetchTickets = async () => {
    setLoading(true)
    const response = await getTicketByUserId({ userId: user.userId || '' })

    if (response.success && response.tickets) {
      setEvents(response.tickets)
      console.log('######response.tickets', response.tickets)
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchTickets()
  }, [])

  return (
    <>
      {loading ? (
        <div className="py-12 text-center text-muted-foreground">
          Carregando...
        </div>
      ) : (
        <>
          {/* [] TO_DO: Implementar a listagem de eventos ativos e encerrados */}
          <div className="py-5">
            {/* <Tabs defaultValue="active" className="w-full">
        <TabsList className="h-auto w-full justify-start rounded-none border-b bg-transparent p-0">
          <TabsTrigger
            value="active"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Ativos
          </TabsTrigger>
          <TabsTrigger
            value="closed"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Encerrados
          </TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-6"> */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {events &&
                events.map((event) => (
                  <EventCard
                    key={event.id}
                    id={event.id}
                    address={`${event.event.street}, ${event.event.number} - ${event.event.neighborhood}, ${event.event.city} - ${event.event.state}, ${event.event.zipCode}`}
                    date={event.event.startDate}
                    image={event.event.imageUrl || ''}
                    time={event.event.startTime}
                    title={event.event.title}
                    location={event.event.city}
                    userEmail={event.user.email}
                    userName={event.user.name}
                    userCPF={event.user.cpf}
                  />
                ))}
            </div>
            {/* </TabsContent>
        <TabsContent value="closed">
          <div className="py-12 text-center text-muted-foreground">
            Nenhum evento encerrado
          </div>
        </TabsContent>
      </Tabs> */}
          </div>
        </>
      )}
    </>
  )
}
