import { Search, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const orderFilterSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
})

type OrderFilterValues = z.infer<typeof orderFilterSchema>

export function OrderTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  const { register, handleSubmit, control, reset } = useForm<OrderFilterValues>(
    {
      defaultValues: {
        orderId: orderId ?? '',
        customerName: customerName ?? '',
        status: status ?? 'all',
      },
    },
  )

  function handleFilter({ orderId, customerName, status }: OrderFilterValues) {
    setSearchParams((previousURLSearch) => {
      if (orderId) {
        previousURLSearch.set('orderId', orderId)
      } else {
        previousURLSearch.delete('orderId')
      }
      if (customerName) {
        previousURLSearch.set('customerName', customerName)
      } else {
        previousURLSearch.delete('customerName')
      }
      if (status) {
        previousURLSearch.set('status', status)
      } else {
        previousURLSearch.delete('status')
      }

      previousURLSearch.set('page', '1')

      return previousURLSearch
    })
  }

  function handleClearFilters() {
    setSearchParams((previousURLSearch) => {
      previousURLSearch.delete('orderId')
      previousURLSearch.delete('customerName')
      previousURLSearch.delete('status')
      previousURLSearch.set('page', '1')

      return previousURLSearch
    })

    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilter)}
      className="flex items-center gap-2"
    >
      <span className="text-sm font-semibold">Filtros:</span>

      <Input
        {...register('orderId')}
        placeholder="ID do pedido"
        className="h-8 w-auto"
      />
      <Input
        {...register('customerName')}
        placeholder="Nome do cliente"
        className="h-8 w-[320px]"
      />

      <Controller
        name="status"
        control={control}
        render={({ field: { name, onChange, value, disabled } }) => (
          <Select
            defaultValue=""
            name={name}
            onValueChange={onChange}
            value={value}
            disabled={disabled}
          >
            <SelectTrigger className="h-8 w-[180px]">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="canceled">Cancelado</SelectItem>
              <SelectItem value="processing">Em preparo</SelectItem>
              <SelectItem value="delivering">Em entrega</SelectItem>
              <SelectItem value="delivered">Entregue</SelectItem>
            </SelectContent>
          </Select>
        )}
      />

      <Button type="submit" variant="secondary" size="xs">
        <Search className="mr-2 h-4 w-4" />
        Filtrar resultados
      </Button>

      <Button
        type="button"
        onClick={handleClearFilters}
        variant="outline"
        size="xs"
      >
        <X className="mr-2 h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  )
}
