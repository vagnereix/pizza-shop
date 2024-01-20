import { api } from '@/lib/api'

export interface GetDayOrdersAmountResponse {
  amount: number
  diffFromYesterday: number
}

export async function getDayOrdersAmount() {
  const { data } = await api.get<GetDayOrdersAmountResponse>(
    '/metrics/day-orders-amount',
  )

  return data
}
