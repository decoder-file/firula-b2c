import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import LogoGreen from '../../assets/logo-green.png'
import { Separator } from '../../components/ui/separator'
import { Button } from '../../components/ui/button'
import { useRouterStore } from '../../store/UserRouter'
import { useUserStore } from '../../store/UserStore'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../components/ui/accordion'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu'
import { Bell, Plus } from 'lucide-react'

const frequentlyAskedQuestions = [
  {
    id: 1,
    question: 'Posso cancelar ou reagendar meu horário?',
    answer:
      'Sim, você pode cancelar ou reagendar seu horário diretamente através do aplicativo Firula. Basta acessar a sua reserva e selecionar a opção desejada, a depender dos horários disponíveis.',
  },
  {
    id: 2,
    question: 'Como sei que meu horário foi confirmado?',
    answer:
      'Após efetuar a reserva, você receberá uma confirmação por e-mail e/ou notificação no aplicativo Firula. Além disso, você pode verificar o status da sua reserva no próprio app.',
  },
  {
    id: 3,
    question: 'Quais as formas de pagamento o Firula aceita?',
    answer:
      'O Firula aceita diversas formas de pagamento, incluindo cartões de crédito, débito e Pix. Você pode selecionar a opção de pagamento preferida durante o processo de reserva.',
  },
  {
    id: 4,
    question: 'Onde encontro o link para marcar meu horário?',
    answer:
      'Você pode encontrar o link para marcar seu horário diretamente no aplicativo Firula, acessando a seção de reservas ou através de convites enviados por proprietários de quadras.',
  },
  {
    id: 5,
    question: 'Como funciona o reembolso?',
    answer:
      'O processo de reembolso varia de acordo com a política de cancelamento da quadra em questão. Geralmente, é possível solicitar reembolsos dentro de um prazo determinado antes do horário agendado. Você pode solicitar o reembolso através do aplicativo Firula e o valor será estornado de acordo com o método de pagamento utilizado.',
  },
]

type CompanyLayoutProps = {
  title?: string
}

export function CompanyLayout({ title }: CompanyLayoutProps) {
  const { setRouterName, removeRouterName } = useRouterStore()
  const { user, removeAdmin } = useUserStore()

  const location = useLocation()
  const navigate = useNavigate()

  const handleLogin = () => {
    setRouterName(location.pathname)
    navigate('/sign-in')
  }

  const handleLogOut = () => {
    localStorage.setItem('token', '')
    localStorage.setItem('refreshToken', '')
    removeAdmin()
    removeRouterName()
  }

  const handleOpenFAQ = () => {
    window.open(
      'https://wa.me/5531984491335?text=Gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20o%20funcionamento%20do%20Firula.',
      '_blank',
      'noopener,noreferrer',
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="mt-3">
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex justify-between p-4">
            <img
              src={LogoGreen}
              alt="Logo firula"
              className="h-10 w-10 cursor-pointer"
              onClick={() => navigate('/quadras')}
            />
            {user.userId ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="link"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <Bell size={20} />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="link"
                      size="icon"
                      className="overflow-hidden rounded-full"
                    >
                      <Plus />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate('/quadras')}>
                      Agendar novo Horário
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="overflow-hidden rounded-full"
                    >
                      <Avatar>
                        <AvatarImage
                          src={`https://ui-avatars.com/api/?name=${user.name}&background=17A34A&color=fff`}
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate('/day-uses')}>
                      Meus Days uses
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate('/meus-agendamentos')}
                    >
                      Meus Agendamentos
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/quadras')}>
                      Novo Agendamento
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogOut}>
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Button variant="link" onClick={handleLogin}>
                Entrar | Cadastrar-se
              </Button>
            )}
          </div>
          <Separator className="my-2 opacity-50" />
          <h4 className="mb-4 px-4 text-xl font-normal text-black">
            {title ? `${title}` : 'Reserva de quadra'}
          </h4>
          <Separator className="my-2 opacity-50" />
        </div>
      </header>

      <main className="w-full flex-grow">
        <div className="mx-auto w-full max-w-7xl px-4">
          <Outlet />
        </div>
      </main>

      <div className="mb-10 flex w-full flex-col items-center justify-center ">
        <Separator className="mb-3 opacity-50" />
        <div className="mt-6 w-full max-w-7xl gap-6 p-4 sm:flex">
          <div className="sm:max-w-64">
            <h1 className="text-lg font-semibold">Dúvidas frequentes</h1>
            <label className="text-sm font-normal">
              Encontre aqui as respostas para as principais dúvidas na hora de
              reservar uma quadra no Firula.
            </label>
            <div className="mb-5 mt-5" />
            <label className="text-sm font-normal">
              Ainda tem dúvidas? Entre em contato com nossa equipe de
              atendimento via WhatsApp e faremos todo o possível para te ajudar.
            </label>
            <Button
              size="sm"
              className="mb-4 mt-4 w-full"
              onClick={handleOpenFAQ}
            >
              Fale conosco
            </Button>
          </div>
          <Accordion type="single" className="w-full">
            {frequentlyAskedQuestions.map((faq) => (
              <AccordionItem
                key={faq.question}
                value={faq.question}
                className="mb-2 rounded-xl bg-gray-100 p-2"
              >
                <AccordionTrigger className="text-sm font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-xs font-light opacity-70">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      <footer className="flex w-full flex-col items-center justify-center bg-stone-200">
        <Separator className="mb-3 opacity-50" />
        <div className="w-full max-w-7xl px-4">
          <div className="flex items-center">
            <img
              src={LogoGreen}
              alt="Logo firula"
              className="h-8 w-8 cursor-pointer"
              onClick={() => navigate('/quadras')}
            />
            <h4 className="pl-3 text-xs font-light">Reserva de quadra</h4>
          </div>
          <Separator className="mt-3 opacity-50" />
          <div className="flex flex-wrap items-center p-4">
            <Button
              variant="link"
              className="p-0 text-xs text-black opacity-65"
              onClick={() => navigate('/terms/terms-of-use')}
            >
              Termos e Condições
            </Button>
            <Separator
              orientation="vertical"
              className="ml-3 mr-3 bg-black opacity-50"
            />
            <Button
              variant="link"
              className="text-xs text-black opacity-65"
              onClick={() => navigate('/terms/cookie-policy')}
            >
              Politica de Cookies
            </Button>
            <Separator orientation="vertical" className="ml-3 mr-3 bg-black" />
            <Button
              variant="link"
              className="text-xs text-black opacity-65"
              onClick={() => navigate('/terms/privacy-policy')}
            >
              Politica de Privacidade
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
