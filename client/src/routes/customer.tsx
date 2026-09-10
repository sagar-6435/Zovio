import { createFileRoute } from '@tanstack/react-router'
import CustomerDashboard from '../pages/customer/Dashboard'

export const Route = createFileRoute('/customer')({
  component: CustomerDashboard,
})
