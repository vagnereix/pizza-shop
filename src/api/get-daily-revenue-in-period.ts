import { api } from '@/lib/api'

interface GetDailyRevenueInPeriodQuery {
  from?: Date
  to?: Date
}

type GetDailyRevenueInPeriodResponse = {
  date: Date
  receipt: number
}[]

export async function getDailyRevenueInPeriod({
  from,
  to,
}: GetDailyRevenueInPeriodQuery) {
  const { data } = await api.get<GetDailyRevenueInPeriodResponse>(
    '/metrics/daily-receipt-in-period',
    {
      params: {
        from,
        to,
      },
    },
  )

  return data
}
