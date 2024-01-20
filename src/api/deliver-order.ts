import { api } from '@/lib/api'

interface DeliverOrderParams {
  orderId: string
}

export async function deliverOrder({ orderId }: DeliverOrderParams) {
  await api.patch(`/orders/${orderId}/deliver`)
}
