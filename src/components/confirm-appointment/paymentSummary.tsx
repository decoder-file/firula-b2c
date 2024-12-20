import { formatCurrency } from '../../utils/functions'
import { Separator } from '../ui/separator'

type PaymentSummaryProps = {
  price: string | undefined
  duration?: string
}

export function PaymentSummary({ price, duration }: PaymentSummaryProps) {
  let rate = 0
  let totalPrice = ''

  if (price && duration) {
    rate = ((Number(price) * Number(duration)) / 100) * 0.04 * 100
  }

  if (!duration) {
    rate = (Number(price) / 100) * 0.04 * 100
  }

  if (price && duration) {
    totalPrice = formatCurrency(
      (Number(duration) * Number(price) + Number(rate.toString())).toString(),
    )
  }

  if (!duration) {
    totalPrice = formatCurrency(
      (Number(price) + Number(rate.toString())).toString(),
    )
  }

  return (
    <div className="mt-5">
      <p className="text-sm font-semibold opacity-80">Resumo</p>
      <Separator className="mb-2 mt-2 opacity-50" />
      <div className="flex justify-between">
        <p className="text-sm font-light">Desconto</p>
        <p className="text-sm font-semibold">- R$ 00,00</p>
      </div>
      <Separator className="mb-2 mt-2 opacity-50" />
      <div className="flex justify-between">
        <p className="text-sm font-light">Taxa</p>
        <p className="text-sm font-semibold">
          R$ {formatCurrency(rate.toString() ?? '')}
        </p>
      </div>
      <Separator className="mb-2 mt-2 opacity-50" />
      <div className="flex justify-between">
        <p className="text-sm font-light">Total da reserva</p>
        <p className="text-sm font-semibold">
          R$ {''}
          {totalPrice}
        </p>
      </div>
      <Separator className="mt-2 opacity-50" />
    </div>
  )
}
