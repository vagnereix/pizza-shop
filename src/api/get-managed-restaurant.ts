import { api } from '@/lib/api'

export interface GetManagedRestaurantResponse {
  name: string
  id: string
  createdAt: Date | null
  updatedAt: Date | null
  description: string | null
  managerId: string | null
}

export async function getManagedRestaurant() {
  const { data } = await api.get<GetManagedRestaurantResponse>(
    '/managed-restaurant',
  )

  return data
}
