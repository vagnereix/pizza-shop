import { api } from '@/lib/api'

interface GetOrderDetailsParams {
  orderId: string
}

interface GetOrderDetailsResponse {
  status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
  id: string
  createdAt: Date
  totalInCents: number
  customer: {
    name: string
    email: string
    phone: string | null
  }
  orderItems: {
    id: string
    priceInCents: number
    quantity: number
    product: { name: string }
  }[]
}

export async function getOrderDetails({ orderId }: GetOrderDetailsParams) {
  const { data } = await api.get<GetOrderDetailsResponse>(`/orders/${orderId}`)

  return data
}
