import { Helmet } from 'react-helmet-async'

import { PixSuccess } from '../../components/success-appointment/pixSuccess'
import { CardSuccess } from '../../components/success-appointment/cardSuccess'

import { useSchedulingStore } from '../../store/SchedulingStore'

export function SuccessAppointment() {
  const { scheduling } = useSchedulingStore()

  const renderPaymentMethod = () => {
    if (scheduling.paymentMethod === 'creditCard') {
      return <CardSuccess />
    }
    return <PixSuccess />
  }
  return (
    <>
      <Helmet title="Agendamento" />
      <div className="flex  flex-col items-center  px-4">
        <div className="mb-7 flex  w-full max-w-5xl flex-col items-center">
          {renderPaymentMethod()}
        </div>
      </div>
    </>
  )
}
