import { ticketTypes } from '../../../../services/event'
import { Button } from '../../../../components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../../components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../components/ui/select'
import { formatCurrency } from '../../../../utils/functions'

type TicketSelectionProps = {
  ticket: ticketTypes[]
}

export default function TicketSelection({ ticket }: TicketSelectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Selecione seus ingressos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {ticket.map((ticket) => (
          <>
            <div className="flex items-center justify-between" key={ticket.id}>
              <div>
                <h3 className="font-semibold">{ticket.title}</h3>
                <p className="text-sm text-gray-600">
                  R$ {formatCurrency(ticket.price)}
                </p>
              </div>
              <Select>
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
              </Select>
            </div>
          </>
        ))}
      </CardContent>
      <CardFooter>
        <Button className="w-full">Comprar Ingressos</Button>
      </CardFooter>
    </Card>
  )
}
