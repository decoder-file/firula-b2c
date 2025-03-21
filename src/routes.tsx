import { createBrowserRouter } from 'react-router-dom'

import { PageNotFound } from './pages/pageNotFound'
import AuthLayout from './pages/_layouts/auth-layout'
import { ListCompany } from './pages/main/list-company'
import { CompanyLayout } from './pages/_layouts/company'
import { CompanyPage } from './pages/main/company-page'
import { CompanySelectDate } from './pages/main/company-select-date'
import { ConfirmAppointment } from './pages/main/confirm-appointment'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'
import { MyAppointments } from './pages/main/my-appointments'
import { SuccessAppointment } from './pages/main/success-appointments'
import { ResetPassword } from './pages/auth/reset-password/reset-password'
import { SendTokenResetPassword } from './pages/auth/reset-password/send-token-reset-password'
import { ListDayUse } from './pages/main/list-day-use'
import EventPage from './pages/main/event/event-details'
import { ConfirmDayUse } from './pages/main/dayUse/confirm-appointment-day-use'
import EventCheckoutPage from './pages/main/event/event-checkout'
import EventPixConfirmPage from './pages/main/event/event-pix-confirm'
import EventPaymentConfirmed from './pages/main/event/event-payment-confirmed'
import { ListTicketsPage } from './pages/main/event/list-tickets'
import { Term } from './pages/main/term'

export const router = createBrowserRouter([
  {
    path: '*',
    element: <PageNotFound />,
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignIn />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/alterar-senha/enviar-token',
        element: <SendTokenResetPassword />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/alterar-senha/:userId',
        element: <ResetPassword />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-up',
        element: <SignUp />,
      },
    ],
  },
  {
    element: <CompanyLayout />,
    children: [
      {
        path: '/quadras',
        element: <ListCompany />,
      },
    ],
  },
  {
    element: <CompanyLayout />,
    children: [
      {
        path: '/termo',
        element: <Term />,
      },
    ],
  },
  {
    element: <CompanyLayout />,
    children: [
      {
        path: '/quadras/:slug',
        element: <CompanyPage />,
      },
    ],
  },
  {
    element: <CompanyLayout />,
    children: [
      {
        path: '/quadras/:slug/:blockId',
        element: <CompanySelectDate />,
      },
    ],
  },
  {
    element: <CompanyLayout />,
    children: [
      {
        path: '/quadras/:slug/:blockId/confirmar-agendamento',
        element: <ConfirmAppointment />,
      },
    ],
  },
  {
    element: <CompanyLayout />,
    children: [
      {
        path: '/quadras/:slug/:blockId/confirmar-day-use',
        element: <ConfirmDayUse />,
      },
    ],
  },
  {
    element: <CompanyLayout title="Meus agendamentos" />,
    children: [
      {
        path: '/meus-agendamentos',
        element: <MyAppointments />,
      },
    ],
  },
  {
    element: <CompanyLayout title="Meus Day Uses" />,
    children: [
      {
        path: '/day-uses',
        element: <ListDayUse />,
      },
    ],
  },
  {
    element: <CompanyLayout title="Ingressos" />,
    children: [
      {
        path: '/meus-ingressos',
        element: <ListTicketsPage />,
      },
    ],
  },
  {
    element: <CompanyLayout title="Agendamento realizado" />,
    children: [
      {
        path: '/agendamento-realizado',
        element: <SuccessAppointment />,
      },
    ],
  },
  {
    children: [
      {
        path: '/evento/:slug',
        element: <EventPage />,
      },
    ],
  },
  {
    children: [
      {
        path: '/evento/checkout/:slug/:eventId/:ticketTypeId',
        element: <EventCheckoutPage />,
      },
    ],
  },
  {
    children: [
      {
        path: '/evento/checkout/pix/:ticketId',
        element: <EventPixConfirmPage />,
      },
    ],
  },
  {
    children: [
      {
        path: '/evento/payment-confirmed/:ticketId',
        element: <EventPaymentConfirmed />,
      },
    ],
  },
])
