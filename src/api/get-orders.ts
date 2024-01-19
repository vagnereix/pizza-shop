import { api } from '@/lib/api'

export interface GetOrdersQuery {
  pageIndex?: number | null
}

interface GetOrdersResponse {
  orders: {
    orderId: string
    createdAt: Date
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export async function getOrders({ pageIndex }: GetOrdersQuery) {
  const { data } = await api.get<GetOrdersResponse>('/orders', {
    params: {
      pageIndex,
    },
  })

  return data
}
