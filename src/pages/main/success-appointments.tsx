import { Helmet } from 'react-helmet-async'

import { PixSuccess } from '../../components/success-appointment/pixSuccess'

export function SuccessAppointment() {
  const renderPaymentMethod = () => {
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
