import { Share } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import Header from './components/Header'
import EventDetails from './components/EventDetails'
import TicketSelection from './components/TicketSelection'
import Footer from './components/Footer'

import ImagemMock from '../../../assets/mock/images-mock.jpeg'

export default function EventPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <div className="relative h-[600px] w-full">
          <img
            src={ImagemMock}
            alt="Réveillon WA 2025"
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transform">
            <Button className="bg-opacity-50 hover:bg-opacity-75">
              <Share className="mr-2 h-4 w-4" />
              COMPARTILHAR
            </Button>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 md:grid-cols-2">
            <EventDetails />
            <TicketSelection />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
