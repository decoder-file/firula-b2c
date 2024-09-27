import { createBrowserRouter } from 'react-router-dom'

import { SignIn } from './pages/auth/sign-in'

import { PageNotFound } from './pages/pageNotFound'
import AuthLayout from './pages/_layouts/auth-layout'
import { ListCompany } from './pages/main/list-company'
import { CompanyLayout } from './pages/_layouts/company'
import { CompanyPage } from './pages/main/company-page'
import { CompanySelectDate } from './pages/main/company-select-date'
import { ConfirmAppointment } from './pages/main/confirm-appointment'

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
])
