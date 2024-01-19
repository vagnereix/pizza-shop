import { cn } from '@/lib/utils'

type OrderStatus =
  | 'pending'
  | 'canceled'
  | 'processing'
  | 'delivering'
  | 'delivered'

interface OrderStatusProps {
  status: OrderStatus
}

const orderStatusMap: Record<
  OrderStatus,
  { description: string; background: string }
> = {
  pending: { description: 'Pendente', background: 'bg-slate-400' },
  canceled: { description: 'Cancelado', background: 'bg-rose-500' },
  processing: { description: 'Em preparo', background: 'bg-amber-500' },
  delivering: { description: 'Entregando', background: 'bg-amber-500' },
  delivered: { description: 'Entregue', background: 'bg-emerald-500' },
}

export function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          'h-2 w-2 rounded-full',
          orderStatusMap[status].background,
        )}
      />

      <span className="font-medium text-muted-foreground">
        {orderStatusMap[status].description}
      </span>
    </div>
  )
}
