import { useSchedulingStore } from '../../store/SchedulingStore'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { QRCodeSVG } from 'qrcode.react'

export function PixSuccess() {
  const { scheduling } = useSchedulingStore()

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(scheduling.pixQrCode ? scheduling.pixQrCode : '')
      .then(
        () => {
          toast.success('Texto copiado para a área de transferência!')
        },
        () => {
          toast.error('Erro ao copiar texto!')
        },
      )
  }

  return (
    <div>
      <div>
        <h1 className="mb-2 mt-6 text-center text-3xl font-semibold text-black">
          Quase lá! Pague via Pix para concluir sua reserva
        </h1>
        {scheduling.isDayUse ? (
          <h3 className="mb-6 text-center text-base font-light text-black opacity-60">
            Para confirmar seu day use, é necessário realizar o pagamento via
            Pix
          </h3>
        ) : (
          <h3 className="mb-6 text-center text-base font-light text-black opacity-60">
            Para confirmar sua reserva, realizar o pagamento via Pix
          </h3>
        )}
      </div>

      <div className="mt-6 flex h-full w-full  justify-center">
        <div className="flex flex-col items-center justify-start">
          <div className="mb-3">
            <h3 className="text-sm font-semibold">
              Escaneie este código QR para pagar
            </h3>
            <div className="ml-3 mt-2">
              <p className="text-xs">
                1. Acesse o seu banco ou aplicativo de pagamentos
              </p>
              <p className="text-xs">2. Escolha pagar via Pix</p>
              <p className="text-xs">
                3. Escaneie o seguinte código de pagamento:
              </p>
            </div>
          </div>
          <QRCodeSVG value={scheduling.pixQrCode ? scheduling.pixQrCode : ''} />

          <h3 className="mt-3 text-sm font-semibold">
            Ou pague com Pix Copia e Cola
          </h3>
          <p className="max-w-md text-center text-xs">
            Acesse o seu banco ou aplicativo de pagamento e escolha pagar via
            Pix. Em seguida, cole o seguinte código de pagamento:
          </p>

          <div>
            <Button
              variant="outline"
              className="mt-5"
              onClick={copyToClipboard}
            >
              Copiar Código Pix
            </Button>
          </div>
          <Button className="mt-5">Já realizei o pagamento</Button>
        </div>
      </div>
    </div>
  )
}
