import { createFileRoute } from '@tanstack/react-router'
import WorkerDashboard from '../pages/worker/Dashboard'

export const Route = createFileRoute('/worker')({
  component: WorkerDashboard,
})
