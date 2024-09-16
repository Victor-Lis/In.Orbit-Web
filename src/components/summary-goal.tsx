import type { GoalType } from '../@types/SummaryType'

import { CheckCircle2 } from 'lucide-react'

import { deleteGoalCompletion } from '../http/delete-goal-completion'

import { useQueryClient } from '@tanstack/react-query'

import dayjs from 'dayjs'

export default function SummaryGoal({ goal }: { goal: GoalType }) {
  const queryClient = useQueryClient()
  const time = dayjs(goal.completedAt).format('HH:mm')

  async function handleDeleteGoal() {
    await deleteGoalCompletion(goal.id)

    queryClient.invalidateQueries({ queryKey: ['summary'] })
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
  }
  return (
    <li key={goal.id} className="flex items-center gap-2">
      <CheckCircle2 className="size-4 text-pink-500" />
      <span className="text-zinc-400 text-sm">
        Você completou "<span className="text-zinc-100">{goal.title}</span>" às{' '}
        <span className="text-zinc-100">{time}h</span>
      </span>
      <span
        onClick={handleDeleteGoal}
        onKeyDown={handleDeleteGoal}
        className="text-zinc-400 text-xs underline cursor-pointer hover:opacity-75 duration-150"
      >
        Desfazer
      </span>
    </li>
  )
}
