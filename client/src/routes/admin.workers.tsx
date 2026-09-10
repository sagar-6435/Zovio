import { createFileRoute } from '@tanstack/react-router'
import WorkerManagement from '../pages/admin/WorkerManagement'

export const Route = createFileRoute('/admin/workers')({
  component: WorkerManagement,
})
