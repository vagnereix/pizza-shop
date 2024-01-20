import { api } from '@/lib/api'

export interface GetMonthCanceledOrdersAmountResponse {
  amount: number
  diffFromLastMonth: number
}

export async function getMonthCanceledOrdersAmount() {
  const { data } = await api.get<GetMonthCanceledOrdersAmountResponse>(
    '/metrics/month-canceled-orders-amount',
  )

  return data
}