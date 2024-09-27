import { Separator } from '../ui/separator'

type PaymentSummaryProps = {
  price: string | undefined
}

export function PaymentSummary({ price }: PaymentSummaryProps) {
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
        <p className="text-sm font-light">Total da reserva</p>
        <p className="text-sm font-semibold">R$ {price}</p>
      </div>
      <Separator className="mt-2 opacity-50" />
    </div>
  )
}
