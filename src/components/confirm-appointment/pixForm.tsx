import { Checkbox } from '../ui/checkbox'
import { PaymentSummary } from './paymentSummary'
import { Button } from '../../components/ui/button'
import { useState } from 'react'
import { toast } from 'sonner'

type PixFormProps = {
  price: string | undefined
  paymentMethodSelected: string
  setLoadingPayment: (loading: boolean) => void
}

export function PixForm({
  price,
  paymentMethodSelected,
  setLoadingPayment,
}: PixFormProps) {
  const [acceptTerm, setAcceptTerm] = useState(false)

  const handleConfirmPayment = async () => {
    setLoadingPayment(true)
    toast.error('Erro ao processar pagamento!')
  }

  return (
    <div>
      <p className=" max-w-md text-xs font-light opacity-70">
        Você será direcionado para a página de pagamento. O código Pix é válido
        por 7 minutos e sua reserva será confirmada após a validação do
        pagamento.
      </p>

      <PaymentSummary price={price} />

      <div className="mb-5 mt-5 flex items-center space-x-2">
        <Checkbox id="terms2" onClick={() => setAcceptTerm(!acceptTerm)} />
        <label
          htmlFor="terms2"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Declaro que li e estou de acordo com os Termos de serviço do Firula.
        </label>
      </div>

      <Button
        disabled={paymentMethodSelected === '' || !acceptTerm}
        className="w-full"
        onClick={() => handleConfirmPayment()}
      >
        Finalizar a reserva
      </Button>
    </div>
  )
}
