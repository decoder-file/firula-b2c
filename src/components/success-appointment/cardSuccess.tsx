import moment from 'moment'
import { Button } from '../../components/ui/button'
import { useSchedulingStore } from '../../store/SchedulingStore'
import { CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function CardSuccess() {
  const navigate = useNavigate()
  const { scheduling } = useSchedulingStore()

  const hourFish = moment(scheduling.hour, 'HH:mm').add(1, 'hours')

  return (
    <div>
      <div>
        <h1 className="mb-2 mt-6 text-center text-3xl font-semibold text-black">
          Pagamento realizado com sucesso!
        </h1>
        <h3 className="mb-6 text-center text-base font-light text-black opacity-60">
          Sua reserva foi confirmada com sucesso!
        </h3>
      </div>

      <div className="mt-6 flex h-full w-full  justify-center">
        <div className="flex flex-col items-center justify-start">
          <div className="mb-3 flex flex-col items-center justify-center">
            <CheckCircle size={128} color="#2caf3b" />
            <p className="mt-3 max-w-md text-center text-xs">
              {scheduling.hour} as {hourFish.format('HH:mm')} foi confirmada com
              sucesso!
            </p>
          </div>

          <Button className="mt-3" onClick={() => navigate('/quadras')}>
            Fechar
          </Button>
        </div>
      </div>
    </div>
  )
}
