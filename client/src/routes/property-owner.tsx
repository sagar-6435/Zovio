import { createFileRoute } from '@tanstack/react-router'
import PropertyOwnerDashboard from '../pages/property-owner/Dashboard'

export const Route = createFileRoute('/property-owner')({
  component: PropertyOwnerDashboard,
})
