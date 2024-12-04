import { useState, useEffect } from 'react'
import { Clock, Copy, Smartphone, QrCode, CheckCircle } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Card, CardContent } from '../../../components/ui/card'
import Header from './components/Header'

export default function EventPixConfirmPage() {
  const [timeLeft, setTimeLeft] = useState(900) // 15 minutes in seconds
  const [copied, setCopied] = useState(false)

  const orderNumber = '2YP9M88530K'
  const pixCode =
    '00020101021226900014br.gov.bcb.pix2568pix.dyen.com/pixqrcodelocation/pixlec/v1/loc/up0SGmF2RKS9m17VPUGa6Q52040000530398658502BR5906Sympla6009SAO PAULO62070503***63046897'

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(pixCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text:', err)
    }
  }

  return (
    <>
      <Header />

      <div className="mx-auto max-w-4xl space-y-6 p-4">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold">Pedido iniciado</h1>
            <p className="text-muted-foreground">
              Nº DO PEDIDO <span className="font-mono">{orderNumber}</span>
            </p>
          </div>
          <div className="flex items-center gap-2 text-orange-500">
            <Clock className="h-5 w-5" />
            <span>Aguardando pagamento</span>
          </div>
        </div>

        <Card>
          <CardContent className="space-y-6 p-6">
            <h2 className="text-center text-xl font-semibold">
              Agora só falta concluir seu Pix!
            </h2>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex justify-center rounded-lg border bg-white p-4">
                  <img
                    src="/placeholder.svg?height=200&width=200"
                    alt="QR Code"
                    className="h-48 w-48"
                  />
                </div>
                <div className="break-all px-4 text-xs text-muted-foreground">
                  {pixCode}
                </div>
                <Button
                  className="w-full"
                  onClick={handleCopyCode}
                  variant="default"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Código copiado
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      COPIAR CÓDIGO
                    </>
                  )}
                </Button>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Como pagar?</h3>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Smartphone className="h-5 w-5 shrink-0 text-muted-foreground" />
                    <p>
                      Abra o app do seu banco ou carteira digital e{' '}
                      <span className="text-muted-foreground">
                        escolha pagar com Pix
                      </span>
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <QrCode className="h-5 w-5 shrink-0 text-muted-foreground" />
                    <p>
                      Selecione a opção{' '}
                      <span className="text-muted-foreground">
                        pagar com QR Code e escaneie o código
                      </span>{' '}
                      ao lado ou{' '}
                      <span className="text-muted-foreground">
                        copie o código e selecione a opção Pix Copia e Cola
                      </span>
                      .
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <CheckCircle className="h-5 w-5 shrink-0 text-muted-foreground" />
                    <p>Confirme as informações e finalize a compra</p>
                  </div>
                </div>

                <div className="text-sm">
                  Este código expira em{' '}
                  <span className="font-medium text-orange-500">
                    {formatTime(timeLeft)}
                  </span>{' '}
                  minutos e não será mais válido.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
