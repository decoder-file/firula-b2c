import { useState } from 'react'
import { Lock } from 'lucide-react'

import { Checkbox } from '../../../../components/ui/checkbox'
import { Button } from '../../../../components/ui/button'

import { Card, CardContent } from '../../../../components/ui/card'

type EventCheckoutPixFormProps = {
  price: string
}

export function EventCheckoutPixForm({ price }: EventCheckoutPixFormProps) {
  const [acceptTerm, setAcceptTerm] = useState(false)

  const handleConfirmPayment = async () => {}

  return (
    <>
      <Card>
        <CardContent className="pt-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock size={20} />
              <h2 className="text-lg font-semibold">Pagamento instantâneo</h2>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="30"
              height="30"
              viewBox="0 0 48 48"
            >
              <path
                fill="#4db6ac"
                d="M11.9,12h-0.68l8.04-8.04c2.62-2.61,6.86-2.61,9.48,0L36.78,12H36.1c-1.6,0-3.11,0.62-4.24,1.76	l-6.8,6.77c-0.59,0.59-1.53,0.59-2.12,0l-6.8-6.77C15.01,12.62,13.5,12,11.9,12z"
              ></path>
              <path
                fill="#4db6ac"
                d="M36.1,36h0.68l-8.04,8.04c-2.62,2.61-6.86,2.61-9.48,0L11.22,36h0.68c1.6,0,3.11-0.62,4.24-1.76	l6.8-6.77c0.59-0.59,1.53-0.59,2.12,0l6.8,6.77C32.99,35.38,34.5,36,36.1,36z"
              ></path>
              <path
                fill="#4db6ac"
                d="M44.04,28.74L38.78,34H36.1c-1.07,0-2.07-0.42-2.83-1.17l-6.8-6.78c-1.36-1.36-3.58-1.36-4.94,0	l-6.8,6.78C13.97,33.58,12.97,34,11.9,34H9.22l-5.26-5.26c-2.61-2.62-2.61-6.86,0-9.48L9.22,14h2.68c1.07,0,2.07,0.42,2.83,1.17	l6.8,6.78c0.68,0.68,1.58,1.02,2.47,1.02s1.79-0.34,2.47-1.02l6.8-6.78C34.03,14.42,35.03,14,36.1,14h2.68l5.26,5.26	C46.65,21.88,46.65,26.12,44.04,28.74z"
              ></path>
            </svg>{' '}
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-lg font-semibold">
                Como pagar com o Pix?
              </h3>
              <p className="text-muted-foreground">
                Ao finalizar a compra, será gerado um{' '}
                <span className="font-medium text-foreground">
                  QR Code de pagamento
                </span>
                . Use o aplicativo do seu banco ou carteira digital para
                escaneá-lo e realizar o pagamento.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2 rounded-lg bg-muted p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-semibold">R$ {price}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Total: R$ {price}</span>
                  {/* <span>(R$ 19,50 de taxa de processamento)</span> */}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="mb-5 mt-5 flex items-center space-x-2">
              <Checkbox
                id="terms2"
                onClick={() => setAcceptTerm(!acceptTerm)}
              />
              <label
                htmlFor="terms2"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Declaro que li e estou de acordo com os Termos de serviço do
                Firula.
              </label>
            </div>

            <Button
              disabled={!acceptTerm}
              className="w-full"
              onClick={() => handleConfirmPayment()}
            >
              Pagar agora
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
