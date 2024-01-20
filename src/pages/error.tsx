import { Link, useRouteError } from 'react-router-dom'

export function Error() {
  const error = useRouteError() as Error

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">
        Whoops, algo inesperado aconteceu...
      </h1>
      <p className="text-accent-foreground">
        Um erro aconteceu na aplicação, abaixo você pode ver mais detalhes:
      </p>

      <pre>{error?.message ?? JSON.stringify(error)}</pre>

      <p className="text-accent-foreground">
        Voltar para o{' '}
        <Link
          to="/"
          className="underline underline-offset-4 transition-colors hover:text-muted-foreground"
        >
          Dashboard
        </Link>
      </p>
    </div>
  )
}
