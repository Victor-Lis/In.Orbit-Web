import type { GoalsType } from '../@types/GoalsType'

export async function getPendingGoals(): Promise<GoalsType[]> {
  const res = await fetch('http://localhost:3333/pending-goals')
  const data = await res.json()

  return data.pendingGoals
}
