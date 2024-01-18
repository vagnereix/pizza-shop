import { api } from '@/lib/api'

interface UpdateProfileBody {
  name: string
  description: string
}

export async function updateProfile({ name, description }: UpdateProfileBody) {
  await api.put('/profile', {
    name,
    description,
  })
}
