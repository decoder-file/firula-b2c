import { CreditCard } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'

import Header from './components/Header'
import { EventCheckoutCreditCard } from './components/EventCheckoutCreditCard'
import { EventCheckoutPixForm } from './components/EventCheckoutPixForm'

import {
  EventType,
  getDetailsForCheckout,
  ticketTypes,
} from '../../../services/event'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card'
import { RadioGroup, RadioGroupItem } from '../../../components/ui/radio-group'
import { Label } from '../../../components/ui/label'

import ImagemMock from '../../../assets/mock/imagem-background.png'
import { ScreenLoading } from '../../../components/screen-loading'
import moment from 'moment'
import { formatCurrency } from '../../../utils/functions'
import { useUserStore } from '../../../store/UserStore'

export default function EventCheckoutPage() {
  const navigate = useNavigate()
  const { slug, eventId, ticketTypeId } = useParams()

  const { user } = useUserStore()

  const [paymentMethod, setPaymentMethod] = useState('pix')
  const [eventDetails, setEventDetails] = useState<EventType>()
  const [ticketTypeDetails, setTicketTypeDetails] = useState<ticketTypes>()
  const [loadingEventCheckout, setLoadingEventCheckout] = useState(true)

  const fetchCheckoutDetails = async () => {
    setLoadingEventCheckout(true)
    const response = await getDetailsForCheckout({
      eventId: eventId || '',
      ticketTypeId: ticketTypeId || '',
    })

    if (response.success === true && response.event && response.ticketType) {
      setEventDetails(response.event)
      setTicketTypeDetails(response.ticketType)
    }
    setLoadingEventCheckout(false)
  }

  const checksUserAlreadyLoggedIn = () => {
    if (!localStorage.getItem('token')) {
      navigate(`/evento/${slug}`)
      return
    }
    fetchCheckoutDetails()
  }

  useEffect(() => {
    checksUserAlreadyLoggedIn()
  }, [])

  return (
    <>
      <Helmet title="Checkout" />

      {loadingEventCheckout ? (
        <ScreenLoading />
      ) : (
        <>
          <Header />

          <div className="container mx-auto grid gap-6 p-4 md:grid-cols-[1fr,380px]">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-semibold text-primary">
                  Pagamento
                </h1>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <RadioGroup defaultValue="pix" className="space-y-4">
                    <div className="flex items-center space-x-2 rounded-lg border p-4">
                      <RadioGroupItem
                        value="pix"
                        id="pix"
                        onClick={() => setPaymentMethod('pix')}
                      />
                      <Label
                        htmlFor="pix"
                        className="flex cursor-pointer items-center gap-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="15"
                          height="15"
                          viewBox="0 0 48 48"
                        >
                          <path
                            fill="#4db6ac"
                            d="M11.9,12h-0.68l8.04-8.04c2.62-2.61,6.86-2.61,9.48,0L36.78,12H36.1c-1.6,0-3.11,0.62-4.24,1.76	l-6.8,6.77c-0.59,0.59-1.53,0.59-2.12,0l-6.8-6.77C15.01,12.62,13.5,12,11.9,12z"
                          ></path>
                          <path
                            fill="#4db6ac"
                            d="M36.1,36h0.68l-8.04,8.04c-2.62,2.61-6.86,2.61-9.48,0L11.22,36h0.68c1.6,0,3.11-0.62,4.24-1.76	l6.8-6.77c0.59-0.59,1.53-0.59,2.12,0l6.8,6.77C32.99,35.38,34.5,36,36.1,36z"
                          ></path>
                          <path
                            fill="#4db6ac"
                            d="M44.04,28.74L38.78,34H36.1c-1.07,0-2.07-0.42-2.83-1.17l-6.8-6.78c-1.36-1.36-3.58-1.36-4.94,0	l-6.8,6.78C13.97,33.58,12.97,34,11.9,34H9.22l-5.26-5.26c-2.61-2.62-2.61-6.86,0-9.48L9.22,14h2.68c1.07,0,2.07,0.42,2.83,1.17	l6.8,6.78c0.68,0.68,1.58,1.02,2.47,1.02s1.79-0.34,2.47-1.02l6.8-6.78C34.03,14.42,35.03,14,36.1,14h2.68l5.26,5.26	C46.65,21.88,46.65,26.12,44.04,28.74z"
                          ></path>
                        </svg>
                        <span>Pix</span>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 rounded-lg border p-4">
                      <RadioGroupItem
                        value="credit"
                        id="credit"
                        onClick={() => setPaymentMethod('credit')}
                      />
                      <Label
                        htmlFor="credit"
                        className="flex cursor-pointer items-center gap-2"
                      >
                        <CreditCard className="h-5 w-5" />
                        <span>Cartão de crédito</span>
                      </Label>
                    </div>

                    {/* implementar quando tiver a opção de boleto */}
                    {/* <div className="flex items-center space-x-2 rounded-lg border p-4">
                  <RadioGroupItem value="boleto" id="boleto" />
                  <Label
                    htmlFor="boleto"
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <Barcode className="h-5 w-5" />
                    <span>Boleto</span>
                  </Label>
                </div> */}
                  </RadioGroup>
                </CardContent>
              </Card>

              {paymentMethod === 'credit' && (
                <EventCheckoutCreditCard
                  eventId={eventId || ''}
                  ticketTypeId={ticketTypeId || ''}
                  userId={user.userId}
                />
              )}
              {paymentMethod === 'pix' && (
                <EventCheckoutPixForm
                  price={formatCurrency(ticketTypeDetails?.price || '')}
                  eventId={eventId || ''}
                  ticketTypeId={ticketTypeId || ''}
                  userId={user.userId}
                />
              )}
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <img
                      src={
                        eventDetails && eventDetails.imageUrl
                          ? `https://pub-ed847887b3d7415384bbf5488c674561.r2.dev/${eventDetails.imageUrl}`
                          : ImagemMock
                      }
                      alt="Event"
                      width={80}
                      height={80}
                      className="rounded-lg object-cover"
                    />
                    <div>
                      <h2 className="font-semibold text-primary">
                        {eventDetails?.title}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {moment(eventDetails?.date).format('DD [de] MMM')} as{' '}
                        {eventDetails?.startTime}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-primary">
                    Resumo do Pedido
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <div>
                      <span className="font-medium">1x</span>{' '}
                      {ticketTypeDetails?.title}
                    </div>
                    <span className="font-medium">
                      R$ {formatCurrency(ticketTypeDetails?.price || '')}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-4">
                    <span className="font-semibold text-primary">Total</span>
                    <span className="font-semibold">
                      R$ {formatCurrency(ticketTypeDetails?.price || '')}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </>
  )
}
