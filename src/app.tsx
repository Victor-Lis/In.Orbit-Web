import { Dialog } from './components/ui/dialog'

import CreateGoal from './components/create-goal'
import Summary from './components/summary'
import EmptyGoals from './components/empty-goals'
import { useQuery } from '@tanstack/react-query'
import { getSummary } from './http/get-summary'

function App() {
  const { data: summary } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60,
  })

  return (
    <Dialog>
      {summary?.at(0)?.total ? <Summary /> : <EmptyGoals />}
      <CreateGoal />
    </Dialog>
  )
}

export default App
