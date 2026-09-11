import { createFileRoute } from '@tanstack/react-router'
import Overview from '../pages/admin/Overview'

export const Route = createFileRoute('/admin/')({
  component: Overview,
})
