import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Select } from '@radix-ui/react-select'
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { months, years } from '../../utils/cardInfo'
import { Separator } from '../ui/separator'
import { PaymentSummary } from './paymentSummary'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { useState } from 'react'
import { toast } from 'sonner'
import InputMask from 'react-input-mask'
import { cn } from '../../lib/utils'

const signInForm = z.object({
  number: z.string().min(16, 'Número do cartão inválido'),
  holder_name: z.string().min(3, 'Nome do titular inválido'),
  cvv: z.string().min(2, 'CVV inválido'),
})

type SingInForm = z.infer<typeof signInForm>

type CreditCardFormProps = {
  paymentMethodSelected: string
  price: string | undefined
  setLoadingPayment: (loading: boolean) => void
}

export function CreditCardForm({
  price,
  paymentMethodSelected,
  setLoadingPayment,
}: CreditCardFormProps) {
  const [acceptTerm, setAcceptTerm] = useState(false)
  const [monthSelected, setMonthSelected] = useState('')
  const [yearSelected, setYearSelected] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SingInForm>({
    resolver: zodResolver(signInForm),
  })

  const handleCreditCard = async (data: SingInForm) => {
    console.log(data)
    if (monthSelected === '') {
      toast.error('Selecione o mês de vencimento')
      return
    }

    if (yearSelected === '') {
      toast.error('Selecione o ano de vencimento')
      return
    }

    setLoadingPayment(true)

    setLoadingPayment(false)
  }

  return (
    <form onSubmit={handleSubmit(handleCreditCard)}>
      <Separator className="mb-2 mt-2 opacity-50" />
      <h3 className="mb-3 text-base font-semibold">
        Informações do cartão de crédito
      </h3>
      <div className="mb-2 space-y-2">
        <Label htmlFor="number">Número do cartão</Label>
        <InputMask
          mask="9999 9999 9999 9999"
          id="dateOfBirth"
          {...register('number')}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          )}
        />
        {errors.number && (
          <span className="text-xs text-red-600">{errors.number.message}</span>
        )}
      </div>

      <div className="mb-2 space-y-2">
        <Label htmlFor="holder_name">Nome do titular</Label>
        <Input
          id="holder_name"
          {...register('holder_name')}
          placeholder="Digite o nome impresso no cartão"
        />
        {errors.holder_name && (
          <span className="text-xs text-red-600">
            {errors.holder_name.message}
          </span>
        )}
      </div>

      <div className="flex w-full gap-2">
        <div className="mb-2 w-full space-y-2">
          <Label htmlFor="month">Mês</Label>
          <Select onValueChange={(e) => setMonthSelected(e)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mb-2 w-full space-y-2">
          <Label htmlFor="year">Ano</Label>
          <Select onValueChange={(e) => setYearSelected(e)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year.value} value={year.value}>
                  {year.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mb-2 w-full space-y-2">
          <Label htmlFor="cvv">CVV</Label>
          <Input id="cvv" {...register('cvv')} />
          {errors.cvv && (
            <span className="text-xs text-red-600">{errors.cvv.message}</span>
          )}
        </div>
      </div>
      <Separator className="mb-2 mt-2 opacity-50" />

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
        disabled={
          paymentMethodSelected === '' ||
          !acceptTerm ||
          isSubmitting ||
          !isValid
        }
        className="w-full"
        type="submit"
      >
        Finalizar a reserva
      </Button>
    </form>
  )
}
