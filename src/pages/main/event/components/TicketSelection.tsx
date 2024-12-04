import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { ticketTypes } from '../../../../services/event'
import { Button } from '../../../../components/ui/button'
import {
  Card,
  CardContent,
  // CardFooter,
  CardHeader,
  CardTitle,
} from '../../../../components/ui/card'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../../../components/ui/alert-dialog'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '../../../../components/ui/select'
import { formatCurrency } from '../../../../utils/functions'
import { useRouterStore } from '../../../../store/UserRouter'

type TicketSelectionProps = {
  ticket: ticketTypes[]
  eventId: string
  slug: string
}

export default function TicketSelection({
  ticket,
  eventId,
  slug,
}: TicketSelectionProps) {
  const navigate = useNavigate()
  const { setRouterName } = useRouterStore()

  const [openDialog, setOpenDialog] = useState(false)
  const [ticketSelected, setTicketSelected] = useState('')

  const handleSelectTicket = (ticketId: string) => {
    setTicketSelected(ticketId)
    if (!localStorage.getItem('token')) {
      setOpenDialog(true)
      return
    }

    navigate(`/evento/checkout/${slug}/${eventId}/${ticketId}`)
  }

  const handleSignIn = () => {
    setRouterName(`/evento/checkout/${slug}/${eventId}/${ticketSelected}`)

    navigate('/sign-in')
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Selecione seus ingressos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {ticket.map((ticket) => (
            <>
              <div
                className="flex items-center justify-between"
                key={ticket.id}
              >
                <div>
                  <h3 className="font-semibold">{ticket.title}</h3>
                  <p className="text-sm text-gray-600">
                    R$ {formatCurrency(ticket.price)}
                  </p>
                </div>
                <Button onClick={() => handleSelectTicket(ticket.id)}>
                  Comprar Ingressos
                </Button>
                {/* implementar quando for possível comprar mais de um ingresso por vez */}
                {/* <Select>
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="0" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                </SelectContent>
              </Select> */}
              </div>
            </>
          ))}
        </CardContent>
        {/* <CardFooter>
        <Button className="w-full">Comprar Ingressos</Button>
      </CardFooter> */}
      </Card>
      <AlertDialog open={openDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Necessário realizar login</AlertDialogTitle>
            <AlertDialogDescription>
              Para seguir com a compra de ingressos é necessário realizar o
              login
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
