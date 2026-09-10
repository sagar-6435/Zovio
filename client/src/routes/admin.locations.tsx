import { createFileRoute } from '@tanstack/react-router'
import LocationManagement from '../pages/admin/LocationManagement'

export const Route = createFileRoute('/admin/locations')({
  component: LocationManagement,
})
