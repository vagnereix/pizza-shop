import { api } from '@/lib/api'

interface SignInBody {
  email: string
}

export async function signIn({ email }: SignInBody) {
  await api.post('/authenticate', {
    email,
  })
}
