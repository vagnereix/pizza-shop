import { ClassValue, clsx } from 'clsx'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export function getDistanceToNow(date: Date) {
  return formatDistanceToNow(date, {
    locale: ptBR,
    addSuffix: true,
  })
}
