import { api } from '@/lib/api'

export type GetPopularProductsResponse = {
  product: string
  amount: number
}[]

export async function getPopularProducts() {
  const { data } = await api.get<GetPopularProductsResponse>(
    '/metrics/popular-products',
  )

  return data
}
