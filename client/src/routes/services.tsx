import { createFileRoute } from '@tanstack/react-router'
import Services from '../pages/Services'

type ServicesSearch = {
  q?: string
}

export const Route = createFileRoute('/services')({
  component: Services,
  validateSearch: (search: Record<string, unknown>): ServicesSearch => {
    return {
      q: search.q as string | undefined,
    }
  },
})
