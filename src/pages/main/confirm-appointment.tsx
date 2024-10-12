import { Button } from '../../components/ui/button'
import { Separator } from '../../components/ui/separator'
import { Helmet } from 'react-helmet-async'

import { useState, useEffect } from 'react'
import { useSchedulingStore } from '../../store/SchedulingStore'
import moment from 'moment'
import { formatStringCapitalized } from '../../utils/functions'
import { ScreenLoading } from '../../components/screen-loading'
import { CreditCardForm } from '../../components/confirm-appointment/creditCardForm'
import { PixForm } from '../../components/confirm-appointment/pixForm'
import { useNavigate, useParams } from 'react-router-dom'
import {
  BlockType,
  getBlockById,
  OpeningHoursType,
} from '../../services/companies/block'

const daysOfWeekMock = {
  domingo: 'sunday',
  'segunda-feira': 'monday',
  'terça-feira': 'tuesday',
  'quarta-feira': 'wednesday',
  'quinta-feira': 'thursday',
  'sexta-feira': 'friday',
  sábado: 'saturday',
}

const paymentMethod = [
  {
    id: 1,
    name: 'Pagar com Pix',
    type: 'pix',
  },
  {
    id: 2,
    name: 'Pagar com Cartão de Credito',
    type: 'credit-card',
  },
]

export function ConfirmAppointment() {
  const { blockId, slug } = useParams()
  const navigate = useNavigate()

  const { scheduling } = useSchedulingStore()

  const [loadingPayment, setLoadingPayment] = useState(false)
  const [paymentMethodSelected, setPaymentMethodSelected] = useState('')
  const [blockInfo, setBlockInfo] = useState<BlockType>()
  const [loadingBlockInfo, setLoadingBlockInfo] = useState(true)
  const [openingHours, setOpeningHours] = useState<OpeningHoursType>()

  const hourFish = moment(scheduling.hour, 'HH:mm').add(1, 'hours')

  const fetchBlockById = async () => {
    setLoadingBlockInfo(true)
    const response = await getBlockById({ blockId: blockId ?? '' })
    if (response.success) {
      setBlockInfo(response.block)

      const openingHours = response.block?.openingHours.find(
        (hour) =>
          hour.dayOfWeek ===
          daysOfWeekMock[
            moment(scheduling.date).format(
              'dddd',
            ) as keyof typeof daysOfWeekMock
          ],
      )

      setOpeningHours(openingHours)
    }
    setLoadingBlockInfo(false)
  }

  const renderPaymentMethod = () => {
    if (paymentMethodSelected === 'pix') {
      return (
        <PixForm
          paymentMethodSelected={paymentMethodSelected}
          setLoadingPayment={setLoadingPayment}
          price={
            scheduling.isDayUse
              ? openingHours?.valueForHourDayUse
              : blockInfo?.valueForHour
          }
        />
      )
    }

    if (paymentMethodSelected === 'credit-card') {
      return (
        <CreditCardForm
          price={blockInfo?.valueForHour}
          paymentMethodSelected={paymentMethodSelected}
          setLoadingPayment={setLoadingPayment}
        />
      )
    }
  }

  useEffect(() => {
    fetchBlockById()
  }, [blockId])

  return (
    <>
      <Helmet title="Agendamento" />
      {loadingPayment || loadingBlockInfo ? (
        <ScreenLoading />
      ) : (
        <>
          <div className="flex flex-col items-center px-4">
            <div className="mb-7 flex w-full max-w-5xl flex-col items-center">
              <div>
                <h1 className="mb-2 mt-6 text-center text-3xl font-semibold text-black">
                  Confirmação de agendamento
                </h1>
                <h3 className="mb-6 text-center text-base font-light text-black opacity-60">
                  Confirme o agendamento da sua reserva
                </h3>
              </div>

              <div className="mt-6 h-full w-full justify-between md:flex">
                <div>
                  <h4 className="mb-3 text-xl font-semibold">1. Sua escolha</h4>

                  <p className="mb-1 mt-1 text-lg font-medium">
                    {formatStringCapitalized(
                      moment.utc(scheduling.date).format('dddd, DD/MMM'),
                    )}
                  </p>

                  <p className="text-sm opacity-75">
                    {scheduling.hour} - {hourFish.format('HH:mm')} |{' '}
                    {blockInfo?.name}
                  </p>

                  <Separator className="mb-2 mt-2 opacity-50" />

                  <p className="text-sm">
                    {formatStringCapitalized(blockInfo?.Company?.name ?? '')}
                  </p>
                  <p className=" text-xs opacity-75">
                    {formatStringCapitalized(
                      blockInfo?.Company?.companyAddress[0].street ?? '',
                    )}
                    , {blockInfo?.Company?.companyAddress[0].number},{' '}
                    {blockInfo?.Company?.companyAddress[0].neighborhood}
                  </p>
                  <p className="text-xs opacity-50">
                    Funcionamento às{' '}
                    {
                      moment(scheduling.date).format(
                        'dddd',
                      ) as keyof typeof daysOfWeekMock
                    }
                    : {openingHours?.startTime} - {openingHours?.endTime}
                  </p>

                  <Button
                    className="mt-5 w-full"
                    onClick={() => navigate(`/quadras/${slug}/${blockId}`)}
                  >
                    Escolher outro horário
                  </Button>
                </div>
                <Separator orientation="vertical" className="max-md:hidden" />

                <Separator className="mb-6 mt-6 md:hidden" />

                <div className="w-full max-w-md">
                  <h4 className="text-xl font-semibold">
                    2. Método de Pagamento
                  </h4>

                  <p className="mb-3 mt-3 text-base font-medium">
                    Como deseja pagar a quadra
                  </p>

                  {paymentMethod.map((method) => {
                    return (
                      <>
                        <div className="flex w-full flex-col">
                          <button
                            className={`mb-2 rounded-xl pl-2 pr-2  ${paymentMethodSelected === method.type ? 'bg-primary' : 'bg-white'}  w-full border-2 ${paymentMethodSelected === method.type && 'border-primary'}`}
                            onClick={() =>
                              setPaymentMethodSelected(method.type)
                            }
                          >
                            <div className="mb-5 mt-5 flex items-center">
                              <label
                                htmlFor="terms2"
                                className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${paymentMethodSelected === method.type ? 'text-white' : 'text-black'}`}
                              >
                                {method.name}
                              </label>
                            </div>
                          </button>
                        </div>
                      </>
                    )
                  })}

                  {renderPaymentMethod()}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
