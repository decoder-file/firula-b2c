import { Checkbox } from '../ui/checkbox'
import { PaymentSummary } from './paymentSummary'
import { Button } from '../../components/ui/button'
import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog'
import { useRouterStore } from '../../store/UserRouter'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { createScheduling } from '../../services/scheduling'
import { useSchedulingStore } from '../../store/SchedulingStore'
import { useUserStore } from '../../store/UserStore'
import moment from 'moment'
import { createDayUseCheckIn } from '../../services/scheduling/create-day-use-check-in'

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
  const { setRouterName } = useRouterStore()
  const { scheduling, setScheduling } = useSchedulingStore()
  const { user } = useUserStore()

  const { blockId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const [acceptTerm, setAcceptTerm] = useState(false)
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  const hourFish = moment(scheduling.hour, 'HH:mm').add(1, 'hours')

  const handleConfirmPayment = async () => {
    setLoadingPayment(true)
    if (!localStorage.getItem('token')) {
      setLoadingPayment(false)
      setOpenDialog(true)

      return
    }

    try {
      if (scheduling.isDayUse) {
        const response = await createDayUseCheckIn({
          date: scheduling.date,
          companyBlockId: blockId ?? '',
          userId: user.userId,
        })

        if (response.success) {
          setScheduling({
            date: '',
            hour: '',
            isDayUse: true,
            pixQrCode: response.pixQrCode ?? '',
            duration: scheduling.duration,
            paymentMethod: 'pix',
          })
          navigate('/agendamento-realizado')
          return
        }
      }
      const response = await createScheduling({
        date: scheduling.date,
        companyBlockId: blockId ?? '',
        startTime: scheduling.hour,
        endTime: hourFish.format('HH:mm'),
        userId: user.userId,
        paymentMethod: 'pix',
      })

      if (response.success) {
        setScheduling({
          date: '',
          hour: '',
          isDayUse: scheduling.isDayUse,
          pixQrCode: response.pixQrCode ?? '',
          duration: scheduling.duration,
          paymentMethod: 'pix',
        })
        navigate('/agendamento-realizado')
      }
    } catch (error) {
      setLoadingPayment(false)
    }

    setLoadingPayment(false)
  }

  const handleSignIn = () => {
    setRouterName(location.pathname)

    navigate('/sign-in')
  }

  return (
    <>
      <div>
        <p className=" max-w-md text-xs font-light opacity-70">
          Você será direcionado para a página de pagamento. O código Pix é
          válido por 7 minutos e sua reserva será confirmada após a validação do
          pagamento.
        </p>

        <PaymentSummary
          price={price}
          duration={!scheduling.isDayUse ? scheduling.duration : undefined}
        />

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
      <AlertDialog open={openDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Necessário realizar login</AlertDialogTitle>
            <AlertDialogDescription>
              Para realizar um agendamento é necessário está logado, deseja
              realizar o login?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleSignIn}>Entrar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
