import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { registerRestaurant } from '@/api/register-restaurant'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signUpFormSchema = z.object({
  email: z.string().email('E-mail inválido.'),
  restaurantName: z.string().min(3, 'Nome do estabelecimento inválido.'),
  managerName: z.string().min(3, 'Nome do responsável inválido.'),
  phone: z.string().min(11, 'Celular inválido.'),
})

type SignUpFormValues = z.infer<typeof signUpFormSchema>

export function SignUp() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
  })

  const navigate = useNavigate()

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  })

  async function handleSignUp(data: SignUpFormValues) {
    try {
      const { email, restaurantName, managerName, phone } = data

      await registerRestaurantFn({
        email,
        restaurantName,
        managerName,
        phone,
      })

      toast.success('Restaurante cadastrado com sucesso.', {
        action: {
          label: 'Login',
          onClick: () => navigate('/sign-in?email=' + email),
        },
      })
    } catch (error) {
      console.log(error)
      toast.error('Erro ao cadastrar restaurante.')
    }
  }

  return (
    <>
      <Helmet title="Login" />

      <Button asChild variant="ghost" className="absolute right-8 top-8">
        <Link to="/sign-in">Fazer login</Link>
      </Button>

      <div className="p-8">
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>

            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas vendas!
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-2">
              <Label htmlFor="email">Nome do estabelecimento</Label>
              <Input
                id="restaurantName"
                type="text"
                {...register('restaurantName')}
              />

              {errors.restaurantName && (
                <p className="text-xs text-primary">
                  {errors.restaurantName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="managerName">Seu nome</Label>
              <Input
                id="managerName"
                type="text"
                {...register('managerName')}
              />

              {errors.managerName && (
                <p className="text-xs text-primary">
                  {errors.managerName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')} />

              {errors.email && (
                <p className="text-xs text-primary">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Seu celular</Label>
              <Input id="phone" type="text" {...register('phone')} />

              {errors.phone && (
                <p className="text-xs text-primary">{errors.phone.message}</p>
              )}
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              Finalizar cadastro
            </Button>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com nossos{' '}
              <a href="" className="underline underline-offset-4">
                termos de serviço
              </a>{' '}
              e{' '}
              <a href="" className="underline underline-offset-4">
                política de privacidade
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
