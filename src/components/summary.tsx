import { CheckCircle2, Plus } from 'lucide-react'

import { Button } from './ui/button'
import { DialogTrigger } from './ui/dialog'
import InOrbitIcon from './ui/in-orbit-icon'
import { Progress, ProgressIndicator } from './ui/progress-bar'
import { Separator } from './ui/separator'
import { OutlineButton } from './ui/outline-button'

import { useQuery } from '@tanstack/react-query'
import { getSummary } from '../http/get-summary'

import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-BR'
import PendingGoals from './pending-goals'

dayjs.locale(ptBR)

export default function Summary() {
  const { data: summary } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60,
  })

  if (!summary?.at(0)) {
    return null
  }

  const firstDayOfWeek = dayjs().startOf('week').format('D MMM')
  const lastDayOfWeek = dayjs().endOf('week').format('D MMM')

  const completedPercentage = (summary[0].completed * 100) / summary[0].total

  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />
          <span className="text-lg font-semibold capitalize">
            {firstDayOfWeek} - {lastDayOfWeek}
          </span>
        </div>
        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={8} max={15}>
          <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
        </Progress>
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou{' '}
            <span className="text-zinc-100">{summary[0].completed}</span> de{' '}
            <span className="text-zinc-100">{summary[0].total}</span> metas
            nessa semana.
          </span>
          <span>{`${completedPercentage}`.slice(0, 4)}%</span>
        </div>
      </div>

      <Separator />

      <PendingGoals />

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">Sua semana</h2>

        {Object.entries(summary[0].goalsPerDay).map(([date, goals]) => {
          const weekDay = dayjs(date).format('dddd')
          const formmatedDate = dayjs(date).format('D [de] MMMM')

          return (
            <div className="flex flex-col gap-4" key={date}>
              <h3 className="font-medium">
                <span className="capitalize">{weekDay} </span>
                <span className="text-zinc-400 text-xs">({formmatedDate})</span>
              </h3>

              <ul className="flex flex-col gap-3">
                {goals
                  .sort(
                    (a, b) =>
                      new Date(b.completedAt).getTime() -
                      new Date(a.completedAt).getTime()
                  )
                  ?.map(goal => {
                    const time = dayjs(goal.completedAt).format('HH:mm')
                    return (
                      <li key={goal.id} className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-pink-500" />
                        <span className="text-zinc-400 text-sm">
                          Você completou "
                          <span className="text-zinc-100">{goal.title}</span>"
                          às <span className="text-zinc-100">{time}h</span>
                        </span>
                      </li>
                    )
                  })}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
