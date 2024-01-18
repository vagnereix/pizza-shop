import { api } from '@/lib/api'

interface SignUpBody {
  email: string
  restaurantName: string
  managerName: string
  phone: string
}

export async function registerRestaurant({
  email,
  restaurantName,
  managerName,
  phone,
}: SignUpBody) {
  await api.post('/restaurants', {
    email,
    restaurantName,
    managerName,
    phone,
  })
}
