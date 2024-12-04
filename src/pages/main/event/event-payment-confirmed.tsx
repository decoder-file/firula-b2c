import { Card } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Calendar, CheckCircle2, Share2, CreditCard } from 'lucide-react'
import Header from './components/Header'

export default function EventPaymentConfirmed() {
  return (
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
              <span className="font-mono">2K5AV885491</span>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-gray-600">Método de pagamento</p>
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                <span>Cartão de crédito</span>
              </div>
            </div>
          </div>

          {/* Event Card */}
          <Card className="space-y-6 p-6">
            <div className="flex gap-6">
              <div className="h-32 w-48 overflow-hidden rounded-lg bg-black">
                <img
                  src="/placeholder.svg?height=128&width=192"
                  alt="Event banner"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 space-y-4">
                <h2 className="text-2xl font-bold">EMBOSCADA</h2>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-5 w-5" />
                    <span>6 dez - 2024 • 23:30 {'>'} 7 dez - 2024 • 05:30</span>
                  </div>
                  <p className="text-gray-600">
                    Evento presencial em{' '}
                    <span className="text-blue-500">
                      BOSQ CLUB, Montes Claros - MG
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button className="flex-1" size="lg">
                VER INGRESSOS
              </Button>
              <Button variant="outline" className="flex-1" size="lg">
                ADICIONAR AO CALENDÁRIO
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="h-5 w-5" />
                <span className="sr-only">Compartilhar</span>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
