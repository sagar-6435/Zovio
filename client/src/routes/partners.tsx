import { createFileRoute } from '@tanstack/react-router'
import Partners from '../pages/Partners'

type PartnersSearch = {
  service?: string
}

export const Route = createFileRoute('/partners')({
  component: Partners,
  validateSearch: (search: Record<string, unknown>): PartnersSearch => {
    return {
      service: search.service as string | undefined,
    }
  },
})
