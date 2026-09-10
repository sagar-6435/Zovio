import { createFileRoute } from '@tanstack/react-router'
import ComplaintsQueries from '../pages/admin/ComplaintsQueries'

export const Route = createFileRoute('/admin/complaints')({
  component: ComplaintsQueries,
})
