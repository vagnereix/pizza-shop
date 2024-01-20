import { api } from '@/lib/api'

export interface GetMonthRevenueResponse {
  receipt: number
  diffFromLastMonth: number
}

export async function getMonthRevenue() {
  const { data } = await api.get<GetMonthRevenueResponse>(
    '/metrics/month-receipt',
  )

  return data
}
