import { useState } from 'react'

import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'

import LogoGreen from '../../assets/logo-green.png'
import { AuthenticateResponseType } from '../../services/user/authenticate'
import { useUserStore } from '../../store/UserStore'
import api from '../../services/api'

const signInForm = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
})

type SingInForm = z.infer<typeof signInForm>

export function SignIn() {
  const { setUser } = useUserStore()
  const navigate = useNavigate()
  const [loadingSignIn, setLoadingSignIn] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm<SingInForm>({
    resolver: zodResolver(signInForm),
  })

  async function handleSignIn(data: SingInForm) {
    setLoadingSignIn(true)
    try {
      const response: AuthenticateResponseType = await api.post('sign-in', data)

      const { token, user } = response.data

      if (user.role !== 'ADMIN') {
        toast.error('Você não tem permissão para acessar o painel de controle')
        setLoadingSignIn(false)
        return
      }

      localStorage.setItem('token', token)

      setUser({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      })
      toast.success('Login realizado com sucesso!')

      navigate('/home')

      setLoadingSignIn(false)
    } catch (error) {
      toast.error('Email ou senha incorreto!')
      setLoadingSignIn(false)
    }
  }
  return (
    <>
      <Helmet title="Login" />
      <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
        <div className="flex justify-center">
          <img src={LogoGreen} alt="Logo Firula" className="w-20" />
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Acessar painel de controle
          </h1>
          <p className="text-sm text-muted-foreground">
            Gerencie o Firula de forma simples e eficiente
          </p>
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" {...register('email')} />
          {errors.email && (
            <span className="text-xs text-red-600">{errors.email.message}</span>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="password" {...register('password')} />
          {errors.password && (
            <span className="text-xs text-red-600">
              {errors.password.message}
            </span>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting || loadingSignIn || !isValid}
        >
          Entrar
        </Button>
      </form>
    </>
  )
}
